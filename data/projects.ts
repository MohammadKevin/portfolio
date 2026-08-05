export interface LocalizedString {
  id: string;
  en: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  type: "Backend" | "Frontend" | "Fullstack";
  color: string;
  desc: LocalizedString | string;
  problem?: LocalizedString | string;
  impact?: LocalizedString | string;
  tech: string[];
  demoUrl?: string;
  repoUrl?: string;
  featured?: boolean;
}

export const projectsData: Project[] = [
  {
    id: "project-1",
    title: "InvDocs - Digital Archive System",
    category: "Digital Archive System",
    type: "Fullstack",
    color: "border-amber-500/40 bg-amber-950/10",
    desc: {
      id: "Sistem pengarsipan dan manajemen dokumen digital terstruktur untuk organisasi dengan enkripsi berkas dan hak akses bertingkat.",
      en: "Structured digital document archiving and management system for organizations with file encryption and multi-level access rights."
    },
    problem: {
      id: "Pengarsipan fisik yang berantakan dan lambatnya pencarian dokumen administratif lama.",
      en: "Messy physical archiving and slow retrieval of old administrative documents."
    },
    impact: {
      id: "Mempercepat waktu pencarian berkas dari hitungan jam menjadi kurun waktu < 3 detik dengan indeks metadata terstruktur.",
      en: "Accelerated file retrieval time from hours to < 3 seconds with structured metadata indexing."
    },
    tech: ["Next.js", "Express.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
    demoUrl: "",
    repoUrl: "https://github.com/MohammadKevin/InvDocs-Archive",
    featured: true
  },
  {
    id: "project-2",
    title: "Kasir App (POS Terminal)",
    category: "Point of Sale System",
    type: "Fullstack",
    color: "border-emerald-500/40 bg-emerald-950/10",
    desc: {
      id: "Sistem kasir toko & UMKM dengan pencatatan transaksi real-time, cetak struk faktur, serta pembuatan laporan penjualan harian.",
      en: "POS system for shops & SMEs with real-time transaction logging, invoice receipt printing, and daily sales report generation."
    },
    problem: {
      id: "Pencatatan kasir manual yang rawan selisih persediaan barang dan kesalahan kalkulasi kembalian.",
      en: "Manual cashier recording prone to inventory discrepancies and change calculation errors."
    },
    impact: {
      id: "Menghilangkan selisih persediaan fisik dengan akurasi pemotongan stok otomatis 100% pada transaksi kasir.",
      en: "Eliminated physical inventory discrepancies with 100% automatic stock deduction accuracy on POS transactions."
    },
    tech: ["React.js", "Express.js", "MySQL", "Prisma", "Tailwind CSS"],
    demoUrl: "",
    repoUrl: "",
    featured: true
  },
  {
    id: "project-3",
    title: "Inventory Management API & Engine",
    category: "Backend Engine",
    type: "Backend",
    color: "border-cyan-500/40 bg-cyan-950/10",
    desc: {
      id: "RESTful API high-throughput untuk pelacakan persediaan gudang, multi-warehouse batch logging, dan notifikasi stok kritis.",
      en: "High-throughput RESTful API for warehouse inventory tracking, multi-warehouse batch logging, and critical stock notifications."
    },
    problem: {
      id: "Lambatnya query pencarian stok barang dalam jumlah puluhan ribu baris data pada sistem gudang lama.",
      en: "Slow item stock search queries across tens of thousands of data rows in the legacy warehouse system."
    },
    impact: {
      id: "Mempercepat query pencarian persediaan sebesar 40% setelah penerapan database indexing dan Prisma query tuning.",
      en: "Sped up inventory search queries by 40% after implementing database indexing and Prisma query tuning."
    },
    tech: ["NestJS", "Node.js", "PostgreSQL", "Prisma", "Redis"],
    demoUrl: "",
    repoUrl: "https://github.com/MohammadKevin/inventory-backend-engine",
    featured: true
  },
  {
    id: "project-4",
    title: "Digital Public Record Platform",
    category: "Web Application",
    type: "Fullstack",
    color: "border-blue-500/40 bg-blue-950/10",
    desc: {
      id: "Platform pengarsipan data publik dan catatan administratif sekolah/organisasi dengan proteksi otentikasi JWT.",
      en: "Public data archiving and school/organization administrative record platform with JWT authentication protection."
    },
    problem: {
      id: "Kebutuhan publikasi data arsip terbuka yang tetap menjamin kerahasiaan berkas internal.",
      en: "The need for open archive data publication while ensuring the confidentiality of internal files."
    },
    impact: {
      id: "Sistem berhasil menangani ribuan pengunduhan berkas dokumen publik dengan pengamanan akses granular.",
      en: "The system successfully handled thousands of public document file downloads with granular access security."
    },
    tech: ["Next.js", "Tailwind CSS", "Prisma", "MySQL"],
    demoUrl: "",
    repoUrl: "",
    featured: false
  },
  {
    id: "project-5",
    title: "Developer Terminal Portfolio",
    category: "System Interface",
    type: "Frontend",
    color: "border-amber-500/40 bg-amber-950/10",
    desc: {
      id: "Website portofolio pribadi bertema IDE/Terminal developer tool dengan UI high-contrast, status diagnostics, dan system info viewer.",
      en: "Personal portfolio website with an IDE/Terminal developer tool theme featuring high-contrast UI, status diagnostics, and system info viewer."
    },
    problem: {
      id: "Template portofolio SaaS generik yang tidak mencerminkan fokus arsitektur backend & system dev.",
      en: "Generic SaaS portfolio templates that do not reflect the focus on backend architecture & system development."
    },
    impact: {
      id: "Memberikan pengalaman visual unik bergaya system terminal dengan performa 100% Lighthouse score.",
      en: "Provides a unique visual experience in a system terminal style with 100% Lighthouse performance score."
    },
    tech: ["Next.js 16", "Tailwind CSS", "TypeScript"],
    demoUrl: "https://mohammadkevin.dev",
    repoUrl: "https://github.com/MohammadKevin/my-portfolio",
    featured: true
  },
  {
    id: "project-6",
    title: "School System Admin Dashboard",
    category: "Admin Dashboard",
    type: "Frontend",
    color: "border-purple-500/40 bg-purple-950/10",
    desc: {
      id: "Dashboard monitoring metrik data akademik sekolah, visualisasi keaktifan siswa, dan pengelolaan jadwal kegiatan.",
      en: "School academic data metrics monitoring dashboard, student activity visualization, and event schedule management."
    },
    problem: {
      id: "Visualisasi data akademis kompleks yang sulit dibaca oleh staf pengajar.",
      en: "Complex academic data visualization that is hard to read for teaching staff."
    },
    impact: {
      id: "Menyederhanakan pemantauan data akademik dengan waktu pemuatan widget dashboard under 1 detik.",
      en: "Simplified academic data monitoring with dashboard widget load times under 1 second."
    },
    tech: ["React.js", "Chart.js", "Tailwind CSS", "TypeScript"],
    demoUrl: "",
    repoUrl: "",
    featured: false
  }
];
