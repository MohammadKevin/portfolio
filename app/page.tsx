"use client";

import { useState, useRef } from "react";

import * as emailjs from "@emailjs/browser";

const SERVICE_ID  = "service_rmat5kp";
const TEMPLATE_ID = "template_zt9llkk";
const PUBLIC_KEY  = "q_nuzyb4WLIy6kboy";

const stats = [
  { value: "2 years", label: "Experience" },
  { value: "40+", label: "Project Completed" },
];

const workProcess = [
  {
    number: "01",
    title: "Backend Development",
    desc: "Build secure and scalable REST APIs using Express.js, Node.js, and Laravel.",
    icon: "⚙️",
  },
  {
    number: "02",
    title: "Frontend Development",
    desc: "Create responsive and modern user interfaces using Next.js, React, and Tailwind CSS.",
    icon: "💻",
  },
  {
    number: "03",
    title: "Database Management",
    desc: "Manage and optimize databases using MySQL, PostgreSQL, and Prisma ORM.",
    icon: "🗄️",
  },
  {
    number: "04",
    title: "Development Tools",
    desc: "Use modern development tools like Git, GitHub, Figma, Postman, and VS Code.",
    icon: "🛠️",
  },
];

const portfolioItems = [
  {
    title: "InvDocs",
    category: "Document Management System",
    color: "from-blue-500 to-cyan-400",
  },
  {
    title: "Kasir App",
    category: "Point of Sale System",
    color: "from-emerald-500 to-green-400",
  },
  {
    title: "Digital Archive Website",
    category: "Web Application",
    color: "from-purple-500 to-violet-400",
  },
  {
    title: "Inventory Management System",
    category: "Backend Development",
    color: "from-orange-400 to-amber-300",
  },
  {
    title: "Portfolio Website",
    category: "Frontend Development",
    color: "from-pink-500 to-rose-400",
  },
  {
    title: "School Project Dashboard",
    category: "Dashboard UI",
    color: "from-slate-700 to-slate-500",
  },
];

type ToastType = "success" | "error" | null;

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

const INITIAL_FORM: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: "",
};

