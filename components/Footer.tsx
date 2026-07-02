import Link from "next/link";

const footerLinks = {
    Services: ["Backend API", "Web Development", "Database Management", "System Architecture"],
    Company: ["About Me", "My Skills", "Portfolio", "Process"],
    Legal: ["Privacy Policy", "Terms of Service"],
};

const socials = [
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/muhamad-kevin-arif-rudianto-945733347/",
        icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        label: "GitHub",
        href: "https://github.com/MohammadKevin",
        icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
        ),
    },
    {
        label: "Instagram",
        href: "https://www.instagram.com/mhmdkevin_1/",
        icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
        ),
    },
];

export default function Footer() {
    return (
        <footer className="bg-background/80 text-gray-400 border-t border-white/5 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    {/* Brand Info */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        <Link href="/" className="flex items-center gap-3 group w-fit">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-gray-950 font-extrabold text-xl hover:opacity-90 transition-all duration-300">
                                M
                            </div>
                            <span className="font-extrabold text-white text-lg tracking-tight">
                                Mohammad Kevin
                            </span>
                        </Link>

                        <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
                            Dedicated Fullstack Developer focused on creating secure, performant, and scalable backend services and responsive frontends.
                        </p>

                        {/* Contacts */}
                        <div className="flex flex-col gap-3 mt-2">
                            <a
                                href="mailto:kvn4.200581@gmail.com"
                                className="flex items-center gap-3 text-sm hover:text-primary transition-colors duration-300 w-fit"
                            >
                                <svg className="w-4.5 h-4.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                kvn4.200581@gmail.com
                            </a>
                            <a
                                href="https://wa.me/6282131588846"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-sm hover:text-primary transition-colors duration-300 w-fit"
                            >
                                <svg className="w-4.5 h-4.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                +62 821-3158-8846
                            </a>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-3 mt-2">
                            {socials.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-primary hover:bg-primary text-gray-400 hover:text-gray-950 flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title} className="flex flex-col gap-5">
                            <h4 className="text-white font-bold text-sm uppercase tracking-wider">{title}</h4>
                            <ul className="flex flex-col gap-3 list-none p-0 m-0">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href={
                                                link === "About Me"
                                                    ? "#about"
                                                    : link === "My Skills" || link === "Process"
                                                    ? "#process"
                                                    : link === "Portfolio"
                                                    ? "#portfolio"
                                                    : link === "Backend API" || link === "Web Development" || link === "Database Management" || link === "System Architecture"
                                                    ? "#services"
                                                    : "#"
                                            }
                                            className="text-sm hover:text-white transition-colors duration-300 inline-block hover:translate-x-1 transition-transform"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-white/5 bg-black/35">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} Mohammad Kevin. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors duration-300">Privacy Policy</a>
                        <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors duration-300">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

