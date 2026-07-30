import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const PRODUCT = { code: "SIADAFF2026_SUPER_EARLYBIRD_1", name: "서울국제광고영화제 출품권(1작품)", amount: 29900 };
const SALE_START = Date.parse("2026-07-30T00:00:00+09:00");
const SALE_END = Date.parse("2026-08-20T23:59:59+09:00");
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
  const now = Date.now();
  if (now < SALE_START || now > SALE_END) return json({ error: "얼리버드 판매 기간이 아닙니다." }, 400, allow);

  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return json({ error: "요청을 읽을 수 없습니다." }, 400, allow); }
  if (text(body.website)) return json({ error: "주문을 처리할 수 없습니다." }, 400, allow);
  const name = text(body.name);
  const email = text(body.email);
  const phone = text(body.phone);
  if (!name || !email || !phone || body.privacyConsent !== true) return json({ error: "필수 정보와 개인정보 동의를 확인해 주세요." }, 400, allow);
  if (name.length > 80 || email.length > 200 || phone.length > 30) return json({ error: "입력값 길이를 확인해 주세요." }, 400, allow);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: "이메일 형식을 확인해 주세요." }, 400, allow);

  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) return json({ error: "서버 설정이 완료되지 않았습니다." }, 500, allow);
  const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const orderId = `SIAD-EB-${crypto.randomUUID().replaceAll("-", "").slice(0, 24)}`;
  const { error } = await db.from("earlybird_orders").insert({
    order_id: orderId,
    product_code: PRODUCT.code,
    order_name: PRODUCT.name,
    amount: PRODUCT.amount,
    customer_name: name,
    customer_email: email.toLowerCase(),
    customer_phone: phone,
    privacy_consent: true,
  });
  if (error) return json({ error: "주문을 생성하지 못했습니다." }, 500, allow);
  return json({ orderId, orderName: PRODUCT.name, amount: PRODUCT.amount, customerName: name, customerEmail: email }, 200, allow);
});
