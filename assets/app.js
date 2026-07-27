const form = document.querySelector("[data-submit-form]");
const categorySelect = document.querySelector("#category");
const titleInput = document.querySelector("#entryTitle");
const errorBox = document.querySelector("[data-form-error]");
const successPanel = document.querySelector("[data-success-panel]");
const receiptTarget = document.querySelector("[data-receipt-id]");
const successMessage = document.querySelector("[data-success-message]");
const submitButton = form.querySelector("button[type='submit']");
const ageGroupSelect = document.querySelector("#ageGroup");
const productionTypeSelect = document.querySelector("#productionType");
const businessNumberField = document.querySelector("#businessNumberField");
const businessNumberInput = document.querySelector("#businessRegistrationNumber");

const config = window.SIADAFF_CONFIG || {};

const categoryNames = {
  "Brand Poster": "포스터",
  "Ad Film": "39초 광고영상",
  "Short-form Drama": "59초 숏폼드라마",
  "Short Film": "3분 단편영화"
};

const consentFields = [
  "rulesConsent",
  "rightsConsent",
  "privacyConsent",
  "promotionConsent",
  "teamParticipationConsent"
];

function syncTitle() {
  const selected = categorySelect.value;
  const label = categoryNames[selected] || "00";
  titleInput.value = `서울국제광고영화제 SIADAFF 1회 ${label} 부문 출품작`;
}

function syncApplicantType() {
  const isGroup = ageGroupSelect.value === "단체출품";
  productionTypeSelect.value = ageGroupSelect.value
    ? (isGroup ? "단체출품" : "개인출품")
    : "";
  businessNumberField.hidden = !isGroup;
  businessNumberInput.required = isGroup;
  if (!isGroup) businessNumberInput.value = "";
}

function normalizeBusinessNumber() {
  businessNumberInput.value = businessNumberInput.value
    .replace(/\D/g, "")
    .slice(0, 10)
    .replace(/^(\d{3})(\d{0,2})(\d{0,5}).*$/, (_, a, b, c) =>
      [a, b, c].filter(Boolean).join("-")
    );
}

function hasOneSnsUrl(data) {
  return Boolean(
    data.get("youtubeUrl")?.trim() ||
    data.get("instagramUrl")?.trim() ||
    data.get("tiktokUrl")?.trim()
  );
}

function showError(message) {
  errorBox.textContent = message;
  errorBox.classList.add("is-visible");
}

function resetMessages() {
  errorBox.classList.remove("is-visible");
  successPanel.classList.remove("is-visible");
  errorBox.textContent = "";
}

function buildPayload(data) {
  const payload = Object.fromEntries(data.entries());

  for (const field of consentFields) {
    payload[field] = data.has(field);
  }

  return payload;
}

function setSubmitting(isSubmitting) {
  submitButton.disabled = isSubmitting;
  submitButton.textContent = isSubmitting ? "접수 저장 중" : "출품 등록";
}

function initReveal() {
  const items = document.querySelectorAll("section, .category-cards article, .rule-panel, .status-flow article");
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.08 });

  items.forEach((item) => observer.observe(item));
}

categorySelect.addEventListener("change", syncTitle);
ageGroupSelect.addEventListener("change", syncApplicantType);
businessNumberInput.addEventListener("input", normalizeBusinessNumber);
syncTitle();
syncApplicantType();
initReveal();

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  resetMessages();

  const data = new FormData(form);

  if (!hasOneSnsUrl(data)) {
    showError("유튜브, 인스타그램, 틱톡 URL 중 최소 1개를 입력해 주세요.");
    return;
  }

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  if (!config.submitEndpoint) {
    showError("접수 저장 API 주소가 아직 설정되지 않았습니다. assets/config.js에 Supabase Function URL을 입력해 주세요.");
    return;
  }

  setSubmitting(true);

  try {
    const response = await fetch(config.submitEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(buildPayload(data))
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(result.error || "접수 저장 중 오류가 발생했습니다.");
    }

    receiptTarget.textContent = result.receiptNo;
    successMessage.textContent = `접수 상태는 ${result.status || "접수완료"}입니다. 제출한 이메일로 시상식 및 결과 안내가 발송될 수 있습니다.`;
    successPanel.classList.add("is-visible");
    successPanel.scrollIntoView({ behavior: "smooth", block: "center" });
    form.reset();
    syncTitle();
    syncApplicantType();
  } catch (error) {
    showError(error.message || "접수 저장 중 오류가 발생했습니다.");
  } finally {
    setSubmitting(false);
  }
});
