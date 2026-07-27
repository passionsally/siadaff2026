const cfg = window.SIADAFF_CONFIG || {};
const params = new URLSearchParams(location.search);
const title = document.querySelector("#title");
const message = document.querySelector("#message");
const detail = document.querySelector("#detail");
const retry = document.querySelector("#retry");
const home = document.querySelector("#home");
async function confirm() {
  const paymentKey = params.get("paymentKey");
  const orderId = params.get("orderId");
  const amount = Number(params.get("amount"));
  if (!paymentKey || !orderId || !Number.isInteger(amount)) throw new Error("결제 인증 정보가 올바르지 않습니다.");
  if (!cfg.earlybirdConfirmPaymentEndpoint) throw new Error("결제 승인 API가 설정되지 않았습니다.");
  const response = await fetch(cfg.earlybirdConfirmPaymentEndpoint, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ paymentKey, orderId, amount })
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "결제 승인에 실패했습니다.");
  if (result.status !== "PAID") throw new Error("즉시 완료되지 않는 결제수단입니다. 운영사무국에 문의해 주세요.");
  title.textContent = "슈퍼얼리버드 결제가 완료되었습니다.";
  message.textContent = "출품권과 추가 혜택은 구매 이메일로 안내됩니다.";
  detail.textContent = `주문번호 ${result.orderId} · 결제금액 ${result.amount.toLocaleString("ko-KR")}원`;
  home.hidden = false;
}
confirm().catch((exception) => {
  title.textContent = "결제 확인이 필요합니다.";
  message.textContent = exception.message || "운영사무국에 주문번호와 함께 문의해 주세요.";
  retry.hidden = false;
});
