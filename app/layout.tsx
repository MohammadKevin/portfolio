import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mohammad Kevin - Fullstack & Backend Developer",
  description: "Portfolio of Mohammad Kevin, a Fullstack & Backend Developer specializing in high-performance APIs, database optimization, and scalable web applications using Node.js, Laravel, React, and Next.js.",
  keywords: [
    "Mohammad Kevin",
    "Backend Developer",
    "Fullstack Developer",
    "Developer Malang",
    "Indonesia",
    "Node.js Developer",
    "Laravel Developer",
    "Next.js Portfolio",
    "API Specialist"
  ].join(", "),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('kevin-portfolio-theme') || 'blue';
                  if (savedTheme !== 'blue') {
                    document.documentElement.setAttribute('data-theme', savedTheme);
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased bg-background text-foreground min-h-screen transition-colors duration-500">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

