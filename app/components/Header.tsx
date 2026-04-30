"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState("right");

  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: "INVESTORS", href: "#investors" },
    { label: "OPPORTUNITIES", href: "#new-launch" },
    { label: "CASE STUDIES", href: "#case-studies" },
    { label: "INSIGHTS", href: "#insights" },
  ];

  /* HEADER BG SCROLL */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* SCROLL SPY (ONLY ON HOMEPAGE) */
  useEffect(() => {
    if (pathname !== "/") return;

    const sections = document.querySelectorAll("[data-section]");

    const handleScroll = () => {
      let current = "";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();

        if (
          rect.top <= window.innerHeight * 0.3 &&
          rect.bottom >= window.innerHeight * 0.3
        ) {
          current = section.getAttribute("data-section") || "";
        }
      });

      const index = navItems.findIndex(
        (item) =>
          item.href.startsWith("#") &&
          item.href.replace("#", "") === current
      );

      if (index !== -1 && index !== activeIndex) {
        setDirection(index > activeIndex ? "right" : "left");
        setActiveIndex(index);
      }

      if (!current) setActiveIndex(-1);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeIndex, pathname]);

  /* SMART NAVIGATION */
  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      if (pathname === "/") {
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        router.push("/" + href);
      }
    } else {
      router.push(href);
    }
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/90 backdrop-blur-md py-2 md:py-3 shadow-[0_1px_0_rgba(255,255,255,0.08)]"
          : "bg-transparent py-3 md:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/">
          <img
            src="/logo.svg"
            alt="Mark Real Estate"
            className="h-8 sm:h-10 md:h-8 w-auto object-contain opacity-90 hover:opacity-100 transition"
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-10 text-[12px] tracking-[0.15em] text-[#aaa]">
          {navItems.map((item, i) => {
            const isActive =
              activeIndex === i || hoverIndex === i;

            return (
              <button
                key={i}
                onClick={() => handleNavClick(item.href)}
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
                className={`relative px-1 py-1 transition ${
                  isActive ? "text-white" : ""
                }`}
              >
                {item.label}

                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div
                      key={i}
                      initial={{
                        scaleX: 0,
                        originX: direction === "right" ? 0 : 1,
                      }}
                      animate={{
                        scaleX: 1,
                        originX: direction === "right" ? 0 : 1,
                      }}
                      exit={{
                        scaleX: 0,
                        originX: direction === "right" ? 1 : 0,
                      }}
                      transition={{ duration: 0.35 }}
                      className="absolute left-0 -bottom-1 h-[2px] w-full bg-[#C8A45A]"
                    />
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/* CTA */}
          <button
            onClick={() => handleNavClick("#final-cta")}
            className="hidden md:flex items-center gap-2 px-6 py-2 border border-white/20 text-white/80 text-[12px] tracking-[0.18em] hover:border-[#C8A45A]/50 hover:text-white transition"
          >
            <Phone className="w-4 h-4" />
            Book Consultation
          </button>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
          >
            <span
              className={`absolute w-6 h-[1.5px] bg-white transition-all ${
                open ? "rotate-45" : "-translate-y-2"
              }`}
            />
            <span
              className={`absolute w-6 h-[1.5px] bg-white transition-all ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute w-6 h-[1.5px] bg-white transition-all ${
                open ? "-rotate-45" : "translate-y-2"
              }`}
            />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="md:hidden bg-black px-6 py-8 border-t border-white/10"
          >
            <div className="flex flex-col gap-6 text-base">
              {navItems.map((item, i) => {
                const isActive = activeIndex === i;

                return (
                  <button
                    key={i}
                    onClick={() => handleNavClick(item.href)}
                    className={`pl-3 border-l-2 text-left transition ${
                      isActive
                        ? "border-[#C8A45A] text-white"
                        : "border-transparent text-gray-400"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}