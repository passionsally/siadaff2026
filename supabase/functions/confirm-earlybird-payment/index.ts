import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const text = (value: unknown) => typeof value === "string" ? value.trim() : "";
function origin(request: Request) {
  const value = request.headers.get("origin") || "*";
  const allowed = (Deno.env.get("ALLOWED_ORIGINS") || "").split(",").map((item) => item.trim()).filter(Boolean);
  return allowed.length === 0 || allowed.includes(value) ? value : "";
}
function json(body: unknown, status: number, allow: string) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Access-Control-Allow-Origin": allow, "Content-Type": "application/json; charset=utf-8" },
  });
}

Deno.serve(async (request) => {
  const allow = origin(request);
  if (!allow) return json({ error: "허용되지 않은 요청 출처입니다." }, 403, "null");
  if (request.method === "OPTIONS") return new Response("ok", { headers: { ...cors, "Access-Control-Allow-Origin": allow } });
  if (request.method !== "POST") return json({ error: "POST 요청만 허용합니다." }, 405, allow);

  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return json({ error: "요청을 읽을 수 없습니다." }, 400, allow); }
  const paymentKey = text(body.paymentKey);
  const orderId = text(body.orderId);
  const returnedAmount = Number(body.amount);
  if (!paymentKey || !orderId || !Number.isInteger(returnedAmount)) return json({ error: "결제 정보가 올바르지 않습니다." }, 400, allow);

  const url = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const tossSecret = Deno.env.get("TOSS_SECRET_KEY");
  if (!url || !serviceKey || !tossSecret) return json({ error: "결제 서버 설정이 완료되지 않았습니다." }, 500, allow);
  const db = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data: order, error: readError } = await db.from("earlybird_orders")
    .select("order_id,amount,status,payment_key").eq("order_id", orderId).single();
  if (readError || !order) return json({ error: "주문을 찾을 수 없습니다." }, 404, allow);
  if (order.amount !== returnedAmount) return json({ error: "결제 금액이 주문 금액과 일치하지 않습니다." }, 400, allow);
  if (order.status === "PAID" && order.payment_key === paymentKey) return json({ orderId, amount: order.amount, status: "PAID" }, 200, allow);
  if (order.status !== "PENDING" && order.status !== "PAYMENT_CHECK_REQUIRED") return json({ error: "승인할 수 없는 주문 상태입니다." }, 409, allow);

  let tossResponse: Response;
  try {
    tossResponse = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${btoa(`${tossSecret}:`)}`,
        "Content-Type": "application/json",
        "Idempotency-Key": crypto.randomUUID(),
      },
      body: JSON.stringify({ paymentKey, orderId, amount: order.amount }),
    });
  } catch {
    await db.from("earlybird_orders").update({ status: "PAYMENT_CHECK_REQUIRED" }).eq("order_id", orderId);
    return json({ error: "결제 결과를 확인 중입니다. 재결제하지 말고 운영사무국에 문의해 주세요." }, 502, allow);
  }
  const payment = await tossResponse.json();
  if (!tossResponse.ok) {
    await db.from("earlybird_orders").update({
      status: "FAILED",
      failure_code: text(payment.code),
      failure_message: text(payment.message),
    }).eq("order_id", orderId);
    return json({ error: text(payment.message) || "결제 승인에 실패했습니다." }, tossResponse.status, allow);
  }
  const status = payment.status === "DONE"
    ? "PAID"
    : payment.status === "WAITING_FOR_DEPOSIT"
      ? "WAITING_FOR_DEPOSIT"
      : "PAYMENT_CHECK_REQUIRED";
  const { error: updateError } = await db.from("earlybird_orders").update({
    status,
    payment_key: payment.paymentKey,
    payment_method: payment.method,
    toss_status: payment.status,
    receipt_url: payment.receipt?.url || null,
    approved_at: payment.approvedAt || null,
    updated_at: new Date().toISOString(),
  }).eq("order_id", orderId);
  if (updateError) return json({ error: "승인됐지만 주문 저장을 확인해야 합니다. 운영사무국에 문의해 주세요." }, 500, allow);
  return json({ orderId, amount: order.amount, status }, 200, allow);
});
