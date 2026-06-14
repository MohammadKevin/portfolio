import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mohammad Kevin - Fullstack Developer",
  description: "A Backend Developer with a passion for building efficient and scalable web applications. With expertise in Node.js, Express, and MongoDB, I create robust APIs and seamless user experiences. Let's collaborate to bring your ideas to life!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased font-sans bg-[#080b11] text-[#f4f4f7]">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
