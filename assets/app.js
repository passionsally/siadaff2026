import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

const form = document.querySelector("[data-submit-form]");
const categorySelect = document.querySelector("#category");
const titleSelect = document.querySelector("#entryTitle");
const errorBox = document.querySelector("[data-form-error]");
const successPanel = document.querySelector("[data-success-panel]");
const receiptTarget = document.querySelector("[data-receipt-id]");
const successMessage = document.querySelector("[data-success-message]");
const submitButton = form.querySelector("button[type='submit']");
const ageGroupSelect = document.querySelector("#ageGroup");
const productionTypeSelect = document.querySelector("#productionType");
const businessNumberField = document.querySelector("#businessNumberField");
const businessNumberInput = document.querySelector("#businessRegistrationNumber");
const businessFileField = document.querySelector("#businessFileField");
const businessFileInput = document.querySelector("#businessRegistrationFile");
const submissionFields = document.querySelector("[data-submission-fields]");
const authGuest = document.querySelector("[data-auth-guest]");
const authMember = document.querySelector("[data-auth-member]");
const authMessage = document.querySelector("[data-auth-message]");
const memberEmailInput = document.querySelector("#memberEmail");
const memberPasswordInput = document.querySelector("#memberPassword");
const memberEmailTarget = document.querySelector("[data-member-email]");
const applicantEmailInput = document.querySelector("#email");
const authModal = document.querySelector("[data-auth-modal]");
const authModalTitle = document.querySelector("[data-auth-modal-title]");
const submissionDeadline = Date.parse("2026-10-21T00:00:00+09:00");
const pageContext = document.querySelector("[data-page-context]");
const pageContextLabel = document.querySelector("[data-page-context-label]");

const config = window.SIADAFF_CONFIG || {};
const supabaseClient = createClient(
  config.supabaseUrl,
  config.supabasePublishableKey
);
let currentSession = null;

const categoryNames = {
  "Ad Film": "39초 광고영상",
  "Short-form Drama": "59초 숏폼드라마",
  "Short Film": "3분 단편영화",
  "Short Animation": "3분 단편애니메이션"
};

function removeObsoletePosterOptions() {
  [categorySelect, titleSelect].forEach((select) => {
    Array.from(select.options).forEach((option) => {
      const optionText = `${option.value} ${option.textContent} ${option.dataset.category || ""}`;
      if (/포스터|poster/i.test(optionText)) {
        option.remove();
      }
    });
  });
}

removeObsoletePosterOptions();

function syncTitleFromCategory() {
  const label = categoryNames[categorySelect.value];
  titleSelect.value = label ? `SIADAFF 1회 ${label} 부문 출품작` : "";
}

function syncCategoryFromTitle() {
  const selectedOption = titleSelect.selectedOptions[0];
  if (selectedOption?.dataset.category) {
    categorySelect.value = selectedOption.dataset.category;
  }
}

function syncApplicantType() {
  const isGroup = ageGroupSelect.value === "단체출품";
  productionTypeSelect.value = ageGroupSelect.value
    ? (isGroup ? "단체출품" : "개인출품")
    : "";
  businessNumberField.hidden = !isGroup;
  businessFileField.hidden = !isGroup;
  businessNumberInput.required = isGroup;
  businessFileInput.required = isGroup;
  if (!isGroup) {
    businessNumberInput.value = "";
    businessFileInput.value = "";
  }
}

function normalizeBusinessNumber() {
  businessNumberInput.value = businessNumberInput.value
    .replace(/\D/g, "")
    .slice(0, 10)
    .replace(/^(\d{3})(\d{0,2})(\d{0,5}).*$/, (_, a, b, c) =>
      [a, b, c].filter(Boolean).join("-")
    );
}

function validateBusinessFile() {
  const isGroup = ageGroupSelect.value === "단체출품";
  const file = businessFileInput.files?.[0];

  if (!isGroup) return "";
  if (!file) return "단체(기업)출품은 사업자등록증 파일을 첨부해 주세요.";

  const allowedTypes = new Set(["application/pdf", "image/jpeg", "image/png"]);
  const extension = file.name.split(".").pop()?.toLowerCase();
  if (!allowedTypes.has(file.type) || !["pdf", "jpg", "jpeg", "png"].includes(extension || "")) {
    return "사업자등록증은 PDF, JPG, PNG 파일만 첨부할 수 있습니다.";
  }

  if (file.size > 10 * 1024 * 1024) {
    return "사업자등록증 파일은 10MB 이하로 첨부해 주세요.";
  }

  return "";
}

function showAuthMessage(message, isError = true) {
  authMessage.textContent = message || "";
  authMessage.classList.toggle("is-visible", Boolean(message));
  authMessage.style.color = isError ? "#b42318" : "#087f5b";
}

function openAuthModal(mode = "login") {
  authModal.hidden = false;
  document.body.classList.add("modal-open");
  authModalTitle.textContent = mode === "signup" ? "회원가입" : "로그인";
  window.setTimeout(() => memberEmailInput.focus(), 50);
}

