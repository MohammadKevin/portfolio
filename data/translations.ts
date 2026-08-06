// ─── Translation strings for Indonesian & English ───────────────────────────

export type Lang = "id" | "en";

export const translations = {
  // ── Navbar ──────────────────────────────────────────────────────────────
  nav: {
    home:      { id: "Beranda",  en: "Home"     },
    about:     { id: "Tentang",  en: "About"    },
    skills:    { id: "Keahlian", en: "Skills"   },
    projects:  { id: "Proyek",   en: "Projects" },
    github:    { id: "GitHub",   en: "GitHub"   },
    certs:     { id: "Sertif.",  en: "Certs"    },
    timeline:  { id: "Timeline", en: "Timeline" },
    contact:   { id: "Kontak",   en: "Contact"  },
    hireMe:    { id: "Rekrut Saya", en: "Hire Me" },
    themeLabel:{ id: "Warna Tema",  en: "Color Theme"},
  },

  // ── Hero ────────────────────────────────────────────────────────────────
  hero: {
    badge:       { id: "Backend & Fullstack Developer", en: "Backend & Fullstack Developer" },
    greeting:    { id: "Halo, saya",   en: "Hi, I'm" },
    typewriterWords: {
      id: ["REST API yang scalable.", "sistem kasir (POS).", "arsip digital.", "solusi backend modern."],
      en: ["scalable REST APIs.", "POS cashier systems.", "digital archives.", "modern backend solutions."],
    },
    typewriterPrefix: { id: "Saya membangun", en: "I build" },
    subtext: {
      id: "Siswa {school} dengan 2+ tahun pengalaman nyata. Stack: {stack}.",
      en: "Student at {school} with 2+ years of real-world experience. Stack: {stack}.",
    },
    school:    { id: "SMK Telkom Malang",        en: "SMK Telkom Malang" },
    available: { id: "Siap untuk kolaborasi",    en: "Available for collaboration" },
    contactBtn:{ id: "Hubungi Saya",             en: "Contact Me" },
    cvBtn:     { id: "Download CV",              en: "Download CV" },
    stats: {
      years:    { id: "Tahun Berpengalaman",     en: "Years of Experience" },
      projects: { id: "Proyek Selesai",          en: "Projects Done" },
      stacks:   { id: "Tech Stack",              en: "Tech Stack" },
      certs:    { id: "Sertifikasi",             en: "Certifications" },
    },
    locMalang: { id: "Malang, Indonesia",        en: "Malang, Indonesia" },
    school2:   { id: "SMK Telkom Malang",        en: "SMK Telkom Malang" },
    exp:       { id: "2+ Tahun Pengalaman",      en: "2+ Years Experience" },
  },

  // ── About ───────────────────────────────────────────────────────────────
  about: {
    label:   { id: "Tentang Saya",   en: "About Me" },
    heading: { id: "Siapa",          en: "Who is" },
    headingAccent: { id: "Kevin",    en: "Kevin" },
    bio1: {
      id: "Halo! Nama saya {name} — seorang developer yang masih duduk di bangku {school}, tapi sudah terjun langsung ke dunia pengembangan software nyata selama 2 tahun lebih.",
      en: "Hey! I'm {name} — a developer still studying at {school}, but I've been building real-world software for over 2 years.",
    },
    bio2: {
      id: "Saya percaya bahwa kode yang baik adalah kode yang menyelesaikan masalah nyata — bukan sekadar terlihat keren. Karena itu saya fokus pada arsitektur API yang benar-benar scalable, query database yang efisien, dan antarmuka yang intuitif.",
      en: "I believe great code is code that solves real problems — not just looks cool. That's why I focus on truly scalable API architecture, efficient database queries, and intuitive interfaces.",
    },
    bio3: {
      id: "Dari membangun sistem kasir untuk UMKM, arsip digital, hingga backend API enterprise — saya menikmati setiap tantangan yang membuat saya menjadi developer yang lebih baik.",
      en: "From building cashier systems for small businesses, digital archives, to enterprise backend APIs — I enjoy every challenge that makes me a better developer.",
    },
    quote: {
      id: "\"Saya bukan hanya menulis kode — saya membangun solusi yang benar-benar dipakai orang.\"",
      en: "\"I don't just write code — I build solutions people actually use.\"",
    },
    codeComment:  { id: "// my-stack.ts", en: "// my-stack.ts" },
    codeLoves:    { id: "\"clean API design & SQL optimization\"", en: "\"clean API design & SQL optimization\"" },
    codeGoal:     { id: "\"build things that actually matter\"",   en: "\"build things that actually matter\"" },
    codeStatus:   { id: "\"open for collaboration\"",             en: "\"open for collaboration\"" },
    quickInfoLabel: { id: "Quick Info",          en: "Quick Info" },
    location:       { id: "Lokasi",              en: "Location" },
    locationVal:    { id: "Malang, Jawa Timur",  en: "Malang, East Java" },
    education:      { id: "Pendidikan",          en: "Education" },
    educationVal:   { id: "SMK Telkom Malang (RPL)", en: "SMK Telkom Malang (Software Engineering)" },
    primaryStack:   { id: "Primary Stack",       en: "Primary Stack" },
    database:       { id: "Database",            en: "Database" },
    extra:          { id: "Extra",               en: "Extra" },
    extraVal:       { id: "Node.js (Backend)", en: "Node.js (Backend)" },
    openFreelance:  { id: "Buka untuk freelance",  en: "Open for freelance" },
    stackLabel:     { id: "Stack yang saya kuasai", en: "My Tech Stack" },
  },

  // ── Skills ──────────────────────────────────────────────────────────────
  skills: {
    label:        { id: "Tech Stack",   en: "Tech Stack" },
    heading:      { id: "Skill &",      en: "Skills &" },
    headingAccent:{ id: "Pencapaian",   en: "Achievements" },
    subtext: {
      id: "Bukan sekadar daftar teknologi — ini adalah pencapaian nyata yang bisa dibuktikan.",
      en: "Not just a list of technologies — these are real, provable achievements.",
    },
    achievementsHeader: { id: "Pencapaian Nyata", en: "Real Achievements" },
  },

  // ── Projects ────────────────────────────────────────────────────────────
  projects: {
    label:        { id: "Portfolio",  en: "Portfolio" },
    heading:      { id: "Proyek yang", en: "Things I've" },
    headingAccent:{ id: "Pernah Saya Bangun", en: "Built" },
    subtext:      { id: "Setiap proyek punya cerita di baliknya.", en: "Every project has a story behind it." },
    filterAll:    { id: "Semua",  en: "All" },
    searchPlaceholder: { id: "Cari proyek, stack...", en: "Search projects, stack..." },
    labelProblem: { id: "Problem", en: "Problem" },
    labelImpact:  { id: "Impact",  en: "Impact"  },
    demo:         { id: "Demo",    en: "Demo"    },
    repo:         { id: "Repo",    en: "Repo"    },
    empty:        { id: "Tidak ada proyek yang cocok.", en: "No matching projects found." },
  },

  // ── GitHub ──────────────────────────────────────────────────────────────
  github: {
    label:         { id: "Open Source",        en: "Open Source" },
    heading:       { id: "GitHub",             en: "GitHub" },
    headingAccent: { id: "Activity",           en: "Activity" },
    publicRepos:   { id: "Repositori Publik",  en: "Public Repos" },
    focus:         { id: "Fullstack & Backend", en: "Fullstack & Backend" },
    focusLabel:    { id: "Fokus Utama",        en: "Main Focus" },
    statusActive:  { id: "Active",             en: "Active" },
    statusLabel:   { id: "Status Kontribusi",  en: "Contribution Status" },
    graphTitle:    { id: "Contribution Graph", en: "Contribution Graph" },
    recentRepos:   { id: "Repositori Terbaru", en: "Recent Repositories" },
    defaultDesc:   { id: "Proyek backend/fullstack oleh Mohammad Kevin.", en: "A backend/fullstack project by Mohammad Kevin." },
    view:          { id: "Lihat", en: "View" },
  },

  // ── Certificates ────────────────────────────────────────────────────────
  certs: {
    label:   { id: "Credentials",            en: "Credentials" },
    heading: { id: "Sertifikasi &",          en: "Certifications &" },
    headingAccent: { id: "Kredensial",       en: "Credentials" },
    verify:  { id: "Verifikasi",             en: "Verify" },
  },

  // ── Timeline ────────────────────────────────────────────────────────────
  timeline: {
    label:         { id: "Journey",             en: "Journey" },
    heading:       { id: "Perjalanan",          en: "My" },
    headingAccent: { id: "Saya",                en: "Journey" },
    subtext: {
      id: "Setiap langkah membentuk developer yang saya jadi sekarang.",
      en: "Every step shaped the developer I am today.",
    },
  },

  // ── Contact ─────────────────────────────────────────────────────────────
  contact: {
    label:         { id: "Get In Touch",    en: "Get In Touch" },
    heading:       { id: "Yuk,",           en: "Let's" },
    headingAccent: { id: "ngobrol dulu.",  en: "talk." },
    subtext: {
      id: "Punya proyek yang butuh developer? Atau sekadar ingin berkenalan? Saya selalu terbuka untuk percakapan yang bermakna. 👋",
      en: "Have a project in mind? Or just want to connect? I'm always open for meaningful conversations. 👋",
    },
    role:       { id: "Backend & Fullstack Dev", en: "Backend & Fullstack Dev" },
    openNew:    { id: "Buka untuk proyek baru",  en: "Open for new projects" },
    labelEmail: { id: "Email",      en: "Email"     },
    labelWA:    { id: "WhatsApp",   en: "WhatsApp"  },
    labelLI:    { id: "LinkedIn",   en: "LinkedIn"  },
    chatArrow:  { id: "Chat →",     en: "Chat →"    },
    connectArrow:{ id: "Connect →", en: "Connect →" },
    formTitle:  { id: "Kirim Pesan", en: "Send a Message" },
    formSubtext:{
      id: "Saya biasanya membalas dalam 24 jam. Jangan ragu — tidak ada pertanyaan yang terlalu kecil.",
      en: "I usually reply within 24 hours. Don't hesitate — no question is too small.",
    },
    fieldName:    { id: "Nama",    en: "Name" },
    fieldEmail:   { id: "Email",   en: "Email" },
    fieldMsg:     { id: "Pesan",   en: "Message" },
    phName:       { id: "Siapa nama kamu?",  en: "What's your name?" },
    phEmail:      { id: "Alamat emailmu",    en: "Your email address" },
    phMsg: {
      id: "Ceritakan kebutuhanmu, proyekmu, atau sekadar halo — saya dengerin kok 😊",
      en: "Tell me about your project, your needs, or just say hi — I'm all ears 😊",
    },
    sendBtn:      { id: "Kirim Pesan",    en: "Send Message" },
    sending:      { id: "Mengirim...",    en: "Sending..." },
    successMsg: {
      id: "Pesan terkirim! Terima kasih sudah menghubungi — saya akan segera membalas. 🙏",
      en: "Message sent! Thanks for reaching out — I'll get back to you soon. 🙏",
    },
    errorFill:    { id: "Harap isi semua kolom.", en: "Please fill in all fields." },
    errorSend:    { id: "Gagal mengirim. Coba via WhatsApp atau email langsung.", en: "Failed to send. Try via WhatsApp or email directly." },
    viaWA:        { id: "Via WhatsApp", en: "Via WhatsApp" },
    viaEmail:     { id: "Via Email",    en: "Via Email"    },
  },

  // ── CV Modal ────────────────────────────────────────────────────────────
  cv: {
    title:     { id: "Curriculum Vitae",       en: "Curriculum Vitae" },
    role:      { id: "Backend & Fullstack Developer", en: "Backend & Fullstack Developer" },
    school:    { id: "SMK Telkom Malang · Malang, ID", en: "SMK Telkom Malang · Malang, ID" },
    item1: {
      id: "2+ tahun membangun REST API & sistem backend nyata",
      en: "2+ years building real REST APIs & backend systems",
    },
    item2: {
      id: "Stack: Next.js, NestJS, Express, Prisma, PostgreSQL, MySQL",
      en: "Stack: Next.js, NestJS, Express, Prisma, PostgreSQL, MySQL",
    },
    item3: {
      id: "Spesialis: kasir POS, arsip digital, query optimization",
      en: "Specialist: POS cashier, digital archive, query optimization",
    },
    item4: {
      id: "Siswa aktif SMK Telkom Malang dengan portofolio real-world",
      en: "Active student at SMK Telkom Malang with real-world portfolio",
    },
    downloadBtn: { id: "Download PDF",  en: "Download PDF" },
    contactBtn:  { id: "Hubungi Saya",  en: "Contact Me"   },
  },

  // ── Footer ──────────────────────────────────────────────────────────────
  footer: {
    role:      { id: "Backend & Fullstack Dev", en: "Backend & Fullstack Dev" },
    desc: {
      id: "Membangun REST API scalable, optimasi database, dan antarmuka web modern dengan Next.js, NestJS, Prisma, dan PostgreSQL.",
      en: "Building scalable REST APIs, database optimization, and modern web interfaces with Next.js, NestJS, Prisma, and PostgreSQL.",
    },
    location:     { id: "Malang, Indonesia",  en: "Malang, Indonesia" },
    available:    { id: "Available",          en: "Available" },
    navLabel:     { id: "Navigation",         en: "Navigation" },
    contactLabel: { id: "Contact",            en: "Contact" },
    hireBtn:      { id: "Hire Me",            en: "Hire Me" },
    builtWith:    { id: "Dibuat dengan Next.js · TypeScript · TailwindCSS", en: "Built with Next.js · TypeScript · TailwindCSS" },
    madeIn:       { id: "di Malang",          en: "in Malang" },
  },
} as const;

/** Helper type: get value from a translation key */
export type TranslationKey = keyof typeof translations;

/** Get translated string by key path, e.g. t(lang, "hero", "badge") */
export function t(
  lang: Lang,
  section: keyof typeof translations,
  key: string
): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sec = (translations as any)[section];
  if (!sec) return key;
  const entry = sec[key];
  if (!entry) return key;
  return entry[lang] ?? entry["id"] ?? key;
}