export default function Home() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: ToastType }>({ msg: "", type: null });
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (msg: string, type: ToastType) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ msg, type });
    setToastVisible(true);
    toastTimer.current = setTimeout(() => setToastVisible(false), 3500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = (): boolean => {
    const required: (keyof FormState)[] = ["firstName", "email", "subject", "message"];
    for (const key of required) {
      if (!form[key].trim()) {
        showToast("⚠️ Mohon isi semua field wajib.", "error");
        return false;
      }
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      showToast("⚠️ Format email tidak valid.", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name:  `${form.firstName}${form.lastName ? " " + form.lastName : ""}`,
          from_email: form.email,
          subject:    form.subject,
          message:    form.message,
          to_email:   "kvn4.200581@gmail.com",
        },
        PUBLIC_KEY
      );
      showToast("✅ Pesan berhasil dikirim!", "success");
      setForm(INITIAL_FORM);
    } catch (err) {
      console.error(err);
      showToast("❌ Gagal mengirim. Cek konfigurasi EmailJS.", "error");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6FD1D7] focus:border-[#6FD1D7] text-sm text-gray-800 bg-gray-50 focus:bg-white transition-all w-full";

  return (
    <main className="pt-16">
      <div
        className={`fixed bottom-6 left-1/2 z-50 px-5 py-3 rounded-xl text-white text-sm font-semibold shadow-xl transition-all duration-300 ${
          toastVisible
            ? "opacity-100 -translate-x-1/2 translate-y-0"
            : "opacity-0 -translate-x-1/2 translate-y-8 pointer-events-none"
        } ${toast.type === "success" ? "bg-emerald-500" : "bg-red-500"}`}
      >
        {toast.msg}
      </div>
      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-violet-50 via-white to-cyan-50"
      >
        <div className="absolute top-20 right-10 w-72 h-72 bg-violet-200 rounded-full blur-3xl opacity-40 pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-cyan-200 rounded-full blur-3xl opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-violet-100 text-[#6FD1D7] text-xs font-semibold px-4 py-2 rounded-full w-fit">
              <span className="w-2 h-2 bg-[#6FD1D7] rounded-full animate-pulse" />
              Available for Freelance Work
            </div>

            <h1 className="text-5xl lg:text-6xl font-extrabold text-[#6FD1D7] leading-[1.1] tracking-tight">
              Hello, I&apos;m{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6FD1D7] to-[#5fbfc4]">
                Mohammad Kevin
              </span>
            </h1>

            <p className="text-gray-500 text-lg leading-relaxed max-w-lg">
              I&apos;m a Backend Fullstack Developer with a passion for building{" "}
              <span className="text-[#6FD1D7] font-semibold">scalable</span> &{" "}
              <span className="text-[#6FD1D7] font-semibold">performant</span> web
              applications. I build immersive and beautiful web applications through
              creative design.
            </p>

            <div className="flex items-center gap-4 mt-2">
              <a
                href="#portfolio"
                className="px-7 py-3.5 bg-[#6FD1D7] hover:bg-[#5fbfc4] text-white font-semibold rounded-full shadow-lg shadow-[#6FD1D7]/40 hover:shadow-[#5fbfc4]/40 transition-all duration-300 hover:-translate-y-0.5"
              >
                Hire Me
              </a>
              <a
                href="#about"
                className="px-7 py-3.5 border-2 border-gray-200 hover:border-[#6FD1D7] text-gray-700 hover:text-[#6FD1D7] font-semibold rounded-full transition-all duration-300"
              >
                About Me
              </a>
            </div>

            <div className="flex items-center gap-8 mt-6 pt-6 border-t border-gray-100">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col gap-0.5">
                  <span className="text-3xl font-extrabold text-[#6FD1D7]">{s.value}</span>
                  <span className="text-xs text-gray-500 font-medium">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-72 h-80 lg:w-96 lg:h-[420px]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#6FD1D7] to-purple-100 rounded-3xl rotate-3 scale-95" />
              <div className="relative w-full h-full overflow-hidden rounded-3xl shadow-2xl shadow-[#6FD1D7]/40">
                <img
                  src="/images/profile.png"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="rounded-3xl p-8 lg:p-14 flex flex-col lg:flex-row gap-12 items-center shadow-sm border border-gray-100">
            <div className="flex-shrink-0 w-56 h-56 rounded-2xl overflow-hidden shadow-xl shadow-[#6FD1D7]/40">
              <img
                src="/images/profile.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-5">
              <div>
                <p className="text-[#6FD1D7] text-sm font-semibold uppercase tracking-widest mb-2">
                  About Me
                </p>
                <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
                  I am Professional{" "}
                  <span className="text-[#6FD1D7]">Fullstack Developer</span>
                </h2>
              </div>
              <p className="text-gray-500 leading-relaxed">
                I design and develop services for customers specializing in creating
                stylish, modern websites and online stores. My passion is to design
                digital user experiences through meaningful, human-centered design.
              </p>
              <div className="flex items-center gap-4 mt-2">
                <a
                  href="#portfolio"
                  className="px-6 py-3 bg-[#6FD1D7] hover:bg-[#5fbfc4] text-white text-sm font-semibold rounded-full shadow-md transition-all duration-300 hover:-translate-y-0.5"
                >
                  My Project
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 hover:border-[#6FD1D7] text-gray-700 hover:text-[#6FD1D7] text-sm font-semibold rounded-full transition-all duration-300"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download CV
                </a>
              </div>

              <div className="flex items-center gap-3 pt-2">
                {["f", "tw", "in", "dr", "yt"].map((s) => (
                  <a
                    key={s}
                    className="w-9 h-9 rounded-lg bg-white border border-gray-200 hover:border-[#6FD1D7] hover:bg-[#6FD1D7] text-gray-500 hover:text-white flex items-center justify-center text-xs font-bold transition-all duration-200 shadow-sm"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="flex flex-col gap-5 lg:sticky top-24">
              <p className="text-[#6FD1D7] text-sm font-semibold uppercase tracking-widest">
                How I Work
              </p>
              <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">Skills</h2>
              <p className="text-gray-500 leading-relaxed">
                I approach every project with a user-centered mindset, combining
                creativity with technical expertise to deliver exceptional results. My
                process is collaborative and iterative, ensuring that the final product
                not only meets but exceeds expectations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {workProcess.map((step) => (
                <div
                  key={step.number}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#6FD1D7] hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="w-11 h-11 bg-[#6FD1D7]/10 group-hover:bg-[#6FD1D7] rounded-xl flex items-center justify-center text-xl mb-4 transition-all duration-300">
                    <span>{step.icon}</span>
                  </div>
                  <span className="text-xs text-[#6FD1D7] font-bold tracking-widest">
                    {step.number}
                  </span>
                  <h3 className="text-base font-bold text-gray-900 mt-1 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#6FD1D7] text-sm font-semibold uppercase tracking-widest mb-2">
              My Work
            </p>
            <h2 className="text-4xl font-extrabold text-gray-900">Portfolio</h2>
            <p className="text-gray-500 mt-3 max-w-md mx-auto text-sm leading-relaxed">
              A curated selection of projects that showcase my design and development
              expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.map((item, i) => (
              <div
                key={i}
                className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className={`h-48 bg-gradient-to-br ${item.color}`} />
                <div className="p-5 bg-white">
                  <span className="text-xs text-[#6FD1D7] font-semibold uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-bold text-gray-900 mt-1 mb-3">{item.title}</h3>
                  <p className="text-xs text-gray-400 mb-4">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod.
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6FD1D7] hover:text-[#5bb8c0] transition-colors"
                  >
                    Case Study
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-[#6FD1D7] text-[#6FD1D7] hover:text-[#396a6d] hover:border-[#396a6d] font-semibold rounded-full transition-all duration-300 hover:-translate-y-0.5"
            >
              See More Work
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 bg-gradient-to-br from-violet-50 via-white to-cyan-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#6FD1D7] text-sm font-semibold uppercase tracking-widest mb-2">
              Get In Touch
            </p>
            <h2 className="text-4xl font-extrabold text-gray-900">
              Let&apos;s discuss your Project
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="flex flex-col gap-6">
              <p className="text-gray-500 leading-relaxed">
                I am currently available for freelance work. If you have a project in
                mind or just want to say hi, feel free to reach out. I am always open to
                discussing new projects, creative ideas, or opportunities to be part of
                your visions.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  { icon: "📍", label: "Location", value: "Malang, Indonesia" },
                  { icon: "📧", label: "Email", value: "kvn4.200581@gmail.com" },
                  { icon: "📞", label: "Phone", value: "+62 812-3456-7890" },
                ].map((info) => (
                  <div
                    key={info.label}
                    className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm"
                  >
                    <span className="text-2xl w-10 text-center">{info.icon}</span>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">{info.label}</p>
                      <p className="text-sm font-semibold text-gray-900">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600">
                    First Name <span className="text-[#6FD1D7]">*</span>
                  </label>
                  <input
                    name="firstName"
                    type="text"
                    placeholder="John"
                    value={form.firstName}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600">Last Name</label>
                  <input
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    value={form.lastName}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600">
                  Email <span className="text-[#6FD1D7]">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600">
                  Subject <span className="text-[#6FD1D7]">*</span>
                </label>
                <input
                  name="subject"
                  type="text"
                  placeholder="Project inquiry..."
                  value={form.subject}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600">
                  Message <span className="text-[#6FD1D7]">*</span>
                </label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={handleChange}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-4 bg-[#6FD1D7] hover:bg-[#5bb8c0] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-[#6FD1D7]/40 hover:shadow-[#5bb8c0]/40 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Mengirim...
                  </>
                ) : (
                  "Send Message 🚀"
                )}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}