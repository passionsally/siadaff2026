const sponsorForm = document.querySelector("[data-sponsor-form]");
const sponsorErrorBox = document.querySelector("[data-sponsor-form-error]");
const sponsorSuccessPanel = document.querySelector("[data-sponsor-success-panel]");
const sponsorInquiryTarget = document.querySelector("[data-sponsor-inquiry-id]");
const sponsorSuccessMessage = document.querySelector("[data-sponsor-success-message]");
const sponsorSubmitButton = sponsorForm?.querySelector("button[type='submit']");
const sponsorToast = document.getElementById("sponsorToast");

const sponsorConfig = window.SIADAFF_CONFIG || {};
const sponsorLang = document.documentElement.lang?.toLowerCase().startsWith("en") ? "en" : "ko";
const sponsorCopy = {
  ko: {
    submit: "제출하기",
    loading: "저장 중",
    proposalToast: "제안서 보기 페이지로 이동합니다. 브라우저 뒤로가기로 후원 페이지에 돌아올 수 있습니다.",
    missingEndpoint: "후원 문의 저장 API 주소가 아직 설정되지 않았습니다.",
    saveError: "후원 문의 저장 중 오류가 발생했습니다.",
    successStatus: (status) => `상태는 ${status || "문의접수"}입니다. 운영사무국에서 확인 후 연락드리겠습니다.`
  },
  en: {
    submit: "Submit Inquiry",
    loading: "Saving",
    proposalToast: "Opening the proposal page. You can return to this partnership page with your browser back button.",
    missingEndpoint: "The sponsorship inquiry API endpoint has not been configured yet.",
    saveError: "Something went wrong while saving your sponsorship inquiry.",
    successStatus: (status) => {
      const localizedStatus = status === "문의접수" || !status ? "Inquiry received" : status;
      return `Status: ${localizedStatus}. The SIADAFF Office will review your message and follow up.`;
    }
  }
};
const activeSponsorCopy = sponsorCopy[sponsorLang];
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
  sponsorSubmitButton.textContent = isSubmitting
    ? sponsorSubmitButton.dataset.loadingText || activeSponsorCopy.loading
    : sponsorSubmitButton.dataset.defaultText || activeSponsorCopy.submit;
}

document.querySelectorAll(".js-pdf-link").forEach((link) => {
  link.addEventListener("click", () => {
    showSponsorToast(activeSponsorCopy.proposalToast);
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
      showSponsorError(activeSponsorCopy.missingEndpoint);
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
        throw new Error(sponsorLang === "ko" ? result.error || activeSponsorCopy.saveError : activeSponsorCopy.saveError);
      }

      sponsorInquiryTarget.textContent = result.inquiryNo;
      sponsorSuccessMessage.textContent = activeSponsorCopy.successStatus(result.status);
      sponsorSuccessPanel.classList.add("is-visible");
      sponsorSuccessPanel.scrollIntoView({ behavior: "smooth", block: "center" });
      sponsorForm.reset();
    } catch (error) {
      showSponsorError(error.message || activeSponsorCopy.saveError);
    } finally {
      setSponsorSubmitting(false);
    }
  });
}
