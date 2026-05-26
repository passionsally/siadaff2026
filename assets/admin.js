const adminConfig = window.SIADAFF_CONFIG || {};
const tokenStorageKey = "siadaffAdminToken";
const params = new URLSearchParams(window.location.search);
const urlToken = params.get("admin") || "";

const accessPanel = document.querySelector("[data-access-panel]");
const statusPanel = document.querySelector("[data-status-panel]");
const toolPanel = document.querySelector("[data-tool-panel]");
const messageBox = document.querySelector("[data-admin-message]");
const submissionCount = document.querySelector("[data-submission-count]");
const sponsorCount = document.querySelector("[data-sponsor-count]");
const syncTime = document.querySelector("[data-sync-time]");
const submissionRows = document.querySelector("[data-submission-rows]");
const sponsorRows = document.querySelector("[data-sponsor-rows]");
const searchInput = document.querySelector("[data-search]");

let activeTab = "submissions";
let adminToken = urlToken || localStorage.getItem(tokenStorageKey) || "";
let adminData = {
  submissions: [],
  sponsorInquiries: [],
};

if (urlToken) {
  localStorage.setItem(tokenStorageKey, urlToken);
  window.history.replaceState({}, document.title, "/admin/");
}

function formatDate(value) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showMessage(message, isError = false) {
  messageBox.textContent = message;
  messageBox.hidden = false;
  messageBox.classList.toggle("is-error", isError);
}

function hideMessage() {
  messageBox.hidden = true;
  messageBox.textContent = "";
  messageBox.classList.remove("is-error");
}

function setAuthenticatedLayout(isAuthenticated) {
  accessPanel.hidden = isAuthenticated;
  statusPanel.hidden = !isAuthenticated;
  toolPanel.hidden = !isAuthenticated;
  document.querySelectorAll("[data-tab-panel]").forEach((panel) => {
    panel.hidden = !isAuthenticated;
  });
}

function searchableText(row) {
  return Object.values(row)
    .filter((value) => value !== null && value !== undefined)
    .join(" ")
    .toLowerCase();
}

function currentRows() {
  const query = (searchInput.value || "").trim().toLowerCase();
  const rows = activeTab === "submissions" ? adminData.submissions : adminData.sponsorInquiries;
  if (!query) return rows;
  return rows.filter((row) => searchableText(row).includes(query));
}

function renderSubmissions() {
  const rows = currentRows();
  submissionRows.innerHTML = rows.map((row) => {
    const title = row.title_ko || row.work_title || row.entry_title || "-";
    const titleEn = row.title_en ? `<span class="muted">${escapeHtml(row.title_en)}</span>` : "";
    const urls = [row.youtube_url, row.instagram_url, row.tiktok_url].filter(Boolean);
    const urlText = urls.length ? `<span class="muted">${escapeHtml(urls.join(" / "))}</span>` : "";

    return `
      <tr>
        <td>${escapeHtml(formatDate(row.created_at))}</td>
        <td><strong>${escapeHtml(row.receipt_no)}</strong></td>
        <td>${escapeHtml(row.category)}</td>
        <td><strong>${escapeHtml(title)}</strong>${titleEn}${urlText}</td>
        <td>${escapeHtml(row.age_group)}<br><span class="muted">${escapeHtml(row.production_type)} / ${escapeHtml(row.runtime_or_size)}</span></td>
        <td><strong>${escapeHtml(row.name)}</strong><span class="muted">${row.ai_used ? "AI 활용" : "AI 미활용"}</span></td>
        <td>${escapeHtml(row.phone)}<br><span class="muted">${escapeHtml(row.email)}</span></td>
        <td><span class="status-pill">${escapeHtml(row.status)}</span></td>
      </tr>
    `;
  }).join("");

  if (!rows.length) {
    submissionRows.innerHTML = `<tr><td colspan="8">표시할 출품 접수가 없습니다.</td></tr>`;
  }
}

