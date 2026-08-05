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
  metadataBase: new URL('https://corecraft.my.id'),
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
    "corecraft",
  ].join(", "),
  authors: [{ name: "Mohammad Kevin" }],
  creator: "Mohammad Kevin",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://corecraft.my.id",
    title: "Mohammad Kevin | Backend & Fullstack Developer",
    description: "Portfolio of Mohammad Kevin, Fullstack & Backend Developer based in Malang, Indonesia.",
    siteName: "Mohammad Kevin Portfolio",
    images: [
      {
        url: "/images/logo.png", // We can use the existing logo for OG image, or a specific OG image if available
        width: 800,
        height: 600,
        alt: "Mohammad Kevin Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammad Kevin | Backend & Fullstack Developer",
    description: "Portfolio of Mohammad Kevin, Fullstack & Backend Developer based in Malang, Indonesia.",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://corecraft.my.id",
  },
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
