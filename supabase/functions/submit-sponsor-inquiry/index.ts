import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const organizationTypes = new Set(["기업", "공공기관", "교육기관", "콘텐츠·미디어", "기타"]);
const interestTypes = new Set(["메인 후원", "부문 후원", "특별상 후원", "현물·미디어 후원", "협의 필요"]);
const budgetRanges = new Set(["협의", "500만원대", "1,000만원대", "2,000만~3,000만원", "5,000만원 이상", "1억원 규모"]);

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

function validate(payload: Payload) {
  const organizationName = asString(payload, "organizationName");
  const organizationType = asString(payload, "organizationType");
  const contactName = asString(payload, "contactName");
  const phone = asString(payload, "phone");
  const email = asString(payload, "email");
  const interestType = asString(payload, "interestType");
  const budgetRange = asString(payload, "budgetRange");
  const message = asString(payload, "message");

  const requiredValues = [
    ["기업·기관명", organizationName],
    ["기관 구분", organizationType],
    ["담당자명", contactName],
    ["연락처", phone],
    ["이메일", email],
    ["관심 후원 유형", interestType],
    ["예상 예산", budgetRange],
    ["제안 내용", message],
  ];

  const missing = requiredValues.find(([, value]) => !value);
  if (missing) return `${missing[0]} 항목을 입력해 주세요.`;

  if (!organizationTypes.has(organizationType)) return "기관 구분 값이 올바르지 않습니다.";
  if (!interestTypes.has(interestType)) return "관심 후원 유형 값이 올바르지 않습니다.";
  if (!budgetRanges.has(budgetRange)) return "예상 예산 값이 올바르지 않습니다.";

  if (organizationName.length > 120) return "기업·기관명은 120자 이내로 입력해 주세요.";
  if (contactName.length > 80) return "담당자명은 80자 이내로 입력해 주세요.";
  if (asString(payload, "positionTitle").length > 120) return "부서·직함은 120자 이내로 입력해 주세요.";
  if (phone.length > 40) return "연락처는 40자 이내로 입력해 주세요.";
  if (message.length > 2000) return "제안 내용은 최대 2,000자 이내로 작성해 주세요.";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "이메일 형식을 확인해 주세요.";
  }

  if (!asBoolean(payload, "privacyConsent")) {
    return "개인정보 수집 및 이용에 동의해 주세요.";
  }

  return "";
}

function makeInquiryNo() {
  const bytes = new Uint32Array(1);
  crypto.getRandomValues(bytes);
  const code = String(bytes[0] % 1_000_000).padStart(6, "0");
  return `SPONSOR-2026-${code}`;
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
  try {
    payload = await request.json();
  } catch {
    return json({ error: "요청 본문을 읽을 수 없습니다." }, 400, origin);
  }

  if (asString(payload, "website")) {
    return json({ inquiryNo: makeInquiryNo(), status: "문의접수" }, 200, origin);
  }

  const validationError = validate(payload);
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

  const row = {
    organization_name: asString(payload, "organizationName"),
    organization_type: asString(payload, "organizationType"),
    contact_name: asString(payload, "contactName"),
    position_title: asString(payload, "positionTitle") || null,
    phone: asString(payload, "phone"),
    email: asString(payload, "email"),
    interest_type: asString(payload, "interestType"),
    budget_range: asString(payload, "budgetRange"),
    message: asString(payload, "message"),
    privacy_consent: asBoolean(payload, "privacyConsent"),
    marketing_consent: asBoolean(payload, "marketingConsent"),
    status: "문의접수",
  };

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const inquiryNo = makeInquiryNo();
    const { data, error } = await supabase
      .from("sponsor_inquiries")
      .insert({ ...row, inquiry_no: inquiryNo })
      .select("inquiry_no, status")
      .single();

    if (!error && data) {
      return json({ inquiryNo: data.inquiry_no, status: data.status }, 200, origin);
    }

    if (error?.code !== "23505") {
      return json({ error: "후원 문의 저장 중 오류가 발생했습니다." }, 500, origin);
    }
  }

  return json({ error: "문의번호 생성 중 오류가 발생했습니다." }, 500, origin);
});