function renderSponsors() {
  const rows = currentRows();
  sponsorRows.innerHTML = rows.map((row) => `
    <tr>
      <td>${escapeHtml(formatDate(row.created_at))}</td>
      <td><strong>${escapeHtml(row.inquiry_no)}</strong></td>
      <td><strong>${escapeHtml(row.organization_name)}</strong><span class="muted">${escapeHtml(row.organization_type)}</span></td>
      <td>${escapeHtml(row.contact_name)}<br><span class="muted">${escapeHtml(row.position_title || "-")}</span></td>
      <td>${escapeHtml(row.interest_type)}</td>
      <td>${escapeHtml(row.budget_range)}</td>
      <td>${escapeHtml(row.phone)}<br><span class="muted">${escapeHtml(row.email)}</span></td>
      <td><span class="status-pill">${escapeHtml(row.status)}</span></td>
    </tr>
  `).join("");

  if (!rows.length) {
    sponsorRows.innerHTML = `<tr><td colspan="8">표시할 후원 문의가 없습니다.</td></tr>`;
  }
}

function render() {
  submissionCount.textContent = adminData.submissions.length;
  sponsorCount.textContent = adminData.sponsorInquiries.length;
  syncTime.textContent = formatDate(new Date().toISOString());
  renderSubmissions();
  renderSponsors();

  document.querySelectorAll("[data-tab-button]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tabButton === activeTab);
  });
  document.querySelectorAll("[data-tab-panel]").forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.tabPanel === activeTab);
  });
}

async function loadAdminData() {
  if (!adminToken) {
    setAuthenticatedLayout(false);
    showMessage("관리자 공유 링크로 접속하면 접수 현황을 볼 수 있습니다.", true);
    return;
  }

  if (!adminConfig.adminDataEndpoint) {
    setAuthenticatedLayout(false);
    showMessage("관리자 데이터 API 주소가 설정되지 않았습니다.", true);
    return;
  }

  setAuthenticatedLayout(true);
  showMessage("접수 현황을 불러오는 중입니다.");

  try {
    const response = await fetch(adminConfig.adminDataEndpoint, {
      method: "GET",
      headers: {
        "x-admin-token": adminToken,
      },
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(result.error || "관리자 데이터를 불러오지 못했습니다.");
    }

    adminData = {
      submissions: result.submissions || [],
      sponsorInquiries: result.sponsorInquiries || [],
    };
    hideMessage();
    render();
  } catch (error) {
    setAuthenticatedLayout(false);
    showMessage(error.message || "관리자 데이터를 불러오지 못했습니다.", true);
  }
}

function downloadCsv() {
  const rows = currentRows();
  const headers = activeTab === "submissions"
    ? ["created_at", "receipt_no", "category", "title_ko", "title_en", "age_group", "production_type", "name", "phone", "email", "status"]
    : ["created_at", "inquiry_no", "organization_name", "organization_type", "contact_name", "phone", "email", "interest_type", "budget_range", "status", "message"];
  const csv = [
    headers.join(","),
    ...rows.map((row) => headers.map((key) => `"${String(row[key] ?? "").replaceAll('"', '""')}"`).join(",")),
  ].join("\n");
  const blob = new Blob([`\ufeff${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `siadaff-${activeTab}-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

document.querySelectorAll("[data-tab-button]").forEach((button) => {
  button.addEventListener("click", () => {
    activeTab = button.dataset.tabButton;
    render();
  });
});

document.querySelector("[data-refresh]").addEventListener("click", loadAdminData);
document.querySelector("[data-download-csv]").addEventListener("click", downloadCsv);
document.querySelector("[data-logout]").addEventListener("click", () => {
  localStorage.removeItem(tokenStorageKey);
  adminToken = "";
  adminData = { submissions: [], sponsorInquiries: [] };
  setAuthenticatedLayout(false);
  showMessage("관리자 접근을 해제했습니다. 다시 보려면 공유 링크로 접속하세요.", true);
});
searchInput.addEventListener("input", render);

loadAdminData();
