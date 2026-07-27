import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

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
const submissionFields = document.querySelector("[data-submission-fields]");
const authGuest = document.querySelector("[data-auth-guest]");
const authMember = document.querySelector("[data-auth-member]");
const authMessage = document.querySelector("[data-auth-message]");
const memberEmailInput = document.querySelector("#memberEmail");
const memberPasswordInput = document.querySelector("#memberPassword");
const memberEmailTarget = document.querySelector("[data-member-email]");
const applicantEmailInput = document.querySelector("#email");

const config = window.SIADAFF_CONFIG || {};
const supabaseClient = createClient(
  config.supabaseUrl,
  config.supabasePublishableKey
);
let currentSession = null;

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

function showAuthMessage(message, isError = true) {
  authMessage.textContent = message || "";
  authMessage.classList.toggle("is-visible", Boolean(message));
  authMessage.style.color = isError ? "#b42318" : "#087f5b";
}

function renderSession(session) {
  currentSession = session;
  const email = session?.user?.email || "";
  const isSignedIn = Boolean(session?.access_token && email);
  authGuest.hidden = isSignedIn;
  authMember.hidden = !isSignedIn;
  submissionFields.disabled = !isSignedIn;
  memberEmailTarget.textContent = email;
  applicantEmailInput.value = email;
  applicantEmailInput.readOnly = isSignedIn;
}

async function signUp() {
  showAuthMessage("");
  const email = memberEmailInput.value.trim();
  const password = memberPasswordInput.value;
  if (!email || password.length < 8) return showAuthMessage("이메일과 8자 이상의 비밀번호를 입력해 주세요.");
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${location.origin}/#submit` }
  });
  if (error) return showAuthMessage(error.message);
  renderSession(data.session);
  showAuthMessage(data.session ? "회원가입과 로그인이 완료되었습니다." : "인증 이메일을 보냈습니다. 이메일 인증 후 로그인해 주세요.", false);
}

async function signIn() {
  showAuthMessage("");
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: memberEmailInput.value.trim(),
    password: memberPasswordInput.value
  });
  if (error) return showAuthMessage("로그인 정보를 확인해 주세요.");
  renderSession(data.session);
  showAuthMessage("로그인되었습니다.", false);
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

document.querySelector("[data-sign-up]").addEventListener("click", signUp);
document.querySelector("[data-sign-in]").addEventListener("click", signIn);
document.querySelector("[data-sign-out]").addEventListener("click", async () => {
  await supabaseClient.auth.signOut();
  renderSession(null);
});
supabaseClient.auth.getSession().then(({ data }) => renderSession(data.session));
supabaseClient.auth.onAuthStateChange((_event, session) => renderSession(session));
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

  if (!currentSession?.access_token) {
    showError("회원가입 후 로그인해야 출품할 수 있습니다.");
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
        "Content-Type": "application/json",
        "Authorization": `Bearer ${currentSession.access_token}`,
        "apikey": config.supabasePublishableKey
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
    renderSession(currentSession);
    syncTitle();
    syncApplicantType();
  } catch (error) {
    showError(error.message || "접수 저장 중 오류가 발생했습니다.");
  } finally {
    setSubmitting(false);
  }
});
