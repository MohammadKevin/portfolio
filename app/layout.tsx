import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mohammad Kevin | Backend & Fullstack Developer",
  description:
    "Portfolio of Mohammad Kevin, Fullstack & Backend Developer based in Malang, Indonesia. Specializing in Next.js, NestJS, Express, Prisma, PostgreSQL, and MySQL.",
  keywords: [
    "Mohammad Kevin",
    "Backend Developer",
    "Fullstack Developer",
    "Developer Malang",
    "SMK Telkom Malang",
    "Next.js Developer",
    "NestJS Developer",
    "Express.js",
    "Prisma ORM",
    "PostgreSQL",
    "MySQL",
    "Terminal Portfolio",
  ].join(", "),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`scroll-smooth ${jetbrainsMono.variable} ${inter.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const t = localStorage.getItem('kv-theme') || 'indigo';
                  document.documentElement.setAttribute('data-theme', t);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="antialiased bg-[#080f1e] text-slate-300 min-h-screen font-sans"
      >
        <LanguageProvider>
          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
