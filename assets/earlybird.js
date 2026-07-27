const cfg = window.SIADAFF_CONFIG || {};
const form = document.querySelector("#order-form");
const button = document.querySelector("#pay-button");
const errorBox = document.querySelector("#error");
const amount = { currency: "KRW", value: 29900 };
function error(message) { errorBox.textContent = message || ""; }
async function start() {
  if (!cfg.tossClientKey || cfg.tossClientKey.includes("REPLACE")) {
    error("결제 테스트 키가 아직 설정되지 않았습니다.");
    button.disabled = true;
    return;
  }
  const tossPayments = TossPayments(cfg.tossClientKey);
  const widgets = tossPayments.widgets({ customerKey: "ANONYMOUS" });
  await widgets.setAmount(amount);
  await Promise.all([
    widgets.renderPaymentMethods({ selector: "#payment-method", variantKey: "DEFAULT" }),
    widgets.renderAgreement({ selector: "#agreement", variantKey: "AGREEMENT" })
  ]);
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    error("");
    if (!form.checkValidity()) return form.reportValidity();
    if (!cfg.earlybirdCreateOrderEndpoint) return error("주문 생성 API가 설정되지 않았습니다.");
    button.disabled = true;
    button.textContent = "주문 생성 중";
    try {
      const data = new FormData(form);
      const response = await fetch(cfg.earlybirdCreateOrderEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"), email: data.get("email"), phone: data.get("phone"),
          website: data.get("website"), privacyConsent: data.has("privacyConsent")
        })
      });
      const order = await response.json();
      if (!response.ok) throw new Error(order.error || "주문을 생성하지 못했습니다.");
      await widgets.requestPayment({
        orderId: order.orderId, orderName: order.orderName,
        successUrl: `${location.origin}/earlybird/success.html`,
        failUrl: `${location.origin}/earlybird/fail.html`,
        customerEmail: order.customerEmail, customerName: order.customerName
      });
    } catch (exception) {
      error(exception.message || "결제를 시작하지 못했습니다.");
      button.disabled = false;
      button.textContent = "29,900원 결제하기";
    }
  });
}
start().catch(() => error("결제 화면을 불러오지 못했습니다."));
