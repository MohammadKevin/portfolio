"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#process" },
    { label: "Portfolio", href: "#portfolio" },
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
                if (el && window.scrollY >= el.offsetTop - 120) {
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
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? "bg-[#051a1d]/85 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/30"
                    : "bg-transparent border-b border-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#14b8a6] to-[#0ea5e9] rounded-xl flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-[#14b8a6]/20 group-hover:shadow-[#14b8a6]/40 group-hover:rotate-3 transition-all duration-300">
                            M
                        </div>
                        <span className="font-extrabold text-white text-lg tracking-tight group-hover:text-[#14b8a6] transition-colors duration-300">
                            Mohammad Kevin
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex items-center gap-2 list-none m-0 p-0">
                        {navItems.map((item) => (
                            <li key={item.label}>
                                <a
                                    href={item.href}
                                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 relative ${activeSection === item.href.replace("#", "")
                                            ? "text-[#14b8a6] font-semibold bg-white/5"
                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    {item.label}
                                    {activeSection === item.href.replace("#", "") && (
                                        <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-[#14b8a6] to-[#0ea5e9] rounded-full" />
                                    )}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Contact CTA */}
                    <div className="hidden md:flex items-center gap-3">
                        <a
                            href="#contact"
                            className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-[#14b8a6] to-[#0ea5e9] text-gray-950 hover:text-black text-sm font-bold rounded-full shadow-lg shadow-[#14b8a6]/10 hover:shadow-[#14b8a6]/30 hover:scale-102 active:scale-98 transition-all duration-300"
                        >
                            Let's Talk
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300"
                            aria-label="Toggle menu"
                        >
                            {menuOpen ? (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-[#051a1d]/95 border-b border-white/10 backdrop-blur-lg px-6 py-6 flex flex-col gap-2 shadow-2xl">
                    {navItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            onClick={() => setMenuOpen(false)}
                            className={`px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 ${activeSection === item.href.replace("#", "")
                                    ? "text-[#14b8a6] bg-white/5"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            {item.label}
                        </a>
                    ))}
                    <div className="border-t border-white/10 mt-4 pt-4">
                        <a
                            href="#contact"
                            onClick={() => setMenuOpen(false)}
                            className="block px-5 py-3.5 bg-gradient-to-r from-[#14b8a6] to-[#0ea5e9] text-gray-950 text-base font-bold rounded-xl text-center shadow-lg shadow-[#14b8a6]/10"
                        >
                            Let's Talk
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}
