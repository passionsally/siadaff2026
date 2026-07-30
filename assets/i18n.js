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
      "광고 포스터": "Advertising poster", "정적": "Static",
      "광고영상": "Advertising film", "39초 이내": "Up to 39 seconds",
      "숏폼드라마": "Short-form drama", "59초 이내": "Up to 59 seconds",
      "극영화·다큐멘터리·실험영화 (실사)": "Fiction · Documentary · Experimental Film (Live Action)",
      "2D·3D·모션·AI·스톱모션": "2D · 3D · Motion · AI · Stop-motion",
      "3분 이내": "Up to 3 minutes",
      "상세 출품 규정 보기": "View Detailed Guidelines", "개인/단체": "Individual / Organization",
      "개인": "Individual", "청소년부": "Youth", "10~19세": "Ages 10–19", "성인부": "Adult", "20세 이상": "Age 20+",
      "단체": "Organization", "기업": "Company",
      "출품마감 기준일은 대한민국 시간 2026년 10월 20일(화) 자정입니다.": "The age cutoff is midnight on October 20, 2026, Korea Standard Time.",
      "개인출품 나이는 해당 기준일을 기준으로 구분합니다.": "Individual divisions are determined by age on this date.",
      "단체출품은 2026년 3월 28일 이전 개업한 사업자여야 합니다.": "Organization entries must be businesses established before March 28, 2026.",
      "행사 개요": "Festival Overview", "주최·주관·후원": "Organizer · Operator · Sponsors",
      "행사명": "Festival", "출품 대상": "Categories", "출품 주제": "Theme", "공식 언어": "Official Language", "해외 접수": "International Entries",
      "서울국제광고영화제 2026": "Seoul International Advertising Art Film Festival 2026",
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
      "각 150만원 / 총 600만원": "KRW 1.5 Million Each / KRW 6 Million Total",
      "각 100만원 / 총 400만원": "KRW 1 Million Each / KRW 4 Million Total",
      "후원기관특별상 5편": "Sponsor Special Awards · 5 Works", "각 100만원 / 총 500만원": "KRW 1 Million Each / KRW 5 Million Total",
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
      "수상작 및 출품작 홍보 활용에 동의합니다.": "I agree to promotional use of submitted and winning works.",
      "(선택)": "(Optional)", "(주)케이미디어진흥원": "KMedia Innovation Co., Ltd.",
      "(주)케이미디어진흥원 KMedia Innovation": "KMedia Innovation Co., Ltd.",
      "* 필수 입력": "* Required", "01 / 작품 정보": "01 / Work Information",
      "02 / 원본 영상 URL": "02 / Original Video URL", "03 / 개인정보 및 동의": "03 / Personal Information & Consent",
      "14:00 예정": "Scheduled for 2:00 PM", "2026년 10월 20일(화)": "Tuesday, October 20, 2026",
      "2026년 10월 24일~11월 10일": "October 24–November 10, 2026",
      "2026년 11월 12일(목)": "Thursday, November 12, 2026",
      "2026년 11월 21일(토)": "Saturday, November 21, 2026",
      "2026년 6월 1일~8월 30일": "June 1–August 30, 2026",
      "2026년 9월 28일(월)": "Monday, September 28, 2026",
      "39초": "39 sec", "39초 광고영상": "39-sec Ad Film", "3분 단편영화": "3-min Short Film",
      "59초 숏폼드라마": "59-sec Short-form Drama",
      "AI 사용 시 출품 단계에서 활용 여부와 간단한 활용 내역을 기재합니다.": "If AI was used, disclose its use and briefly describe how it was used when submitting.",
      "JPG, PNG, PDF / A2 이상 권장 / 300dpi": "JPG, PNG or PDF / A2 or larger recommended / 300 dpi",
      "MP4 권장 / FHD 이상 / 16:9 또는 9:16": "MP4 recommended / FHD or higher / 16:9 or 9:16",
      "SIADAFF 1회 39초 광고영상 부문 출품작": "SIADAFF 1st Edition · 39-sec Ad Film Entry",
      "SIADAFF 1회 3분 단편영화 부문 출품작": "SIADAFF 1st Edition · 3-min Short Film Entry",
      "SIADAFF 1회 59초 숏폼드라마 부문 출품작": "SIADAFF 1st Edition · 59-sec Short-form Drama Entry",
      "SIADAFF 1회 포스터 부문 출품작": "SIADAFF 1st Edition · Poster Entry",
      "URL 오류, 비공개, 삭제 상태의 작품은 심사 제외될 수 있습니다.": "Entries with an invalid, private or deleted URL may be excluded from judging.",
      "가 생성되었습니다.": "has been created.", "강남 인근": "Gangnam area, Seoul",
      "개인(성인부)": "Individual (Adult)", "개인(청소년부)": "Individual (Youth)",
      "단체(기업)": "Organization (Company)",
      "개인정보 활용 및 마케팅 정보 수신에 동의합니다. 수집 목적은 영화제 참가출품, 운영 안내, 관련 행사 및 프로그램 안내, 홍보·마케팅 정보 제공이며, 이용 범위는 SIADAFF 및 주최·주관사가 운영하거나 연계하는 영화제, 공모전, 교육, 해커톤, 후속 프로그램의 안내·운영·정보제공·홍보·마케팅 연락입니다. 보관 기간은 접수일로부터 1년이며 이후 파기합니다.": "I consent to the use of my personal information and to receiving marketing communications. The information is collected to process festival entries, provide operational notices, announce related events and programs, and provide promotional and marketing information. It may be used by SIADAFF and its organizers or operators to communicate information about festivals, competitions, education, hackathons and follow-up programs they operate or support. The information will be retained for one year from the submission date and then deleted.",
      "개인출품 및 단체출품을 포함하여 본 대회에는 1개 작품만 출품할 수 있음을 확인했습니다.": "I confirm that I may submit only one work to this competition, whether as an individual or an organization.",
      "개인출품은 미기재 · 단체출품 선택 시 필수 입력": "Leave blank for individual entries · Required for organization entries",
      "개인출품은 미기재 · 단체출품 필수 · PDF, JPG, PNG · 최대 10MB": "Not required for individual entries · Required for organizations · PDF, JPG or PNG · Max. 10 MB",
      "개인출품이든 단체출품이든 본 대회에 1개 작품만 출품할 수 있습니다.": "Only one work may be submitted to this competition, whether as an individual or an organization.",
      "공기관": "Public Institution", "공식 홈페이지에서 출품신청서를 작성합니다.": "Complete the submission form on the official website.",
      "국내 참가자는 공식 홈페이지에서 출품권을 결제한 후 접수하며, 해외 참가자는 추후 FilmFreeway 영어 페이지에서 참가비를 결제하고 접수할 예정입니다. 판매 단계별 가격과 신청 링크는 별도 안내합니다.": "Korean entrants purchase an entry pass on the official website before submitting. International entrants will pay and submit through the FilmFreeway English page. Pricing by sales period and application links will be announced separately.",
      "규격, 주제 적합성, 기본 완성도 평가": "Evaluation of specifications, theme relevance and basic execution",
      "기업 혹은 공공기관 최대 5개": "Up to five companies or public institutions",
      "단체란 사업자등록번호가 부여된 소상공인, 중소기업, 중견기업, 대기업의 본사 혹은 지사를 의미합니다.": "An organization means the headquarters or a branch of a registered small business, SME, mid-sized company or large corporation.",
      "대표 : 이시은 Lee Sieun": "Representative: Lee Sieun", "동일 작품의 중복 부문 출품은 불가합니다.": "The same work may not be entered in multiple categories.",
      "러닝타임 또는 포스터 사이즈, 제작 연도, 제작 형태, AI 활용 여부를 확인합니다.": "Runtime or poster dimensions, production year, production format and AI use will be reviewed.",
      "보관 기간은 1년입니다.": "The retention period is one year.",
      "사업자등록은 출품 6개월 전인 2026년 3월 28일 이전에 개업한 회사여야 합니다.": "The business must have opened before March 28, 2026, six months before submissions open.",
      "서울국제광고영화제 SIADAFF 2026 | 공식 출품 안내": "SIADAFF 2026 | Official Submission Guide",
      "세로형·가로형 가능 / 연속극의 1개 에피소드 가능": "Portrait or landscape / One episode of a series is accepted",
      "수상작 및 출품작은 주최 측이 비영리 홍보용으로 상영, 게시, 편집 활용할 수 있습니다.": "The organizer may screen, publish and edit submitted or winning works for non-commercial promotional purposes.",
      "수상작은 심사 종료 후에도 삭제할 수 없습니다.": "Winning entries may not be deleted after judging.",
      "수집 목적은 영화제 참가출품, 운영 안내, 관련 행사 및 프로그램 안내, 홍보·마케팅 정보 제공입니다.": "Information is collected to process festival entries, provide operational notices, announce related events and programs, and provide promotional and marketing information.",
      "수집 항목은 회원 이메일, 이름, 연락처, 원본 영상 URL, 개인정보 활용 동의 여부입니다.": "Collected data includes member email, name, phone number, original video URL and consent status.",
      "시놉시스 또는 카피는 700자 내외를 권장하되, 최대 1,200자 이내로 작성합니다.": "A synopsis or copy of about 700 characters is recommended, with a maximum of 1,200 characters.",
      "실사 촬영, 애니메이션, 모션그래픽, 혼합형 모두 허용됩니다.": "Live action, animation, motion graphics and hybrid formats are all accepted.",
      "심사 종료일까지 삭제 또는 비공개 전환을 금지합니다.": "Do not delete the video or change it to private before judging ends.",
      "심사위원단 토의 및 점수 합산": "Jury deliberation and combined scores",
      "영상 파일 용량은 1GB 이내를 권장합니다.": "A video file size of 1 GB or less is recommended.",
      "영상, 이미지, 폰트, 음원, 효과음은 직접 제작 또는 정당한 라이선스를 확보해야 합니다.": "Videos, images, fonts, music and sound effects must be original or properly licensed.",
      "영상은 MP4, H.264 코덱을 권장합니다.": "MP4 with the H.264 codec is recommended.",
      "외국인 참가자는 추후 FilmFreeway 영어 페이지에서 소정의 참가비를 결제하고 접수 가능할 예정이며, FilmFreeway 신청 링크는 생성 후 공지합니다.": "International entrants will be able to pay the entry fee and submit through the FilmFreeway English page. The FilmFreeway link will be announced when available.",
      "외국인 참가자는 추후 FilmFreeway 영어 페이지에서 소정의 참가비를 결제하고 접수 가능할 예정이며, 신청 링크는 생성 후 별도 공개합니다.": "International entrants will be able to pay the entry fee and submit through the FilmFreeway English page. The application link will be published separately when available.",
      "원본 영상은 유튜브에 일부 공개로 올린 뒤 URL을 제출하세요. 비공개 영상과 SNS 하이라이트 URL은 받지 않습니다.": "Upload the original video to YouTube as Unlisted and submit its URL. Private videos and social-media highlight URLs are not accepted.",
      "원본 영상을 유튜브 ‘일부 공개’로 설정한 URL만 제출하세요. ‘비공개’ 영상은 심사할 수 없습니다.": "Submit only a YouTube URL set to Unlisted. Private videos cannot be judged.",
      "원본 영상을 유튜브에 ‘일부 공개’로 업로드하고 URL을 제출합니다.": "Upload the original video to YouTube as Unlisted and submit the URL.",
      "음향은 2채널 스테레오, 클리핑과 과도한 노이즈가 없는 수준을 권장합니다.": "Two-channel stereo audio without clipping or excessive noise is recommended.",
      "이미지 생성 AI, 영상 생성·편집 AI, 음성 합성, 대사 생성, 색보정 등 AI 활용이 가능합니다.": "Image-generation AI, video generation or editing AI, voice synthesis, dialogue generation, color grading and other AI uses are permitted.",
      "이용 범위는 SIADAFF 및 주최·주관사가 운영하거나 연계하는 영화제, 공모전, 교육, 해커톤, 후속 프로그램의 안내·운영·정보제공·홍보·마케팅 연락입니다.": "The information may be used by SIADAFF and its organizers or operators for notices, operation, information, promotion and marketing related to festivals, competitions, education, hackathons and follow-up programs they operate or support.",
      "작품명은 국문과 영문 모두 기록을 권장합니다.": "Providing both Korean and English titles is recommended.",
      "저작권, 초상권, 개인정보 수집 및 이용에 동의합니다.": "You must agree to copyright, likeness-right and personal-information collection terms.",
      "저작권, 초상권, 상표권 침해와 타인의 얼굴·음성을 무단 사용한 딥페이크는 금지됩니다.": "Copyright, likeness-right and trademark infringement, and deepfakes using another person's face or voice without permission, are prohibited.",
      "접수번호": "Submission Number", "접수완료": "Submission Complete",
      "접수일로부터 1년 뒤 파기합니다.": "The information will be deleted one year after submission.",
      "출품 분야에 맞는 접수 제목을 선택하세요.": "Select the submission title that matches your category.",
      "출품 카테고리와 연령부문을 선택하고 작품 정보를 입력합니다.": "Select the entry category and entrant division, then enter the work information.",
      "트로피와 상금, 상품은 수도권 거주자는 2주일 내 직접 수령을 원칙으로 하며, 지방 거주자는 택배 발송으로 안내합니다.": "Recipients in the Seoul metropolitan area should collect trophies, prize money and gifts in person within two weeks; delivery will be arranged for recipients outside the area.",
      "포스터": "Poster", "포스터 용량은 30MB 이내를 권장합니다.": "A poster file size of 30 MB or less is recommended.",
      "포스터는 JPG, PNG, PDF 형식과 300dpi 이상, RGB 컬러 모드를 권장합니다.": "JPG, PNG or PDF at 300 dpi or higher in RGB color mode is recommended.",
      "포스터는 디자인 완성도와 가독성, CF, 숏폼드라마, 단편영화는 서사·연기·연출을 함께 봅니다. 특별상은 후원기업 및 부문 특성에 맞춰 별도 검토합니다.": "Posters are judged on design quality and readability; commercials, short-form dramas and short films are judged on narrative, performance and direction. Special Awards are reviewed separately according to sponsor and category characteristics.",
      "프레임 레이트는 24, 25, 30fps 중 작품 전체에서 일관 유지합니다.": "Use a consistent frame rate of 24, 25 or 30 fps throughout the work.",
      "해상도는 최소 1920x1080, 최대 4K를 권장합니다.": "A resolution from 1920×1080 up to 4K is recommended.",
      "후원금 납부와 기업별 콘셉트·테마 접수 후 공식 랜딩페이지에 공지": "Announced on the official landing page after sponsorship payment and approval of each sponsor's concept and theme",
      "후원기업": "Sponsor", "후원기업 로고와 제품 실물은 허용된 범위와 브랜드 가이드라인 안에서 사용합니다.": "Sponsor logos and physical products must be used within the permitted scope and brand guidelines.",
      "후원기업 및 후원공기관의 브랜드, 제품, 서비스를 주제로 한 창의적인 광고 및 영화": "Creative advertising and films featuring the brands, products or services of sponsoring companies and public institutions",
      "후원기업 선정 및 브랜드 테마 확정": "Sponsor selection and brand-theme confirmation",
      "59초 Short-form": "59-sec Short-form", "AI 활용 내역이 있다면 간단히 작성하세요": "Briefly describe how AI was used, if applicable",
      "SIADAFF 메인 비주얼": "SIADAFF main visual", "개인 및 단체 출품 구분": "Individual and organization entry divisions",
      "국문 700자 내외 권장 / 최대 1,200자": "About 700 Korean characters recommended / Max. 1,200",
      "심사 기준 100점 만점": "Judging criteria out of 100 points", "예: 39초 / A2 300dpi": "e.g. 39 sec / A2 300 dpi",
      "작품명을 입력하세요": "Enter the work name", "작품의 한글 제목을 입력하세요": "Enter the Korean title",
      "파트너사 로고 자리": "Partner logo area", "후원기업과 후원공기관 로고 자리": "Sponsor and supporting-institution logo area",
      "A4K 공공강사": "A4K Public Instructors", "AI 창작자를 표현한 SIADAFF 메인 비주얼": "SIADAFF main visual featuring an AI creator",
      "SIADAFF 트로피와 AI 창작 심사 메시지": "SIADAFF trophy and AI-creation judging message",
      "미디어창업넷 HRD": "Media Startup Net HRD", "미디어창업넷 평생교육원": "Media Startup Net Lifelong Education Center",
      "미디어창업뉴스": "Media Startup News", "서울국제광고영화제 SIADAFF": "Seoul International Advertising Art Film Festival · SIADAFF",
      "원비즈연구소 ONEBIZ Lab.": "ONEBIZ Lab.", "제노북스 ZENO BOOKS": "ZENO BOOKS", "제노스쿨 ZENO SCHOOL": "ZENO SCHOOL",
      "포스터, 39초 이내 광고, 59초 이내 숏폼드라마, 3분 이내 단편영화, 3분 이내 단편애니메이션": "Poster, Ad Film up to 39 sec, Short-form Drama up to 59 sec, Short Film up to 3 min, Short Animation up to 3 min",
      "포스터는 디자인 완성도와 가독성, CF·숏폼드라마·단편영화는 서사·연기·연출, 단편애니메이션은 스토리·연출·움직임의 완성도를 함께 봅니다. 특별상은 후원기업 및 부문 특성에 맞춰 별도 검토합니다.": "Posters are judged on design quality and readability; commercials, short-form dramas, and short films on narrative, performance, and direction; and short animation on story, direction, and quality of movement. Special Awards are reviewed separately according to sponsor and category characteristics.",
      "최우수상 4편 (5개 출품부문 통합 선발)": "Excellence Awards · 4 Works (selected across all five categories)",
      "우수상 4편 (5개 출품부문 통합 선발)": "Merit Awards · 4 Works (selected across all five categories)",
      "장려상 8편 (5개 출품부문 통합 선발)": "Encouragement Awards · 8 Works (selected across all five categories)",
      "3분 단편애니메이션": "3-min Short Animation",
      "SIADAFF 1회 3분 단편애니메이션 부문 출품작": "SIADAFF 1st Edition · 3-min Short Animation Entry"
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
      "광고 포스터": "广告海报", "정적": "静态",
      "광고영상": "广告片", "39초 이내": "39秒以内",
      "숏폼드라마": "短剧", "59초 이내": "59秒以内",
      "극영화·다큐멘터리·실험영화 (실사)": "剧情片·纪录片·实验电影（真人实拍）",
      "2D·3D·모션·AI·스톱모션": "2D·3D·动态影像·AI·定格动画",
      "3분 이내": "3分钟以内",
      "상세 출품 규정 보기": "查看详细规则", "개인/단체": "个人 / 团体",
      "개인": "个人", "청소년부": "青少年组", "10~19세": "10–19岁", "성인부": "成人组", "20세 이상": "20岁以上",
      "단체": "团体", "기업": "企业",
      "출품마감 기준일은 대한민국 시간 2026년 10월 20일(화) 자정입니다.": "年龄计算截止时间为韩国时间2026年10月20日（星期二）午夜。",
      "개인출품 나이는 해당 기준일을 기준으로 구분합니다.": "个人组别按该截止日期的年龄划分。",
      "단체출품은 2026년 3월 28일 이전 개업한 사업자여야 합니다.": "团体参赛者须为2026年3月28日前开业的企业。",
      "행사 개요": "电影节概况", "주최·주관·후원": "主办·承办·赞助",
      "행사명": "活动名称", "출품 대상": "参赛类别", "출품 주제": "参赛主题", "공식 언어": "官方语言", "해외 접수": "海外报名",
      "서울국제광고영화제 2026": "2026首尔国际广告电影节",
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
      "각 150만원 / 총 600만원": "每部150万韩元 / 共600万韩元",
      "각 100만원 / 총 400만원": "每部100万韩元 / 共400万韩元",
      "후원기관특별상 5편": "赞助机构特别奖 5部", "각 100만원 / 총 500만원": "每部100万韩元 / 共500万韩元",
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
      "수상작 및 출품작 홍보 활용에 동의합니다.": "我同意将参赛及获奖作品用于宣传。",
      "(선택)": "（选填）", "(주)케이미디어진흥원": "KMedia Innovation 株式会社",
      "(주)케이미디어진흥원 KMedia Innovation": "KMedia Innovation 株式会社", "* 필수 입력": "* 必填",
      "01 / 작품 정보": "01 / 作品信息", "02 / 원본 영상 URL": "02 / 原始视频链接",
      "03 / 개인정보 및 동의": "03 / 个人信息与同意事项", "14:00 예정": "预计14:00",
      "2026년 10월 20일(화)": "2026年10月20日（星期二）", "2026년 10월 24일~11월 10일": "2026年10月24日–11月10日",
      "2026년 11월 12일(목)": "2026年11月12日（星期四）", "2026년 11월 21일(토)": "2026年11月21日（星期六）",
      "2026년 6월 1일~8월 30일": "2026年6月1日–8月30日", "2026년 9월 28일(월)": "2026年9月28日（星期一）",
      "39초": "39秒", "39초 광고영상": "39秒广告片", "3분 단편영화": "3分钟短片",
      "59초 Short-form": "59秒短剧", "59초 숏폼드라마": "59秒短剧", "A4K 공공강사": "A4K公共讲师",
      "AI 사용 시 출품 단계에서 활용 여부와 간단한 활용 내역을 기재합니다.": "如使用AI，请在提交时注明并简要说明使用方式。",
      "AI 창작자를 표현한 SIADAFF 메인 비주얼": "展现AI创作者的SIADAFF主视觉",
      "AI 활용 내역이 있다면 간단히 작성하세요": "如使用AI，请简要说明使用情况",
      "JPG, PNG, PDF / A2 이상 권장 / 300dpi": "JPG、PNG、PDF / 建议A2以上 / 300 dpi",
      "MP4 권장 / FHD 이상 / 16:9 또는 9:16": "建议MP4 / FHD以上 / 16:9或9:16",
      "SIADAFF 1회 39초 광고영상 부문 출품작": "SIADAFF首届·39秒广告片参赛作品",
      "SIADAFF 1회 3분 단편영화 부문 출품작": "SIADAFF首届·3分钟短片参赛作品",
      "SIADAFF 1회 59초 숏폼드라마 부문 출품작": "SIADAFF首届·59秒短剧参赛作品",
      "SIADAFF 1회 포스터 부문 출품작": "SIADAFF首届·海报组参赛作品",
      "SIADAFF 메인 비주얼": "SIADAFF主视觉", "SIADAFF 트로피와 AI 창작 심사 메시지": "SIADAFF奖杯与AI创作评审信息",
      "URL 오류, 비공개, 삭제 상태의 작품은 심사 제외될 수 있습니다.": "链接错误、设为私密或已删除的作品可能被排除在评审之外。",
      "가 생성되었습니다.": "已生成。", "강남 인근": "首尔江南附近",
      "개인 및 단체 출품 구분": "个人及团体参赛分类", "개인(성인부)": "个人（成人组）",
      "개인(청소년부)": "个人（青少年组）", "단체(기업)": "团体（企业）",
      "개인정보 활용 및 마케팅 정보 수신에 동의합니다. 수집 목적은 영화제 참가출품, 운영 안내, 관련 행사 및 프로그램 안내, 홍보·마케팅 정보 제공이며, 이용 범위는 SIADAFF 및 주최·주관사가 운영하거나 연계하는 영화제, 공모전, 교육, 해커톤, 후속 프로그램의 안내·운영·정보제공·홍보·마케팅 연락입니다. 보관 기간은 접수일로부터 1년이며 이후 파기합니다.": "我同意使用个人信息并接收营销信息。收集目的包括处理电影节参赛、提供运营通知、相关活动及项目信息，以及宣传和营销信息。使用范围包括SIADAFF及主办、承办方运营或合作的电影节、竞赛、教育、黑客松和后续项目的通知、运营、信息提供及宣传营销联系。信息自提交之日起保存一年，之后销毁。",
      "개인출품 및 단체출품을 포함하여 본 대회에는 1개 작품만 출품할 수 있음을 확인했습니다.": "我确认无论个人或团体参赛，本届比赛仅可提交一部作品。",
      "개인출품은 미기재 · 단체출품 선택 시 필수 입력": "个人参赛无需填写 · 选择团体参赛时必填",
      "개인출품은 미기재 · 단체출품 필수 · PDF, JPG, PNG · 최대 10MB": "个人参赛无需提交 · 团体参赛必填 · PDF、JPG、PNG · 最大10MB",
      "개인출품이든 단체출품이든 본 대회에 1개 작품만 출품할 수 있습니다.": "无论个人或团体参赛，本届比赛仅可提交一部作品。",
      "공기관": "公共机构", "공식 홈페이지에서 출품신청서를 작성합니다.": "请在官方网站填写参赛申请表。",
      "국내 참가자는 공식 홈페이지에서 출품권을 결제한 후 접수하며, 해외 참가자는 추후 FilmFreeway 영어 페이지에서 참가비를 결제하고 접수할 예정입니다. 판매 단계별 가격과 신청 링크는 별도 안내합니다.": "韩国参赛者在官方网站购买参赛资格后提交；海外参赛者将在FilmFreeway英文页面支付报名费并提交。各销售阶段价格及申请链接将另行通知。",
      "국문 700자 내외 권장 / 최대 1,200자": "建议约700个韩文字符 / 最多1,200个",
      "규격, 주제 적합성, 기본 완성도 평가": "评估技术规格、主题契合度及基本完成度",
      "기업 혹은 공공기관 최대 5개": "最多5家企业或公共机构",
      "단체란 사업자등록번호가 부여된 소상공인, 중소기업, 중견기업, 대기업의 본사 혹은 지사를 의미합니다.": "团体是指拥有营业执照号码的小微企业、中小企业、中坚企业或大型企业的总部或分支机构。",
      "대표 : 이시은 Lee Sieun": "代表：Lee Sieun", "동일 작품의 중복 부문 출품은 불가합니다.": "同一作品不得重复参加多个类别。",
      "러닝타임 또는 포스터 사이즈, 제작 연도, 제작 형태, AI 활용 여부를 확인합니다.": "将核查片长或海报尺寸、制作年份、制作形式及AI使用情况。",
      "미디어창업넷 HRD": "Media Startup Net HRD", "미디어창업넷 평생교육원": "Media Startup Net终身教育院",
      "미디어창업뉴스": "Media Startup News", "보관 기간은 1년입니다.": "保存期限为一年。",
      "사업자등록은 출품 6개월 전인 2026년 3월 28일 이전에 개업한 회사여야 합니다.": "企业须在开放投稿前六个月，即2026年3月28日前开业。",
      "서울국제광고영화제 SIADAFF": "首尔国际广告电影节 SIADAFF",
      "서울국제광고영화제 SIADAFF 2026 | 공식 출품 안내": "SIADAFF 2026｜官方参赛指南",
      "세로형·가로형 가능 / 연속극의 1개 에피소드 가능": "支持竖屏或横屏 / 系列剧可提交一集",
      "수상작 및 출품작은 주최 측이 비영리 홍보용으로 상영, 게시, 편집 활용할 수 있습니다.": "主办方可为非营利宣传目的放映、发布及编辑参赛作品和获奖作品。",
      "수상작은 심사 종료 후에도 삭제할 수 없습니다.": "获奖作品在评审结束后也不得删除。",
      "수집 목적은 영화제 참가출품, 운영 안내, 관련 행사 및 프로그램 안내, 홍보·마케팅 정보 제공입니다.": "收集目的为处理电影节参赛、提供运营通知、相关活动和项目信息以及宣传营销信息。",
      "수집 항목은 회원 이메일, 이름, 연락처, 원본 영상 URL, 개인정보 활용 동의 여부입니다.": "收集项目包括会员邮箱、姓名、联系电话、原始视频链接及个人信息使用同意状态。",
      "시놉시스 또는 카피는 700자 내외를 권장하되, 최대 1,200자 이내로 작성합니다.": "剧情简介或文案建议约700字，最多不超过1,200字。",
      "실사 촬영, 애니메이션, 모션그래픽, 혼합형 모두 허용됩니다.": "实拍、动画、动态图形及混合形式均可。",
      "심사 기준 100점 만점": "评审标准满分100分", "심사 종료일까지 삭제 또는 비공개 전환을 금지합니다.": "评审结束前不得删除或改为私密。",
      "심사위원단 토의 및 점수 합산": "评审团讨论及分数汇总", "영상 파일 용량은 1GB 이내를 권장합니다.": "建议视频文件不超过1GB。",
      "영상, 이미지, 폰트, 음원, 효과음은 직접 제작 또는 정당한 라이선스를 확보해야 합니다.": "视频、图像、字体、音乐及音效须为原创或已取得合法授权。",
      "영상은 MP4, H.264 코덱을 권장합니다.": "建议使用MP4格式和H.264编码。",
      "예: 39초 / A2 300dpi": "例如：39秒 / A2 300 dpi",
      "외국인 참가자는 추후 FilmFreeway 영어 페이지에서 소정의 참가비를 결제하고 접수 가능할 예정이며, FilmFreeway 신청 링크는 생성 후 공지합니다.": "海外参赛者之后可在FilmFreeway英文页面支付报名费并提交。FilmFreeway申请链接生成后公布。",
      "외국인 참가자는 추후 FilmFreeway 영어 페이지에서 소정의 참가비를 결제하고 접수 가능할 예정이며, 신청 링크는 생성 후 별도 공개합니다.": "海外参赛者之后可在FilmFreeway英文页面支付报名费并提交。申请链接生成后另行公布。",
      "원본 영상은 유튜브에 일부 공개로 올린 뒤 URL을 제출하세요. 비공개 영상과 SNS 하이라이트 URL은 받지 않습니다.": "请将原始视频以YouTube“不公开列出”方式上传后提交链接。不接受私密视频及社交媒体精彩片段链接。",
      "원본 영상을 유튜브 ‘일부 공개’로 설정한 URL만 제출하세요. ‘비공개’ 영상은 심사할 수 없습니다.": "仅提交设为YouTube“不公开列出”的链接。“私密”视频无法评审。",
      "원본 영상을 유튜브에 ‘일부 공개’로 업로드하고 URL을 제출합니다.": "将原始视频以YouTube“不公开列出”方式上传并提交链接。",
      "원비즈연구소 ONEBIZ Lab.": "ONEBIZ Lab.", "음향은 2채널 스테레오, 클리핑과 과도한 노이즈가 없는 수준을 권장합니다.": "建议使用双声道立体声，避免削波和过度噪音。",
      "이미지 생성 AI, 영상 생성·편집 AI, 음성 합성, 대사 생성, 색보정 등 AI 활용이 가능합니다.": "允许使用图像生成AI、视频生成或编辑AI、语音合成、对白生成、调色等AI技术。",
      "이용 범위는 SIADAFF 및 주최·주관사가 운영하거나 연계하는 영화제, 공모전, 교육, 해커톤, 후속 프로그램의 안내·운영·정보제공·홍보·마케팅 연락입니다.": "使用范围包括SIADAFF及主办、承办方运营或合作的电影节、竞赛、教育、黑客松和后续项目的通知、运营、信息提供及宣传营销联系。",
      "작품명은 국문과 영문 모두 기록을 권장합니다.": "建议同时填写韩文和英文作品名称。",
      "작품명을 입력하세요": "请输入作品名称", "작품의 한글 제목을 입력하세요": "请输入作品的韩文标题",
      "저작권, 초상권, 개인정보 수집 및 이용에 동의합니다.": "须同意著作权、肖像权及个人信息收集和使用条款。",
      "저작권, 초상권, 상표권 침해와 타인의 얼굴·음성을 무단 사용한 딥페이크는 금지됩니다.": "禁止侵犯著作权、肖像权、商标权，以及未经许可使用他人面部或声音的深度伪造。",
      "접수번호": "报名编号", "접수완료": "提交完成", "접수일로부터 1년 뒤 파기합니다.": "自提交之日起一年后销毁。",
      "제노북스 ZENO BOOKS": "ZENO BOOKS", "제노스쿨 ZENO SCHOOL": "ZENO SCHOOL",
      "출품 분야에 맞는 접수 제목을 선택하세요.": "请选择与参赛类别相符的报名标题。",
      "출품 카테고리와 연령부문을 선택하고 작품 정보를 입력합니다.": "请选择参赛类别和参赛组别，并填写作品信息。",
      "트로피와 상금, 상품은 수도권 거주자는 2주일 내 직접 수령을 원칙으로 하며, 지방 거주자는 택배 발송으로 안내합니다.": "首都圈获奖者原则上须在两周内亲自领取奖杯、奖金及奖品；其他地区获奖者将安排快递寄送。",
      "파트너사 로고 자리": "合作伙伴标志区域", "포스터": "海报", "포스터 용량은 30MB 이내를 권장합니다.": "建议海报文件不超过30MB。",
      "포스터는 JPG, PNG, PDF 형식과 300dpi 이상, RGB 컬러 모드를 권장합니다.": "建议海报采用JPG、PNG或PDF格式，300 dpi以上，RGB色彩模式。",
      "포스터는 디자인 완성도와 가독성, CF, 숏폼드라마, 단편영화는 서사·연기·연출을 함께 봅니다. 특별상은 후원기업 및 부문 특성에 맞춰 별도 검토합니다.": "海报侧重设计完成度和可读性；广告、短剧和短片综合考察叙事、表演及导演。特别奖将根据赞助方和类别特点另行评审。",
      "프레임 레이트는 24, 25, 30fps 중 작품 전체에서 일관 유지합니다.": "全片帧率须统一为24、25或30 fps。",
      "해상도는 최소 1920x1080, 최대 4K를 권장합니다.": "建议分辨率为最低1920×1080、最高4K。",
      "후원금 납부와 기업별 콘셉트·테마 접수 후 공식 랜딩페이지에 공지": "赞助款支付并确认各企业概念与主题后，在官方落地页公布",
      "후원기업": "赞助企业", "후원기업 로고와 제품 실물은 허용된 범위와 브랜드 가이드라인 안에서 사용합니다.": "赞助企业标志及实物产品须在许可范围和品牌指南内使用。",
      "후원기업 및 후원공기관의 브랜드, 제품, 서비스를 주제로 한 창의적인 광고 및 영화": "以赞助企业和支持公共机构的品牌、产品及服务为主题的创意广告与电影",
      "후원기업 선정 및 브랜드 테마 확정": "确定赞助企业及品牌主题",
      "후원기업과 후원공기관 로고 자리": "赞助企业及支持公共机构标志区域",
      "포스터, 39초 이내 광고, 59초 이내 숏폼드라마, 3분 이내 단편영화, 3분 이내 단편애니메이션": "海报、39秒以内广告、59秒以内短剧、3分钟以内短片、3分钟以内短篇动画",
      "포스터는 디자인 완성도와 가독성, CF·숏폼드라마·단편영화는 서사·연기·연출, 단편애니메이션은 스토리·연출·움직임의 완성도를 함께 봅니다. 특별상은 후원기업 및 부문 특성에 맞춰 별도 검토합니다.": "海报侧重设计完成度和可读性；广告、短剧和短片综合考察叙事、表演及导演；短篇动画综合考察故事、导演及动作完成度。特别奖将根据赞助方和类别特点另行评审。",
      "최우수상 4편 (5개 출품부문 통합 선발)": "最优秀奖4部（从5个参赛类别中综合选拔）",
      "우수상 4편 (5개 출품부문 통합 선발)": "优秀奖4部（从5个参赛类别中综合选拔）",
      "장려상 8편 (5개 출품부문 통합 선발)": "鼓励奖8部（从5个参赛类别中综合选拔）",
      "3분 단편애니메이션": "3分钟短篇动画",
      "SIADAFF 1회 3분 단편애니메이션 부문 출품작": "SIADAFF首届·3分钟短篇动画参赛作品"
    }
  };

  const buttons = Array.from(document.querySelectorAll("[data-site-language]"));
  const originalText = new WeakMap();
  const originalAttributes = new WeakMap();
  const translatableAttributes = ["placeholder", "title", "aria-label", "alt"];
  const pageTitles = {
    ko: "서울국제광고영화제 SIADAFF 2026 | 공식 출품 안내",
    en: "SIADAFF 2026 | Official Submission Guide",
    "zh-CN": "SIADAFF 2026｜官方参赛指南"
  };
  let observer;

  function selectedLanguage() {
    const value = new URL(location.href).searchParams.get("lang");
    return value === "en" || value === "zh-CN" ? value : "ko";
  }

  function translateText(language) {
    observer?.disconnect();
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
    observer?.observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  function applyLanguage(language) {
    translateText(language);
    document.documentElement.lang = language;
    document.title = pageTitles[language];
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

  observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "characterData") originalText.delete(mutation.target);
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) originalText.delete(node);
        node.querySelectorAll?.("*").forEach((element) => {
          element.childNodes.forEach((child) => {
            if (child.nodeType === Node.TEXT_NODE) originalText.delete(child);
          });
        });
      });
    });
    translateText(selectedLanguage());
  });

  applyLanguage(selectedLanguage());
})();
