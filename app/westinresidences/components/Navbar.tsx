"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* Mobile Menu */}
      <div className={`westin-mob-menu${menuOpen ? " open" : ""}`}>
        <button onClick={() => setMenuOpen(false)} className="westin-mob-close">✕</button>

        {NAV_LINKS.map((l) => (
          <a key={l.label} href={l.href} className="westin-mob-link" onClick={() => setMenuOpen(false)}>
            {l.label}
          </a>
        ))}

        <a href="#contact" className="westin-btn-gold" onClick={() => setMenuOpen(false)}>
          Book Site Visit
        </a>
      </div>

      {/* Navbar */}
      <nav className={`westin-nav${scrolled ? " scrolled" : ""}`}>

        {/* Brand */}
        <Link href="#home" className="westin-brand">
          <span
            className="westin-brand-title"
            style={{ color: scrolled ? "#1a1710" : "#ffffff" }}
          >
            Westin
          </span>

          <span
            className="westin-brand-sub"
            style={{ color: "var(--w-gold)" }} // ✅ always gold
          >
            Residences · Gurugram
          </span>
        </Link>

        {/* Desktop links */}
        <div className="westin-nav-links">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="westin-nav-link"
              style={{
                color: scrolled
                  ? "#4a4535" // dark on light bg
                  : "rgba(189, 189, 189, 0.85)", // white on hero
              }}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA (gold stays same) */}
        <a href="#contact" className="westin-btn-gold westin-nav-cta">
          Book Site Visit
        </a>

        {/* Hamburger */}
        <button className="westin-hamburger" onClick={() => setMenuOpen(true)}>
          <span style={{ background: scrolled ? "#1a1710" : "#ffffff" }} />
          <span style={{ width: 18, background: scrolled ? "#1a1710" : "#ffffff" }} />
          <span style={{ background: scrolled ? "#1a1710" : "#ffffff" }} />
        </button>

      </nav>
    </>
  );
}