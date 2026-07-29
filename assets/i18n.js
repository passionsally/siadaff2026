(function () {
  const dictionaries = {
    en: {
      "주요 메뉴": "Main navigation", "홈페이지 언어 선택": "Website language",
      "SIADAFF 홈": "SIADAFF Home",
      "로그인": "Log in", "회원가입": "Sign up", "작품출품하기": "Submit a Work",
      "슈퍼얼리버드 신청접수하기": "Apply for Super Early Bird", "가이드라인": "Guidelines", "후원 제안": "Sponsorship",
      "정가 42,700원": "Regular price KRW 42,700", "29,900원부터": "From KRW 29,900",
      "슈퍼얼리버드 8월 12일까지 30% 할인 적용": "30% Super Early Bird discount through August 12",
      "슈퍼얼리버드·얼리버드 신청 혜택": "Super Early Bird · Early Bird Benefits",
      "무료 웹세미나 · 영상제작 크레딧 지원": "Free webinar · Video production credits",
      "2,000만원": "KRW 20 million", "대상부터 특별상까지 확정된 총상금": "Confirmed total prize pool from Grand Prix to Special Awards",
      "후원기업 / 후원공기관": "Sponsors / Supporting Institutions", "파트너사": "Partners",
      "서울국제광고영화제 2026 출품 규정": "SIADAFF 2026 Submission Guidelines",
      "후원기업 브랜드, 캠페인, 제품, 서비스를 주제로 한 공익 또는 상업 광고 포스터": "Public-interest or commercial advertising posters featuring sponsor brands, campaigns, products or services",
      "브랜디드 필름, TVC, 온라인 광고, 시네마 광고 등 39초 이내 광고영상": "Advertising films up to 39 seconds, including branded films, TVCs, online and cinema ads",
      "도시, 시민, 생활, 미래, 기술을 자유롭게 해석한 59초 이내 숏폼드라마": "Short-form dramas up to 59 seconds interpreting cities, citizens, life, the future or technology",
      "장르와 주제를 자유롭게 표현한 3분 이내 단편영화": "Short films up to 3 minutes with any genre or theme",
      "상세 출품 규정 보기": "View Detailed Guidelines", "개인/단체": "Individual / Organization",
      "개인": "Individual", "청소년부": "Youth", "10~19세": "Ages 10–19", "성인부": "Adult", "20세 이상": "Age 20+",
      "단체": "Organization", "기업": "Company",
      "출품마감 기준일은 대한민국 시간 2026년 10월 20일(화) 자정입니다.": "The age cutoff is midnight on October 20, 2026, Korea Standard Time.",
      "개인출품 나이는 해당 기준일을 기준으로 구분합니다.": "Individual divisions are determined by age on this date.",
      "단체출품은 2026년 3월 28일 이전 개업한 사업자여야 합니다.": "Organization entries must be businesses established before March 28, 2026.",
      "행사 개요": "Festival Overview", "주최·주관·후원": "Organizer · Operator · Sponsors",
      "행사명": "Festival", "출품 대상": "Categories", "출품 주제": "Theme", "공식 언어": "Official Language", "해외 접수": "International Entries",
      "서울국제광고영화제 2026": "Seoul International Advertising Art Film Festival 2026",
      "포스터, 39초 광고, 59초 숏폼드라마, 3분 단편영화": "Poster, 39-sec Ad Film, 59-sec Short-form Drama, 3-min Short Film",
      "한국어 기준, 외국어 사용 시 한글 자막 필수": "Korean is the official language; Korean subtitles are required for other languages",
      "주최": "Organizer", "주관": "Operator", "후원": "Sponsors",
      "접수 및 심사 일정": "Submission & Judging Schedule", "접수 시작": "Submissions Open", "접수 마감": "Submissions Close",
      "1차 예심": "Preliminary Judging", "2차 본심": "Final Judging", "시상식": "Awards Ceremony", "한국시간 기준": "Korea Standard Time",
      "상세 출품 규정": "Detailed Submission Guidelines", "접수 방법과 출품 수": "How to Submit & Entry Limit",
      "단체출품 유의사항": "Organization Entry Requirements", "영상·이미지 기술 규격": "Video & Image Specifications",
      "AI·직접 촬영·권리 책임": "AI · Live Action · Rights", "원본 영상 URL 심사 조건": "Original Video URL Requirements",
      "심사 기준 100점": "Judging Criteria · 100 Points", "개인정보 수집 기준": "Privacy & Data Collection",
      "창의성": "Creativity", "메시지": "Message", "완성도": "Execution", "감성·공감도": "Emotion · Empathy", "디지털 확장성": "Digital Scalability",
      "총상금 2,000만원": "Total Prize Pool · KRW 20 Million",
      "수상자는 시상식 당일 발표합니다. 시상식 불참자의 경우 이메일로 개별 안내합니다.": "Winners will be announced at the awards ceremony. Absentees will be notified individually by email.",
      "대상 1편": "Grand Prix · 1 Work", "500만원": "KRW 5 Million",
      "최우수상 4편 (포스터 1편, 광고 1편, 숏폼드라마 1편, 단편영화 1편)": "Excellence Awards · 4 Works (one per category)",
      "각 150만원 / 총 600만원": "KRW 1.5 Million Each / KRW 6 Million Total",
      "우수상 4편 (포스터 1편, 광고 1편, 숏폼드라마 1편, 단편영화 1편)": "Merit Awards · 4 Works (one per category)",
      "각 100만원 / 총 400만원": "KRW 1 Million Each / KRW 4 Million Total",
      "후원기관특별상 5편": "Sponsor Special Awards · 5 Works", "각 100만원 / 총 500만원": "KRW 1 Million Each / KRW 5 Million Total",
      "장려상 8편 (포스터 2편, 광고 2편, 숏폼드라마 2편, 단편영화 2편)": "Encouragement Awards · 8 Works (two per category)",
      "상장 수여 / 현금상금 없음": "Certificate / No Cash Prize",
      "회원가입 후 원본 영상 URL로 출품합니다": "Sign Up and Submit the Original Video URL",
      "작품출품은 2026년 9월 28일부터 가능합니다.": "Submissions open on September 28, 2026.",
      "출품자 로그인": "Entrant Login", "작품을 출품할 때만 로그인해 주세요.": "Log in only when you are ready to submit.",
      "회원가입만 먼저 해두어도 됩니다. 가입 직후 작품을 출품할 필요는 없습니다.": "You may sign up now and submit your work later.",
      "로그인 / 회원가입": "Log in / Sign up", "로그인 완료": "Logged in", "로그아웃": "Log out",
      "작품 정보": "Work Information", "원본 영상 URL": "Original Video URL", "신청자 정보 및 동의": "Applicant Information & Consent",
      "필수 입력": "Required", "출품 부문": "Category", "개인/단체": "Individual / Organization", "접수 제목": "Submission Title",
      "작품명": "Work Name", "제목 한글": "Korean Title", "제목 영문": "English Title", "사업자등록번호": "Business Registration Number",
      "사업자등록증 파일": "Business Registration Certificate", "AI 활용 여부": "Use of AI", "러닝타임 또는 포스터 규격": "Runtime or Poster Specifications",
      "AI 활용 설명": "AI Use Description", "시놉시스 한글": "Korean Synopsis", "시놉시스 영문": "English Synopsis",
      "원본 영상 유튜브 URL": "Original Video YouTube URL", "이름": "Name", "연락처": "Phone", "이메일": "Email",
      "선택": "Select", "활용함": "Used", "활용하지 않음": "Not Used",
      "출품 등록": "Submit Entry", "회원 이메일": "Member Email", "비밀번호": "Password", "닫기": "Close",
      "회원가입만 먼저 해두어도 됩니다. 지금 바로 작품을 출품하지 않아도 됩니다.": "You may sign up now. You do not need to submit immediately.",
      "출품 규정에 동의합니다.": "I agree to the submission guidelines.",
      "저작권/초상권/음원 사용 책임에 동의합니다.": "I accept responsibility for copyrights, likeness rights and music use.",
      "수상작 및 출품작 홍보 활용에 동의합니다.": "I agree to promotional use of submitted and winning works."
    },
    "zh-CN": {
      "주요 메뉴": "主菜单", "홈페이지 언어 선택": "网站语言", "SIADAFF 홈": "SIADAFF首页",
      "Guideline": "参赛指南", "Submit": "作品提交", "Reward": "奖项", "Archive": "资料库", "Sponsor": "赞助合作",
      "로그인": "登录", "회원가입": "注册", "작품출품하기": "提交作品",
      "슈퍼얼리버드 신청접수하기": "超级早鸟申请", "가이드라인": "参赛指南", "후원 제안": "赞助合作",
      "정가 42,700원": "原价 42,700韩元", "29,900원부터": "29,900韩元起",
      "슈퍼얼리버드 8월 12일까지 30% 할인 적용": "超级早鸟优惠至8月12日，享受七折",
      "슈퍼얼리버드·얼리버드 신청 혜택": "超级早鸟·早鸟申请福利",
      "무료 웹세미나 · 영상제작 크레딧 지원": "免费网络研讨会 · 视频制作额度支持",
      "2,000만원": "2,000万韩元", "대상부터 특별상까지 확정된 총상금": "从大奖到特别奖的确定总奖金",
      "후원기업 / 후원공기관": "赞助企业 / 支持机构", "파트너사": "合作伙伴",
      "서울국제광고영화제 2026 출품 규정": "SIADAFF 2026 参赛规则",
      "후원기업 브랜드, 캠페인, 제품, 서비스를 주제로 한 공익 또는 상업 광고 포스터": "以赞助品牌、活动、产品或服务为主题的公益或商业广告海报",
      "브랜디드 필름, TVC, 온라인 광고, 시네마 광고 등 39초 이내 광고영상": "39秒以内的品牌影片、电视广告、网络广告或影院广告",
      "도시, 시민, 생활, 미래, 기술을 자유롭게 해석한 59초 이내 숏폼드라마": "自由诠释城市、市民、生活、未来或科技的59秒以内短剧",
      "장르와 주제를 자유롭게 표현한 3분 이내 단편영화": "题材与类型不限的3分钟以内短片",
      "상세 출품 규정 보기": "查看详细规则", "개인/단체": "个人 / 团体",
      "개인": "个人", "청소년부": "青少年组", "10~19세": "10–19岁", "성인부": "成人组", "20세 이상": "20岁以上",
      "단체": "团体", "기업": "企业",
      "출품마감 기준일은 대한민국 시간 2026년 10월 20일(화) 자정입니다.": "年龄计算截止时间为韩国时间2026年10月20日（星期二）午夜。",
      "개인출품 나이는 해당 기준일을 기준으로 구분합니다.": "个人组别按该截止日期的年龄划分。",
      "단체출품은 2026년 3월 28일 이전 개업한 사업자여야 합니다.": "团体参赛者须为2026年3月28日前开业的企业。",
      "행사 개요": "电影节概况", "주최·주관·후원": "主办·承办·赞助",
      "행사명": "活动名称", "출품 대상": "参赛类别", "출품 주제": "参赛主题", "공식 언어": "官方语言", "해외 접수": "海外报名",
      "서울국제광고영화제 2026": "2026首尔国际广告电影节",
      "포스터, 39초 광고, 59초 숏폼드라마, 3분 단편영화": "海报、39秒广告、59秒短剧、3分钟短片",
      "한국어 기준, 외국어 사용 시 한글 자막 필수": "官方语言为韩语，使用其他语言须配韩文字幕",
      "주최": "主办", "주관": "承办", "후원": "赞助",
      "접수 및 심사 일정": "报名与评审日程", "접수 시작": "报名开始", "접수 마감": "报名截止",
      "1차 예심": "第一轮初审", "2차 본심": "第二轮终审", "시상식": "颁奖典礼", "한국시간 기준": "以韩国时间为准",
      "상세 출품 규정": "详细参赛规则", "접수 방법과 출품 수": "报名方式与作品数量",
      "단체출품 유의사항": "团体参赛须知", "영상·이미지 기술 규격": "视频与图像技术规格",
      "AI·직접 촬영·권리 책임": "AI·实拍·权利责任", "원본 영상 URL 심사 조건": "原始视频链接评审条件",
      "심사 기준 100점": "评审标准 100分", "개인정보 수집 기준": "个人信息收集标准",
      "창의성": "创意", "메시지": "信息表达", "완성도": "完成度", "감성·공감도": "情感·共鸣", "디지털 확장성": "数字扩展性",
      "총상금 2,000만원": "总奖金2,000万韩元",
      "수상자는 시상식 당일 발표합니다. 시상식 불참자의 경우 이메일로 개별 안내합니다.": "获奖者将在颁奖典礼当天公布，未到场者将通过电子邮件另行通知。",
      "대상 1편": "大奖 1部", "500만원": "500万韩元",
      "최우수상 4편 (포스터 1편, 광고 1편, 숏폼드라마 1편, 단편영화 1편)": "最优秀奖 4部（每个类别1部）",
      "각 150만원 / 총 600만원": "每部150万韩元 / 共600万韩元",
      "우수상 4편 (포스터 1편, 광고 1편, 숏폼드라마 1편, 단편영화 1편)": "优秀奖 4部（每个类别1部）",
      "각 100만원 / 총 400만원": "每部100万韩元 / 共400万韩元",
      "후원기관특별상 5편": "赞助机构特别奖 5部", "각 100만원 / 총 500만원": "每部100万韩元 / 共500万韩元",
      "장려상 8편 (포스터 2편, 광고 2편, 숏폼드라마 2편, 단편영화 2편)": "鼓励奖 8部（每个类别2部）",
      "상장 수여 / 현금상금 없음": "颁发证书 / 无现金奖金",
      "회원가입 후 원본 영상 URL로 출품합니다": "注册后提交原始视频链接",
      "작품출품은 2026년 9월 28일부터 가능합니다.": "作品自2026年9月28日起接受提交。",
      "출품자 로그인": "参赛者登录", "작품을 출품할 때만 로그인해 주세요.": "准备提交作品时再登录即可。",
      "회원가입만 먼저 해두어도 됩니다. 가입 직후 작품을 출품할 필요는 없습니다.": "可以先注册，无需立即提交作品。",
      "로그인 / 회원가입": "登录 / 注册", "로그인 완료": "已登录", "로그아웃": "退出登录",
      "작품 정보": "作品信息", "원본 영상 URL": "原始视频链接", "신청자 정보 및 동의": "申请人信息及同意事项",
      "필수 입력": "必填", "출품 부문": "参赛类别", "접수 제목": "报名标题", "작품명": "作品名称",
      "제목 한글": "韩文标题", "제목 영문": "英文标题", "사업자등록번호": "营业执照号码",
      "사업자등록증 파일": "营业执照文件", "AI 활용 여부": "是否使用AI", "러닝타임 또는 포스터 규격": "片长或海报规格",
      "AI 활용 설명": "AI使用说明", "시놉시스 한글": "韩文梗概", "시놉시스 영문": "英文梗概",
      "원본 영상 유튜브 URL": "原始视频YouTube链接", "이름": "姓名", "연락처": "联系电话", "이메일": "电子邮箱",
      "선택": "请选择", "활용함": "使用", "활용하지 않음": "未使用", "출품 등록": "提交作品",
      "회원 이메일": "会员邮箱", "비밀번호": "密码", "닫기": "关闭",
      "회원가입만 먼저 해두어도 됩니다. 지금 바로 작품을 출품하지 않아도 됩니다.": "您可以先注册，无需立即提交作品。",
      "출품 규정에 동의합니다.": "我同意参赛规则。",
      "저작권/초상권/음원 사용 책임에 동의합니다.": "我同意承担著作权、肖像权及音乐使用责任。",
      "수상작 및 출품작 홍보 활용에 동의합니다.": "我同意将参赛及获奖作品用于宣传。"
    }
  };

  const buttons = Array.from(document.querySelectorAll("[data-site-language]"));
  const originalText = new WeakMap();
  const originalAttributes = new WeakMap();
  const translatableAttributes = ["placeholder", "title", "aria-label"];

  function selectedLanguage() {
    const value = new URL(location.href).searchParams.get("lang");
    return value === "en" || value === "zh-CN" ? value : "ko";
  }

  function translateText(language) {
    const dictionary = dictionaries[language] || {};
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach((node) => {
      if (node.parentElement?.closest("script, style, [data-no-translate]")) return;
      if (!originalText.has(node)) originalText.set(node, node.nodeValue);
      const source = originalText.get(node);
      const trimmed = source.trim();
      const translated = language === "ko" ? trimmed : dictionary[trimmed];
      if (!trimmed || !translated) {
        node.nodeValue = source;
        return;
      }
      node.nodeValue = source.replace(trimmed, translated);
    });

    document.querySelectorAll("*").forEach((element) => {
      if (!originalAttributes.has(element)) originalAttributes.set(element, {});
      const saved = originalAttributes.get(element);
      translatableAttributes.forEach((attribute) => {
        if (!element.hasAttribute(attribute)) return;
        if (!(attribute in saved)) saved[attribute] = element.getAttribute(attribute);
        const source = saved[attribute];
        element.setAttribute(attribute, language === "ko" ? source : (dictionary[source] || source));
      });
    });
  }

  function applyLanguage(language) {
    translateText(language);
    document.documentElement.lang = language;
    buttons.forEach((button) => {
      const active = button.dataset.siteLanguage === language;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const language = button.dataset.siteLanguage;
      const url = new URL(location.href);
      if (language === "ko") url.searchParams.delete("lang");
      else url.searchParams.set("lang", language);
      history.replaceState({}, "", url);
      applyLanguage(language);
    });
  });

  applyLanguage(selectedLanguage());
})();
