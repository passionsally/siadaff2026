import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-admin-token",
  "Access-Control-Allow-Methods": "GET, PATCH, OPTIONS",
};

const submissionStatuses = new Set(["접수완료", "검토중", "수상확정", "내년에 재도전 응원해요"]);
const sponsorStatuses = new Set(["문의접수", "검토중", "연락완료", "후원확정", "보류"]);

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

function getAdminToken(request: Request) {
  const authorization = request.headers.get("authorization") || "";
  const bearerToken = authorization.toLowerCase().startsWith("bearer ")
    ? authorization.slice(7).trim()
    : "";

  return request.headers.get("x-admin-token") || bearerToken || "";
}

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function submissionFields() {
  return "receipt_no,category,title_ko,title_en,work_title,age_group,production_type,business_registration_number,runtime_or_size,ai_used,ai_description,synopsis_ko,synopsis_en,synopsis,youtube_url,instagram_url,tiktok_url,name,phone,email,status,admin_memo,created_at,updated_at";
}

function sponsorFields() {
  return "inquiry_no,organization_name,organization_type,contact_name,position_title,phone,email,interest_type,budget_range,message,marketing_consent,status,admin_memo,created_at,updated_at";
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

  if (request.method !== "GET" && request.method !== "PATCH") {
    return json({ error: "GET 또는 PATCH 요청만 허용합니다." }, 405, origin);
  }

  const adminToken = Deno.env.get("ADMIN_ACCESS_TOKEN");
  if (!adminToken) {
    return json({ error: "관리자 접근 토큰이 설정되지 않았습니다." }, 500, origin);
  }

  if (getAdminToken(request) !== adminToken) {
    return json({ error: "관리자 접근 권한이 없습니다." }, 401, origin);
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

  if (request.method === "PATCH") {
    let payload: Record<string, unknown>;
    try {
      payload = await request.json();
    } catch {
      return json({ error: "요청 본문을 읽을 수 없습니다." }, 400, origin);
    }

    const type = asString(payload.type);
    const id = asString(payload.id);
    const status = asString(payload.status);
    const adminMemo = asString(payload.adminMemo);

    if (!id) {
      return json({ error: "관리할 접수번호 또는 문의번호가 필요합니다." }, 400, origin);
    }

    if (adminMemo.length > 2000) {
      return json({ error: "관리 메모는 2,000자 이내로 입력해 주세요." }, 400, origin);
    }

    if (type === "submission") {
      if (!submissionStatuses.has(status)) {
        return json({ error: "출품 접수 상태 값이 올바르지 않습니다." }, 400, origin);
      }

      const { data, error } = await supabase
        .from("submissions")
        .update({ status, admin_memo: adminMemo || null })
        .eq("receipt_no", id)
        .select(submissionFields())
        .single();

      if (error || !data) {
        return json({ error: "출품 접수 관리 정보를 저장하지 못했습니다." }, 500, origin);
      }

      return json({ submission: data }, 200, origin);
    }

    if (type === "sponsor") {
      if (!sponsorStatuses.has(status)) {
        return json({ error: "후원 문의 상태 값이 올바르지 않습니다." }, 400, origin);
      }

      const { data, error } = await supabase
        .from("sponsor_inquiries")
        .update({ status, admin_memo: adminMemo || null })
        .eq("inquiry_no", id)
        .select(sponsorFields())
        .single();

      if (error || !data) {
        return json({ error: "후원 문의 관리 정보를 저장하지 못했습니다." }, 500, origin);
      }

      return json({ sponsorInquiry: data }, 200, origin);
    }

    return json({ error: "관리 대상 유형이 올바르지 않습니다." }, 400, origin);
  }

  const [submissionsResult, sponsorResult] = await Promise.all([
    supabase
      .from("submissions")
      .select(submissionFields())
      .order("created_at", { ascending: false })
      .limit(500),
    supabase
      .from("sponsor_inquiries")
      .select(sponsorFields())
      .order("created_at", { ascending: false })
      .limit(500),
  ]);

  if (submissionsResult.error) {
    return json({ error: "출품 접수 데이터를 불러오지 못했습니다." }, 500, origin);
  }

  if (sponsorResult.error) {
    return json({ error: "후원 문의 데이터를 불러오지 못했습니다." }, 500, origin);
  }

  return json(
    {
      generatedAt: new Date().toISOString(),
      submissions: submissionsResult.data || [],
      sponsorInquiries: sponsorResult.data || [],
      counts: {
        submissions: submissionsResult.data?.length || 0,
        sponsorInquiries: sponsorResult.data?.length || 0,
      },
    },
    200,
    origin,
  );
});
