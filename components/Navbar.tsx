"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Process", href: "#process" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Blog", href: "#blog" },
    { label: "Services", href: "#services" },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            const sections = navItems.map((item) => item.href.replace("#", ""));
            for (const section of sections.reverse()) {
                const el = document.getElementById(section);
                if (el && window.scrollY >= el.offsetTop - 100) {
                    setActiveSection(section);
                    break;
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? "bg-white/95 backdrop-blur-md shadow-md shadow-violet-100/50 border-b border-violet-100"
                    : "bg-white/80 backdrop-blur-sm border-b border-violet-50"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-9 h-9 bg-[#6FD1D7] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md shadow-[#6FD1D7] group-hover:bg-[#5fbfc4] group-hover:rotate-6 transition-all duration-300">
                            M
                        </div>
                        <span className="font-extrabold text-[#162842] text-lg tracking-tight">
                            Mohammad Kevin
                        </span>
                    </Link>

                    <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
                        {navItems.map((item) => (
                            <li key={item.label}>
                                <a
                                    href={item.href}
                                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${activeSection === item.href.replace("#", "")
                                            ? "text-[#6FD1D7] bg-[#f0f9fa] font-semibold"
                                            : "text-gray-600 hover:text-[#6FD1D7] hover:bg-[#f0f9fa]"
                                        }`}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center gap-3">
                        <a
                            href="#contact"
                            className="hidden md:inline-flex items-center px-5 py-2.5 bg-[#6FD1D7] hover:bg-[#5fbfc4] text-white text-sm font-semibold rounded-full shadow-lg shadow-[#6FD1D7] hover:shadow-[#5fbfc4] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                        >
                            Contact
                        </a>

                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-violet-50 transition-colors duration-200"
                            aria-label="Toggle menu"
                        >
                            {menuOpen ? (
                                <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {menuOpen && (
                <div className="md:hidden bg-white border-t border-[#6FD1D7] px-6 py-4 flex flex-col gap-1 shadow-lg">
                    {navItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            onClick={() => setMenuOpen(false)}
                            className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-[#6FD1D7] hover:bg-[#f0f9fa] rounded-lg transition-all duration-200"
                        >
                            {item.label}
                        </a>
                    ))}
                    <div className="border-t border-[#6FD1D7] mt-3 pt-3">
                        <a
                            href="#contact"
                            onClick={() => setMenuOpen(false)}
                            className="block px-5 py-3 bg-[#6FD1D7] hover:bg-[#5fbfc4] text-white text-sm font-semibold rounded-full text-center transition-all duration-200"
                        >
                            Contact
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}
