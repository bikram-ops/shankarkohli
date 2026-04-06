import Link from "next/link";

const NAV_LINKS = [
  { label: "Home",       href: "#home" },
  { label: "Residences", href: "#residences" },
  { label: "Amenities",  href: "#amenities" },
  { label: "Gallery",    href: "#gallery" },
  { label: "Location",   href: "#location" },
];

const SOCIALS = [
  { label: "IG", href: "https://www.instagram.com/shankarkohli1212/" },
  { label: "FB", href: "https://www.facebook.com" },
  { label: "YT", href: "https://youtube.com" },
  { label: "LI", href: "https://www.linkedin.com/in/shankar-kohli-768b59141/" },
];

export default function Footer() {
  return (
    <footer className="westin-footer" aria-label="Site footer">
      <div className="westin-footer-inner">

        {/* Grid */}
        <div className="westin-foot-grid">

          {/* Brand col */}
          <div className="westin-foot-brand">
            <span className="westin-brand-title">Westin</span>
            <span className="westin-brand-sub" style={{ marginTop: 4, marginBottom: 20 }}>
              Residences · Gurugram
            </span>
            <address className="westin-foot-addr" style={{ fontStyle: "normal" }}>
              Managed by Marriott International<br />
              Sector 103, Dwarka Expressway<br />
              Gurugram, Haryana — 122 017
            </address>
            {/* Social icons */}
            <div className="westin-socials" aria-label="Social media links">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="westin-social-btn"
                  aria-label={s.label}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation col */}
          <div>
            <p className="westin-foot-head">Navigation</p>
            <nav aria-label="Footer navigation">
              {NAV_LINKS.map((l) => (
                <a key={l.label} href={l.href} className="westin-foot-link">
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact col */}
          <div>
            <p className="westin-foot-head">Contact</p>
            <a href="tel:+919811422554" className="westin-foot-contact-link">
              +91 98114 22554
            </a>
            <a
              href="mailto:info@markrealesstate.com"
              className="westin-foot-contact-link"
            >
              info@markrealesstate.com
            </a>
            <address style={{ fontStyle: "normal", marginTop: 16 }}>
              <p className="westin-foot-head" style={{ marginBottom: 8 }}>Visit Us</p>
              <span className="westin-foot-addr">
                Sales Gallery, Sector 103<br />
                Dwarka Expressway, Gurugram
              </span>
            </address>
          </div>

          {/* CTA col */}
          <div className="westin-foot-cta-col">
            <p className="westin-foot-head">Get Started</p>
            <a
              href="#contact"
              className="westin-btn-gold"
              style={{ display: "block", textAlign: "center", marginBottom: 10 }}
            >
              Book Site Visit
            </a>
            <a
              href="#residences"
              className="westin-btn-outline-light"
              style={{ display: "block", textAlign: "center" }}
            >
              View Floor Plans
            </a>
            
            
          </div>
        </div>

        {/* Bottom row */}
<div
  className="westin-foot-bottom"
  style={{
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "10px",
    fontSize: "11px",
    opacity: 0.7,
  }}
>
  <p>
    © {new Date().getFullYear()} Westin Residences Gurugram. All rights reserved.
  </p>

  <p>
    Whiteland Corporation · A Marriott International Brand
  </p>

  {/* 🔥 PREMIUM CREDIT (SUBTLE) */}
  <p style={{ opacity: 0.5 }}>
    Marketing by Shankar Kohli · Founder, Mark Real Esstate
  </p>
</div>
      </div>

     
    </footer>
  );
}