function closeAuthModal() {
  authModal.hidden = true;
  document.body.classList.remove("modal-open");
}

function isSubmissionClosed() {
  return Date.now() >= submissionDeadline;
}

function updatePageContext() {
  const labels = {
    "#guideline": "가이드라인",
    "#rules": "가이드라인",
    "#submit": "작품출품하기"
  };
  const label = labels[location.hash];
  pageContext.hidden = !label;
  pageContextLabel.textContent = label || "";
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
    options: {
      emailRedirectTo: config.authRedirectUrl || `${location.origin}/`
    }
  });
  if (error) return showAuthMessage(error.message);
  renderSession(data.session);
  showAuthMessage(
    data.session
      ? "회원가입과 로그인이 완료되었습니다. 작품은 원하실 때 출품하시면 됩니다."
      : "인증 이메일을 보냈습니다. 이메일 인증만 먼저 완료해 주세요. 지금 바로 출품하지 않아도 됩니다.",
    false
  );
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
  closeAuthModal();
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

function setSubmitting(isSubmitting) {
  submitButton.disabled = isSubmitting;
  submitButton.textContent = isSubmitting ? "접수 저장 중" : "출품 등록";
}

function initReveal() {
  const items = document.querySelectorAll("section, .category-cards article, .rule-panel");
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
document.querySelectorAll("[data-auth-open]").forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    openAuthModal(trigger.dataset.authOpen);
  });
});
document.querySelectorAll("[data-auth-close]").forEach((trigger) => {
  trigger.addEventListener("click", closeAuthModal);
});
document.querySelectorAll('a[href="#submit"], a[href="/earlybird/"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    if (!isSubmissionClosed()) return;
    event.preventDefault();
    window.alert("접수마감입니다. 내년에 도전하세요.");
  });
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !authModal.hidden) closeAuthModal();
});
window.addEventListener("hashchange", updatePageContext);
updatePageContext();
document.querySelector("[data-sign-out]").addEventListener("click", async () => {
  await supabaseClient.auth.signOut();
  renderSession(null);
});
supabaseClient.auth.getSession().then(({ data }) => renderSession(data.session));
supabaseClient.auth.onAuthStateChange((_event, session) => renderSession(session));
categorySelect.addEventListener("change", syncTitleFromCategory);
titleSelect.addEventListener("change", syncCategoryFromTitle);
ageGroupSelect.addEventListener("change", syncApplicantType);
businessNumberInput.addEventListener("input", normalizeBusinessNumber);
syncTitleFromCategory();
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

  const businessFileError = validateBusinessFile();
  if (businessFileError) {
    showError(businessFileError);
    businessFileInput.focus();
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
        "Authorization": `Bearer ${currentSession.access_token}`,
        "apikey": config.supabasePublishableKey
      },
      body: data
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
    syncTitleFromCategory();
    syncApplicantType();
  } catch (error) {
    showError(error.message || "접수 저장 중 오류가 발생했습니다.");
  } finally {
    setSubmitting(false);
  }
});

const filmstrip = document.querySelector("[data-filmstrip]");
if (filmstrip) {
  const slides = Array.from(filmstrip.querySelectorAll(".filmstrip-slide"));
  const dotsWrap = filmstrip.querySelector("[data-filmstrip-dots]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let activeSlide = 0;
  let filmstripTimer = null;

  const showFilmstripSlide = (index) => {
    activeSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === activeSlide);
    });
    dotsWrap.querySelectorAll(".filmstrip-dot").forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activeSlide);
      dot.setAttribute("aria-current", dotIndex === activeSlide ? "true" : "false");
    });
  };

  slides.forEach((slide, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = `filmstrip-dot${index === 0 ? " is-active" : ""}`;
    dot.setAttribute("aria-label", `${index + 1}번째 행사사진 보기`);
    dot.setAttribute("aria-current", index === 0 ? "true" : "false");
    dot.addEventListener("click", () => {
      showFilmstripSlide(index);
      restartFilmstrip();
    });
    dotsWrap.append(dot);
  });

  const startFilmstrip = () => {
    if (reduceMotion || slides.length < 2 || filmstripTimer) return;
    filmstripTimer = window.setInterval(() => showFilmstripSlide(activeSlide + 1), 4500);
  };

  const stopFilmstrip = () => {
    if (!filmstripTimer) return;
    window.clearInterval(filmstripTimer);
    filmstripTimer = null;
  };

  const restartFilmstrip = () => {
    stopFilmstrip();
    startFilmstrip();
  };

  filmstrip.addEventListener("mouseenter", stopFilmstrip);
  filmstrip.addEventListener("mouseleave", startFilmstrip);
  filmstrip.addEventListener("focusin", stopFilmstrip);
  filmstrip.addEventListener("focusout", startFilmstrip);
  startFilmstrip();
}
