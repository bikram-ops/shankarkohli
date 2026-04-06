"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [activeIndex, setActiveIndex] = useState(-1);
  const [direction, setDirection] = useState("right");

  const navItems = [
    { label: "INVESTORS", href: "#investors" },
    { label: "NEW LAUNCH", href: "#new-launch" },
    { label: "ADVISORY", href: "#advisory" },
    { label: "WHY CHOOSE", href: "#why" },
  ];

  /* SCROLL DETECTION */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* SCROLL SPY */
  useEffect(() => {
    const sections = document.querySelectorAll("[data-section]");

    const handleScroll = () => {
      let current = "";
      let minTop = Infinity;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= 0) {
          if (rect.top < minTop) {
            minTop = rect.top;
            current = section.getAttribute("data-section") || "";
          }
        }
      });

      const index = navItems.findIndex(
        (item) => item.href.replace("#", "") === current
      );

      if (index !== -1 && index !== activeIndex) {
        const newDirection = index > activeIndex ? "right" : "left";
        setDirection(newDirection);
        setActiveIndex(index);
      }

      if (!current) setActiveIndex(-1);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeIndex]);

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
        <div
          className="cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <img
            src="/logo.svg"
            alt="Logo"
            className="h-8 sm:h-10 md:h-10 w-auto object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-10 text-sm text-gray-300">
          {navItems.map((item, i) => {
            const isActive = activeIndex === i;

            return (
              <a key={i} href={item.href} className="relative px-1 py-1">
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
              </a>
            );
          })}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/* CTA (DESKTOP ONLY) */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() =>
              document
                .getElementById("final-cta")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="hidden md:flex bg-[#C8A45A] text-black 
                       px-5 py-2 text-sm tracking-[0.12em] 
                       items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            Book Consultation
          </motion.button>

          {/* MOBILE MENU BUTTON */}
          <button
  onClick={() => setOpen(!open)}
  className="md:hidden relative w-10 h-10 flex items-center justify-center group"
>
  {/* TOP LINE */}
  <span
    className={`absolute w-7 h-[2px] bg-white rounded-full transition-all duration-300 ${
      open ? "rotate-45 translate-y-0" : "-translate-y-2 group-hover:-translate-y-2.5"
    }`}
  />

  {/* MIDDLE LINE */}
  <span
    className={`absolute w-5 h-[2px] bg-[#C8A45A] rounded-full transition-all duration-300 ${
      open ? "opacity-0 scale-0" : "group-hover:w-7"
    }`}
  />

  {/* BOTTOM LINE */}
  <span
    className={`absolute w-7 h-[2px] bg-white rounded-full transition-all duration-300 ${
      open ? "-rotate-45 translate-y-0" : "translate-y-2 group-hover:translate-y-2.5"
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
                  <a
                    key={i}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`pl-3 border-l-2 transition ${
                      isActive
                        ? "border-[#C8A45A] text-white"
                        : "border-transparent text-gray-400"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}