export interface Project {
  id: string;
  title: string;
  category: string;
  type: "Backend" | "Frontend" | "Fullstack";
  color: string;
  desc: string;
  problem: string;
  impact: string;
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
    desc: "Sistem pengarsipan dan manajemen dokumen digital terstruktur untuk organisasi dengan enkripsi berkas dan hak akses bertingkat.",
    problem: "Pengarsipan fisik yang berantakan dan lambatnya pencarian dokumen administratif lama.",
    impact: "Mempercepat waktu pencarian berkas dari hitungan jam menjadi kurun waktu < 3 detik dengan indeks metadata terstruktur.",
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
    desc: "Sistem kasir toko & UMKM dengan pencatatan transaksi real-time, cetak struk faktur, serta pembuatan laporan penjualan harian.",
    problem: "Pencatatan kasir manual yang rawan selisih persediaan barang dan kesalahan kalkulasi kembalian.",
    impact: "Menghilangkan selisih persediaan fisik dengan akurasi pemotongan stok otomatis 100% pada transaksi kasir.",
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
    desc: "RESTful API high-throughput untuk pelacakan persediaan gudang, multi-warehouse batch logging, dan notifikasi stok kritis.",
    problem: "Lambatnya query pencarian stok barang dalam jumlah puluhan ribu baris data pada sistem gudang lama.",
    impact: "Mempercepat query pencarian persediaan sebesar 40% setelah penerapan database indexing dan Prisma query tuning.",
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
    desc: "Platform pengarsipan data publik dan catatan administratif sekolah/organisasi dengan proteksi otentikasi JWT.",
    problem: "Kebutuhan publikasi data arsip terbuka yang tetap menjamin kerahasiaan berkas internal.",
    impact: "Sistem berhasil menangani ribuan pengunduhan berkas dokumen publik dengan pengamanan akses granular.",
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
    desc: "Website portofolio pribadi bertema IDE/Terminal developer tool dengan UI high-contrast, status diagnostics, dan system info viewer.",
    problem: "Template portofolio SaaS generik yang tidak mencerminkan fokus arsitektur backend & system dev.",
    impact: "Memberikan pengalaman visual unik bergaya system terminal dengan performa 100% Lighthouse score.",
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
    desc: "Dashboard monitoring metrik data akademik sekolah, visualisasi keaktifan siswa, dan pengelolaan jadwal kegiatan.",
    problem: "Visualisasi data akademis kompleks yang sulit dibaca oleh staf pengajar.",
    impact: "Menyederhanakan pemantauan data akademik dengan waktu pemuatan widget dashboard under 1 detik.",
    tech: ["React.js", "Chart.js", "Tailwind CSS", "TypeScript"],
    demoUrl: "",
    repoUrl: "",
    featured: false
  }
];
