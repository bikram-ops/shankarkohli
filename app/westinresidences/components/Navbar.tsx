"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Residences", href: "#residences" },
  { label: "Amenities", href: "#amenities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Location", href: "#location" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* Mobile Menu */}
      <div className={`westin-mob-menu${menuOpen ? " open" : ""}`}>
        <button
          onClick={() => setMenuOpen(false)}
          className="westin-mob-close"
        >
          ✕
        </button>

        {NAV_LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="westin-mob-link"
            onClick={() => setMenuOpen(false)}
          >
            {l.label}
          </a>
        ))}

        <a
          href="#contact"
          className="westin-btn-gold"
          onClick={() => setMenuOpen(false)}
        >
          Book Site Visit
        </a>
      </div>

      {/* Navbar */}
      <nav
        className={`westin-nav transition-all duration-300 ${
          scrolled ? "scrolled" : ""
        }`}
      >
        {/* Brand / Logo */}
       <Link href="#home" className="westin-brand flex items-center">
  <Image
    src={
      scrolled
        ? "/images/westin/Westin-logo-dark.svg"
        : "/images/westin/Westin-logo.webp"
    }
    alt="Westin Logo"
    width={0}
    height={0}
    sizes="(max-width: 768px) 120px, (max-width: 1200px) 160px, 200px"
    className="westin-logo w-auto h-10 sm:h-12 md:h-14 lg:h-16 xl:h-18 transition-all duration-300"
    priority
  />
</Link>
        {/* Desktop Links */}
        <div className="westin-nav-links">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="westin-nav-link transition-colors duration-300"
              style={{
                color: scrolled
                  ? "#4a4535"
                  : "rgba(189, 189, 189, 0.85)",
              }}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a href="#contact" className="westin-btn-gold westin-nav-cta">
          Book Site Visit
        </a>

        {/* Hamburger */}
        <button
          className="westin-hamburger"
          onClick={() => setMenuOpen(true)}
        >
          <span
            style={{
              background: scrolled ? "#1a1710" : "#ffffff",
            }}
          />
          <span
            style={{
              width: 18,
              background: scrolled ? "#1a1710" : "#ffffff",
            }}
          />
          <span
            style={{
              background: scrolled ? "#1a1710" : "#ffffff",
            }}
          />
        </button>
      </nav>
    </>
  );
}