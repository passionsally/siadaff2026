import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const categories = new Set(["Brand Poster", "Ad Film", "Short-form Drama", "Short Film"]);
const ageGroups = new Set(["청소년부", "성인부", "단체출품"]);
const productionTypes = new Set(["개인출품", "단체출품"]);
const aiUseValues = new Set(["활용함", "활용하지 않음"]);
const businessFileTypes = new Map([
  ["application/pdf", "pdf"],
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
]);
const businessFileMaxBytes = 10 * 1024 * 1024;
const businessFileBucket = "business-registrations";

type Payload = Record<string, unknown>;

function json(body: unknown, status = 200, origin = "*") {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Access-Control-Allow-Origin": origin,
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

function getOrigin(request: Request) {
  const requestOrigin = request.headers.get("origin") || "*";
  const allowed = (Deno.env.get("ALLOWED_ORIGINS") || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (allowed.length === 0 || allowed.includes(requestOrigin)) {
    return requestOrigin;
  }

  return "";
}

function asString(payload: Payload, key: string) {
  const value = payload[key];
  return typeof value === "string" ? value.trim() : "";
}

function asBoolean(payload: Payload, key: string) {
  return payload[key] === true || payload[key] === "true" || payload[key] === "on";
}

function isHttpUrl(value: string) {
  if (!value) return true;

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function hostMatches(value: string, hosts: string[]) {
  if (!value) return true;

  try {
    const hostname = new URL(value).hostname.replace(/^www\./, "").toLowerCase();
    return hosts.some((host) => hostname === host || hostname.endsWith(`.${host}`));
  } catch {
    return false;
  }
}

function validate(payload: Payload, businessFile: File | null) {
  const category = asString(payload, "category");
  const entryTitle = asString(payload, "entryTitle");
  const workTitle = asString(payload, "workTitle");
  const titleKo = asString(payload, "titleKo");
  const titleEn = asString(payload, "titleEn");
  const ageGroup = asString(payload, "ageGroup");
  const productionType = asString(payload, "productionType");
  const businessRegistrationNumber = asString(payload, "businessRegistrationNumber").replace(/\D/g, "");
  const runtime = asString(payload, "runtime");
  const aiUse = asString(payload, "aiUse");
  const synopsisKo = asString(payload, "synopsisKo");
  const synopsisEn = asString(payload, "synopsisEn");
  const youtubeUrl = asString(payload, "youtubeUrl");
  const name = asString(payload, "name");
  const phone = asString(payload, "phone");
  const email = asString(payload, "email");

  const requiredValues = [
    ["출품 부문", category],
    ["접수 제목", entryTitle],
    ["작품명", workTitle],
    ["제목 한글", titleKo],
    ["제목 영문", titleEn],
    ["연령 부문", ageGroup],
    ["제작 형태", productionType],
    ["러닝타임 또는 포스터 규격", runtime],
    ["AI 활용 여부", aiUse],
    ["시놉시스 한글", synopsisKo],
    ["시놉시스 영문", synopsisEn],
    ["이름", name],
    ["연락처", phone],
    ["이메일", email],
  ];

  const missing = requiredValues.find(([, value]) => !value);
  if (missing) return `${missing[0]} 항목을 입력해 주세요.`;

  if (!categories.has(category)) return "출품 부문 값이 올바르지 않습니다.";
  if (!ageGroups.has(ageGroup)) return "연령 부문 값이 올바르지 않습니다.";
  if (!productionTypes.has(productionType)) return "제작 형태 값이 올바르지 않습니다.";
  if ((ageGroup === "단체출품") !== (productionType === "단체출품")) {
    return "출품 구분 값이 서로 일치하지 않습니다.";
  }
  if (productionType === "단체출품" && !/^\d{10}$/.test(businessRegistrationNumber)) {
    return "단체출품은 10자리 사업자등록번호를 입력해 주세요.";
  }
  if (productionType === "개인출품" && businessRegistrationNumber) {
    return "개인출품에는 사업자등록번호를 입력하지 않습니다.";
  }
  if (productionType === "단체출품" && !businessFile) {
    return "단체출품은 사업자등록증 파일을 첨부해 주세요.";
  }
  if (productionType === "개인출품" && businessFile) {
    return "개인출품에는 사업자등록증 파일을 첨부하지 않습니다.";
  }
  if (businessFile) {
    const extension = businessFile.name.split(".").pop()?.toLowerCase() || "";
    const allowedExtension = ["pdf", "jpg", "jpeg", "png"].includes(extension);
    if (!businessFileTypes.has(businessFile.type) || !allowedExtension) {
      return "사업자등록증은 PDF, JPG, PNG 파일만 첨부할 수 있습니다.";
    }
    if (businessFile.size > businessFileMaxBytes) {
      return "사업자등록증 파일은 10MB 이하로 첨부해 주세요.";
    }
  }
  if (!aiUseValues.has(aiUse)) return "AI 활용 여부 값이 올바르지 않습니다.";

  if (synopsisKo.length > 1200 || synopsisEn.length > 1200) {
    return "시놉시스 또는 카피는 최대 1,200자 이내로 작성해 주세요.";
  }

  if (!youtubeUrl) {
    return "원본 영상 유튜브 URL을 입력해 주세요.";
  }

  if (!isHttpUrl(youtubeUrl) || !hostMatches(youtubeUrl, ["youtube.com", "youtu.be"])) {
    return "원본 영상은 유튜브 URL이어야 합니다.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "이메일 형식을 확인해 주세요.";
  }

  const consentKeys = [
    "rulesConsent",
    "rightsConsent",
    "privacyConsent",
    "promotionConsent",
    "teamParticipationConsent",
  ];
  if (!consentKeys.every((key) => asBoolean(payload, key))) {
    return "필수 동의 항목을 모두 확인해 주세요.";
  }

  return "";
}

function makeReceiptNo() {
  const bytes = new Uint32Array(1);
  crypto.getRandomValues(bytes);
  const code = String(bytes[0] % 1_000_000).padStart(6, "0");
  return `SIADAFF-2026-${code}`;
}

Deno.serve(async (request) => {
  const origin = getOrigin(request);

  if (!origin) {
    return json({ error: "허용되지 않은 요청 출처입니다." }, 403, "null");
  }

  if (request.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        ...corsHeaders,
        "Access-Control-Allow-Origin": origin,
      },
    });
  }

  if (request.method !== "POST") {
    return json({ error: "POST 요청만 허용합니다." }, 405, origin);
  }

  let payload: Payload;
  let businessFile: File | null = null;
  try {
    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const fileValue = formData.get("businessRegistrationFile");
      businessFile = fileValue instanceof File && fileValue.size > 0 ? fileValue : null;
      payload = Object.fromEntries(formData.entries());
    } else {
      payload = await request.json();
    }
  } catch {
    return json({ error: "요청 본문을 읽을 수 없습니다." }, 400, origin);
  }

  if (asString(payload, "website")) {
    return json({ receiptNo: makeReceiptNo(), status: "접수완료" }, 200, origin);
  }

  const validationError = validate(payload, businessFile);
  if (validationError) {
    return json({ error: validationError }, 400, origin);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !serviceRoleKey) {
    return json({ error: "Supabase 환경 변수가 설정되지 않았습니다." }, 500, origin);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  const authorization = request.headers.get("authorization") || "";
  const accessToken = authorization.replace(/^Bearer\s+/i, "").trim();
  if (!accessToken) return json({ error: "로그인이 필요합니다." }, 401, origin);
  const { data: authData, error: authError } = await supabase.auth.getUser(accessToken);
  if (authError || !authData.user?.id) return json({ error: "로그인 세션이 유효하지 않습니다." }, 401, origin);
  if (authData.user.email?.toLowerCase() !== asString(payload, "email").toLowerCase()) {
    return json({ error: "로그인 이메일과 신청 이메일이 일치해야 합니다." }, 400, origin);
  }

  let businessFilePath: string | null = null;
  if (asString(payload, "productionType") === "단체출품" && businessFile) {
    const extension = businessFileTypes.get(businessFile.type);
    businessFilePath = `${authData.user.id}/${crypto.randomUUID()}.${extension}`;
    const { error: uploadError } = await supabase.storage
      .from(businessFileBucket)
      .upload(businessFilePath, await businessFile.arrayBuffer(), {
        contentType: businessFile.type,
        upsert: false,
      });

    if (uploadError) {
      return json({ error: "사업자등록증 파일을 저장하지 못했습니다." }, 500, origin);
    }
  }

  const row = {
    user_id: authData.user.id,
    category: asString(payload, "category"),
    entry_title: asString(payload, "entryTitle"),
    work_title: asString(payload, "workTitle"),
    title_ko: asString(payload, "titleKo"),
    title_en: asString(payload, "titleEn"),
    age_group: asString(payload, "ageGroup"),
    production_type: asString(payload, "productionType"),
    business_registration_number: asString(payload, "productionType") === "단체출품"
      ? asString(payload, "businessRegistrationNumber").replace(/\D/g, "")
      : null,
    business_registration_file_path: businessFilePath,
    runtime_or_size: asString(payload, "runtime"),
    ai_used: asString(payload, "aiUse") === "활용함",
    ai_description: asString(payload, "aiMemo") || null,
    synopsis: asString(payload, "synopsisKo"),
    synopsis_ko: asString(payload, "synopsisKo"),
    synopsis_en: asString(payload, "synopsisEn"),
    youtube_url: asString(payload, "youtubeUrl") || null,
    instagram_url: null,
    tiktok_url: null,
    name: asString(payload, "name"),
    phone: asString(payload, "phone"),
    email: asString(payload, "email"),
    rules_consent: asBoolean(payload, "rulesConsent"),
    rights_consent: asBoolean(payload, "rightsConsent"),
    privacy_consent: asBoolean(payload, "privacyConsent"),
    promotion_consent: asBoolean(payload, "promotionConsent"),
    team_participation_consent: asBoolean(payload, "teamParticipationConsent"),
    status: "접수완료",
  };

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const receiptNo = makeReceiptNo();
    const { data, error } = await supabase
      .from("submissions")
      .insert({ ...row, receipt_no: receiptNo })
      .select("receipt_no, status")
      .single();

    if (!error && data) {
      return json({ receiptNo: data.receipt_no, status: data.status }, 200, origin);
    }

    if (error?.code !== "23505") {
      if (businessFilePath) {
        await supabase.storage.from(businessFileBucket).remove([businessFilePath]);
      }
      return json({ error: "접수 저장 중 오류가 발생했습니다." }, 500, origin);
    }
  }

  if (businessFilePath) {
    await supabase.storage.from(businessFileBucket).remove([businessFilePath]);
  }
  return json({ error: "접수번호 생성 중 오류가 발생했습니다." }, 500, origin);
});
