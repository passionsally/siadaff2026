const sponsorForm = document.querySelector("[data-sponsor-form]");
const sponsorErrorBox = document.querySelector("[data-sponsor-form-error]");
const sponsorSuccessPanel = document.querySelector("[data-sponsor-success-panel]");
const sponsorInquiryTarget = document.querySelector("[data-sponsor-inquiry-id]");
const sponsorSuccessMessage = document.querySelector("[data-sponsor-success-message]");
const sponsorSubmitButton = sponsorForm?.querySelector("button[type='submit']");
const sponsorToast = document.getElementById("sponsorToast");

const sponsorConfig = window.SIADAFF_CONFIG || {};
let sponsorToastTimer;

function showSponsorToast(message) {
  if (!sponsorToast) return;
  sponsorToast.textContent = message;
  sponsorToast.hidden = false;
  sponsorToast.classList.add("is-visible");
  clearTimeout(sponsorToastTimer);
  sponsorToastTimer = setTimeout(() => {
    sponsorToast.classList.remove("is-visible");
    sponsorToast.hidden = true;
  }, 3600);
}

function showSponsorError(message) {
  sponsorErrorBox.textContent = message;
  sponsorErrorBox.classList.add("is-visible");
}

function resetSponsorMessages() {
  sponsorErrorBox.classList.remove("is-visible");
  sponsorErrorBox.textContent = "";
  sponsorSuccessPanel.classList.remove("is-visible");
}

function buildSponsorPayload(data) {
  const payload = Object.fromEntries(data.entries());
  payload.privacyConsent = data.has("privacyConsent");
  payload.marketingConsent = data.has("marketingConsent");
  return payload;
}

function setSponsorSubmitting(isSubmitting) {
  sponsorSubmitButton.disabled = isSubmitting;
  sponsorSubmitButton.textContent = isSubmitting ? "저장 중" : "제출하기";
}

document.querySelectorAll(".js-pdf-link").forEach((link) => {
  link.addEventListener("click", () => {
    showSponsorToast("제안서 보기 페이지로 이동합니다. 브라우저 뒤로가기로 후원 페이지에 돌아올 수 있습니다.");
  });
});

if (sponsorForm) {
  sponsorForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    resetSponsorMessages();

    if (!sponsorForm.checkValidity()) {
      sponsorForm.reportValidity();
      return;
    }

    if (!sponsorConfig.sponsorInquiryEndpoint) {
      showSponsorError("후원 문의 저장 API 주소가 아직 설정되지 않았습니다.");
      return;
    }

    const data = new FormData(sponsorForm);
    setSponsorSubmitting(true);

    try {
      const response = await fetch(sponsorConfig.sponsorInquiryEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(buildSponsorPayload(data))
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "후원 문의 저장 중 오류가 발생했습니다.");
      }

      sponsorInquiryTarget.textContent = result.inquiryNo;
      sponsorSuccessMessage.textContent = `상태는 ${result.status || "문의접수"}입니다. 운영사무국에서 확인 후 연락드리겠습니다.`;
      sponsorSuccessPanel.classList.add("is-visible");
      sponsorSuccessPanel.scrollIntoView({ behavior: "smooth", block: "center" });
      sponsorForm.reset();
    } catch (error) {
      showSponsorError(error.message || "후원 문의 저장 중 오류가 발생했습니다.");
    } finally {
      setSponsorSubmitting(false);
    }
  });
}
