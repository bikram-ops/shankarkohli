"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper/modules";
import "./styles/westin.css";
import {
  Waves,
  Sparkles,
  Utensils,
  Dumbbell,
  Film,
  Target,
  Baby,
  Car,
  Briefcase,
  Leaf,
  Trophy,
  ConciergeBell
} from "lucide-react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const STATS = [
  { value: "3 & 4",      label: "BHK Apartments" },
  { value: "1.75L",      label: "Sq.Ft. Clubhouse" },
  { value: "Sector 103", label: "Dwarka Expressway" },
  { value: "5★",         label: "Westin Services" },
];

const HIGHLIGHTS = [
  {
    no: "01",
    title: "India's Largest Branded Residences",
    body: "An iconic residential landmark in Gurugram, crafted in collaboration with Marriott International. Experience the rare privilege of living in a globally branded residence that blends timeless luxury with world-class hospitality.",
    img: "/images/westin/highlight1.png",
  },
  {
    no: "02",
    title: "Wellness-First Architecture",
    body: "Every residence is thoughtfully designed around light, air, and wellbeing. Inspired by Westin’s global wellness philosophy, these homes promote a balanced lifestyle through open layouts, natural ventilation, and serene living spaces.",
    img: "/images/westin/highlight2.png",
  },
];

const AMENITIES = [
  { icon: Waves, title: "Infinity Pool", desc: "Resort-style pool with panoramic skyline views over Dwarka Expressway" },
  { icon: Sparkles, title: "Wellness Spa", desc: "Signature Westin wellness & rejuvenation therapies" },
  { icon: Utensils, title: "Fine Dining", desc: "Curated culinary experiences and resident-only dining" },
  { icon: Dumbbell, title: "Fitness Studio", desc: "State-of-the-art equipment with personal training" },
  { icon: Film, title: "Private Theatre", desc: "Luxury screening room exclusively for residents" },
  { icon: Target, title: "Golf Lounge", desc: "Indoor golf simulator & premium lounge area" },  { icon: Baby, title: "Kids Paradise", desc: "Dedicated play & learning zones for children" },
  { icon: Car, title: "Concierge Valet", desc: "24/7 Westin-managed valet & concierge service" },
  { icon: Briefcase, title: "Business Centre", desc: "Professional workspaces and meeting suites" },
  { icon: Leaf, title: "Zen Gardens", desc: "Curated green landscapes for mindful living" },
  { icon: Trophy, title: "Sports Courts", desc: "Tennis, squash & multi-purpose sports facilities" },
  { icon: ConciergeBell, title: "Housekeeping", desc: "Hotel-standard housekeeping on demand" },
];
const GALLERY_IMAGES = [
  { src: "/images/westin/exterior-view.png", label: "Exterior", alt: "Building exterior", wide: true },
  { src: "/images/westin/living-room.png", label: "Living Room", alt: "Luxury living room" },
  { src: "/images/westin/bedroom.png", label: "Bedroom", alt: "Premium bedroom" },
  { src: "/images/westin/washroom.png", label: "Washroom", alt: "Modern washroom" },
  { src: "/images/westin/pool.png", label: "Swimming Pool", alt: "Pool area", wide: true },
  { src: "/images/westin/balcony-view.png", label: "Balcony View", alt: "Balcony view" },
  { src: "/images/westin/outdoor.png", label: "Outdoor", alt: "Outdoor Cabanas" },
  { src: "/images/westin/lobby.png", label: "Lobby", alt: "Grand lobby" },
  { src: "/images/westin/map.png", label: "Location", alt: "Location map" },
];
const CONNECTIVITY = [
  { label: "IGI Airport",          dist: "~20 min" },
  { label: "Cyber City Gurgaon",   dist: "~25 min" },
  { label: "NH-48 Access",         dist: "Direct"  },
  { label: "Delhi Border",         dist: "~10 min" },
  { label: "Diplomatic Enclave",   dist: "~15 min" },
  { label: "Golf Course Road",     dist: "~30 min" },
];

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */


export default function WestinResidencesPage() {
  const [lightbox,  setLightbox]  = useState<number | null>(null);
  const [formData, setFormData] = useState({
  name: "",
  phone: "",
  email: "",
  type: "3BHK",
  source: "westin-landing-page", // 🔥 tracking
});

  const [isMobile, setIsMobile] = useState(false);
 useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check(); // initial check
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

const [loading, setLoading] = useState(false);
const [success, setSuccess] = useState(false);
const [error, setError] = useState("");


  const videoRef = useRef<HTMLVideoElement>(null);

  const handleSubmit = async () => {
  try {
    if (!formData.name || !formData.phone) {
      setError("Please enter name and phone");
      return;
    }

    setLoading(true);
    setError("");

    const res = await fetch("/api/westin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success) {
      setSuccess(true);

      setFormData({
        name: "",
        phone: "",
        email: "",
        type: "3BHK",
        source: "westin-landing-page",
      });

      setTimeout(() => setSuccess(false), 4000);
    } else {
      setError(data.message || "Submission failed");
    }

  } catch (err) {
    setError("Server error");
  } finally {
    setLoading(false);
  }
};

  
  return (
    <div className="westin-page">
      <Navbar />

      {/* ══════════════════════════════════════════
          HERO  (light)
      ══════════════════════════════════════════ */}
 <section
      id="home"
      style={{
        position: "relative",
        height: "100svh",
        overflow: "hidden",
      }}
    >
      {/* 🎬 VIDEO */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
          filter: "brightness(0.75)",
        }}
      >
        <source src="/videos/westin/westin-hero.mp4" type="video/mp4" />
      </video>

      {/* 🔥 OVERLAY */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: isMobile
            ? "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.2), transparent)"
            : "linear-gradient(to right, rgba(0,0,0,0.65) 25%, rgba(0,0,0,0.15) 65%, transparent)",
          zIndex: 1,
        }}
      />

      {/* 🧠 CONTENT */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          alignItems: isMobile ? "center" : "center",
paddingTop: isMobile ? "110px" : "0px",
paddingBottom: isMobile ? "60px" : "0px",


        }}
      >
        <div
          style={{
            maxWidth: isMobile ? "100%" : "520px",
            padding: "0 20px",
            marginLeft: isMobile ? "16px" : "8%",
            marginRight: "16px",
            color: "#fff",
            textAlign: "left",
          }}
        >
          {/* TOP LABEL */}
          <span
            style={{
              fontSize: "10px",
              letterSpacing: "2.5px",
              opacity: 0.7,
            }}
          >
            BY MARRIOTT INTERNATIONAL · WHITELAND
          </span>

          {/* 🔥 HERO TEXT */}
          <h1
            style={{
              fontSize: isMobile ? "40px" : "clamp(34px, 6vw, 72px)",
              lineHeight: isMobile ? 1.15 : 1.05,
              margin: "14px 0",
              fontWeight: 400,
              fontFamily: "'Playfair Display', serif",
              letterSpacing: "-0.5px",
            }}
          >
            <span style={{ fontWeight: 500 }}>Westin</span>
            <br />
            <em
              style={{
                fontStyle: "italic",
                background: "linear-gradient(90deg, #C8A45A, #E6C98B)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Residences
            </em>
          </h1>

          {/* TAGLINE */}
          <p
            style={{
              fontSize: isMobile ? "15px" : "18px",
              margin: "10px 0 18px",
              color: "#e6c98b",
              fontWeight: 300,
            }}
          >
            Crafted for a Life Beyond Ordinary
          </p>

          {/* LOCATION */}
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              opacity: 0.6,
            }}
          >
            Gurugram
          </p>

          {/* 🔥 BUTTONS */}
          <div
            style={{
              marginTop: "22px",
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              justifyContent: "flex-start",
            }}
          >
            <a
              href="#contact"
              style={{
                padding: "12px 22px",
                background: "#C8A45A",
                color: "#000",
                fontSize: "12px",
                textDecoration: "none",
                letterSpacing: "1px",
                borderRadius: "4px",
              }}
            >
              Book Site Visit
            </a>

            <a
              href="#residences"
              style={{
                padding: "12px 22px",
                border: "1px solid #fff",
                fontSize: "12px",
                color: "#fff",
                textDecoration: "none",
                letterSpacing: "1px",
                borderRadius: "4px",
              }}
            >
              Explore
            </a>
          </div>
        </div>
      </div>

      {/* 🔥 FLOATING CARD */}
      {!isMobile && (
        <div
          style={{
            position: "absolute",
            right: "60px",
            bottom: "140px",
            zIndex: 2,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(12px)",
            padding: "20px 24px",
            borderRadius: "12px",
            color: "#fff",
            maxWidth: "240px",
          }}
        >
          <p style={{ fontSize: "11px", opacity: 0.7 }}>STARTING FROM</p>
          <h3 style={{ fontSize: "28px", margin: "6px 0" }}>₹5 Cr*</h3>
          <p style={{ fontSize: "12px", opacity: 0.8 }}>
            3 & 4 BHK Luxury Residences
          </p>
        </div>
      )}

      {/* 📊 STATS */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          zIndex: 2,
          padding: "0 16px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            gap: isMobile ? "14px" : "20px",
            padding: isMobile ? "12px 16px" : "14px 28px",
            borderRadius: "12px",
            background: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(10px)",
            maxWidth: "900px",
            width: "100%",
            textAlign: "center",
          }}
        >
          {STATS.map((s, i) => (
            <div key={i} style={{ color: "#fff" }}>
              <p style={{ fontSize: isMobile ? "16px" : "18px" }}>{s.value}</p>
              <p style={{ fontSize: "11px", opacity: 0.7 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
      {/* ══════════════════════════════════════════
          ABOUT / INTRO  (light)
      ══════════════════════════════════════════ */}
     <section id="residences" className="westin-intro">

  {/* Image column (STICKY) */}
  <div
    style={{
      position: "sticky",   // 🔥 key
      top: "100px",         // adjust based on navbar height
      height: "fit-content",
    }}
  >
    <div className="westin-intro-img-wrap">
      <Image
        src="/images/westin/living-room.png"
        alt="Luxury living room interior"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{ objectFit: "cover", filter: "brightness(1.02) contrast(1.03)" }}
        priority
      />
      <div className="westin-intro-img-caption">Luxury Redefined</div>
    </div>

    {/* Price badge */}
    <div className="westin-price-badge">
      <p className="westin-price-val">₹5Cr+</p>
      <p className="westin-price-lbl">Starting Price</p>
    </div>
  </div>

  {/* Text column (scrolls normally) */}
  <div>
    <span className="westin-section-label">About the Development</span>

    <h2>
      A New Standard of<br /><em>Luxury Living</em>
    </h2>

    <div className="westin-divider" />

    <p>
      Westin Residences Gurugram is India&apos;s first and largest branded residential community -
      managed by Marriott International and set in the prestigious Sector 103, Dwarka Expressway.
    </p>

    <p>
      Experience the seamless blend of world-class hospitality and private residential life.
      Every corner is designed around wellness, light, and elevated comfort.
    </p>

    <div className="westin-specs">
      {[
        ["3 & 4 BHK","Configurations"],
        ["32+ Floors","Tower Height"],
        ["1000+ Units","Total Residences"],
        ["2027","Possession"]
      ].map(([val, lbl]) => (
        <div key={lbl}>
          <p className="westin-spec-val">{val}</p>
          <p className="westin-spec-lbl">{lbl}</p>
        </div>
      ))}
    </div>

    <a href="#contact" className="westin-btn-gold">
      Request Floor Plans
    </a>
  </div>

</section>
      {/* ══════════════════════════════════════════
          WHY WESTIN  (dark)
      ══════════════════════════════════════════ */}
      <section className="westin-why">
  <div className="westin-why-head">
    <span
      className="westin-section-label"
      style={{ textAlign: "center", display: "block" }}
    >
      Why Choose Westin
    </span>
    <h2>
      Crafted for the <em>Discerning Few</em>
    </h2>
  </div>

  <div className="westin-hl-grid">
    {HIGHLIGHTS.map((h, i) => (
      <div
        key={h.no}
        className="westin-hl-card"
        style={{
  flexDirection: !isMobile && i % 2 === 1 ? "row-reverse" : "row",
}}
      >
        {/* Image */}
        <div
          className="westin-hl-img"
          style={{
            direction: "ltr",
            width: "100%",
            minHeight:
              isMobile
                ? "220px"
                : undefined,
          }}
        >
          <Image
            src={h.img}
            alt={h.title}
            fill
            sizes="(max-width: 1000px) 100vw, 50vw"
            style={{
              objectFit: "cover",
              opacity: 0.82,
              filter: "brightness(0.9) contrast(1.05)",
            }}
          />
        </div>

        {/* Body */}
        <div
          className="westin-hl-body"
          style={{
            direction: "ltr",
            padding:
              isMobile
                ? "16px"
                : undefined,
          }}
        >
          <span className="westin-hl-num">{h.no}</span>
          <h3>{h.title}</h3>
          <div className="westin-divider" />
          <p
            style={{
              wordBreak: "break-word", // 🔥 FIX CROPPING
              overflowWrap: "break-word",
            }}
          >
            {h.body}
          </p>
        </div>
      </div>
    ))}
  </div>
</section>

      {/* ══════════════════════════════════════════
          AMENITIES  (dark)
      ══════════════════════════════════════════ */}
     <section
  id="amenities"
  className="westin-amenities"
  style={{
    backgroundImage: "url('/images/westin/clubhouse-bg.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  }}
>
  {/* Overlay */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(to bottom, rgba(45, 45, 45, 0.63), rgba(42, 39, 39, 0.69))",
      zIndex: 1,
    }}
  />

  {/* Content */}
  <div style={{ position: "relative", zIndex: 2 }}>
    <div className="westin-sec-center">
      <span
        className="westin-section-label"
        style={{ textAlign: "center", display: "block" }}
      >
        World-Class Amenities
      </span>

      <h2>
        1.75 Lakh Sq.Ft. <em>Clubhouse</em>
      </h2>

      <p>
        India&apos;s largest residential clubhouse — a curated ecosystem of
        wellness, leisure, and luxury exclusively for residents.
      </p>
    </div>

    <div className="westin-am-grid">
      {AMENITIES.map((a) => {
        const Icon = a.icon;
        return (
          <div key={a.title} className="westin-am-card">
            <div className="westin-am-icon">
              <Icon size={26} strokeWidth={1.5} />
            </div>
            <h4 className="westin-am-title">{a.title}</h4>
            <p className="westin-am-desc">{a.desc}</p>
          </div>
        );
      })}
    </div>
  </div>
</section>

      {/* ══════════════════════════════════════════
          GALLERY  (dark)
      ══════════════════════════════════════════ */}
      <section id="gallery" className="westin-gallery">
      <div className="westin-sec-center">
        <span className="westin-section-label">Visual Tour</span>
        <h2>A Glimpse of <em>Refined Living</em></h2>
      </div>

      {/* GRID */}
      <div className="westin-gal-grid">
        {GALLERY_IMAGES.map((g, i) => (
          <div
            key={i}
            className="westin-gal-item"
            style={{
              gridColumn: g.wide ? "span 2" : "span 1",
              aspectRatio: g.wide ? "16/9" : "4/3",
            }}
            onClick={() => setLightbox(i)}
          >
            <Image src={g.src} alt={g.alt} fill style={{ objectFit: "cover" }} />
            <div className="westin-overlay" />
            <p className="westin-gal-label">{g.label}</p>
          </div>
        ))}
      </div>

      {/* LIGHTBOX SLIDER */}
     {lightbox !== null && (
  <div
    onClick={() => setLightbox(null)}
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {/* 🔥 BLUR BACKGROUND */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
      }}
    >
      <Image
        src={GALLERY_IMAGES[lightbox].src}
        alt=""
        fill
        style={{
          objectFit: "cover",
          filter: "blur(40px) brightness(0.4)",
          transform: "scale(1.2)",
        }}
      />
    </div>

    {/* 🔥 MAIN SLIDER */}
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        position: "relative",
        width: "90%",
        height: "85%",
        zIndex: 2,
        borderRadius: "18px",
        overflow: "hidden",
      }}
    >
      <Swiper
        modules={[Navigation, Keyboard]}
        navigation
        keyboard={{ enabled: true }}
        initialSlide={lightbox}
        loop
      >
        {GALLERY_IMAGES.map((img, i) => (
          <SwiperSlide key={i}>
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
              }}
            >
              {/* 🔥 MAIN IMAGE */}
              <Image
                src={img.src}
                alt={img.alt}
                fill
                style={{
                  objectFit: "cover", // ✅ NO BLACK SPACE
                }}
              />

              {/* 🔥 GRADIENT OVERLAY */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.1), transparent)",
                }}
              />

              {/* 🔥 LABEL */}
              <p
                style={{
                  position: "absolute",
                  bottom: "30px",
                  left: "30px",
                  color: "#fff",
                  fontSize: "22px",
                  fontWeight: 500,
                }}
              >
                {img.label}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

    {/* 🔥 CLOSE BUTTON */}
    <button
      onClick={() => setLightbox(null)}
      style={{
        position: "absolute",
        top: "30px",
        right: "40px",
        zIndex: 3,
        fontSize: "26px",
        color: "#fff",
        background: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(10px)",
        borderRadius: "50%",
        padding: "10px 14px",
        border: "none",
        cursor: "pointer",
      }}
    >
      ✕
    </button>
  </div>
)}
    </section>

      {/* ══════════════════════════════════════════
          VIDEO / LIFESTYLE STRIP  (dark)
      ══════════════════════════════════════════ */}
      <section
  className="westin-strip"
  style={{
    position: "relative",
    overflow: "hidden",
  }}
>
  {/* 🔥 BACKGROUND IMAGE (fallback) */}
  <div className="westin-strip-bg" />

  {/* 🎬 VIDEO (ADDED PROPERLY) */}
  <video
    autoPlay
    muted
    loop
    playsInline
    preload="none"
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      zIndex: 0,
      opacity: 0.5, // 🔥 important (keeps text premium)
    }}
  >
    <source src="/videos/westin/westin-lifestyle.mp4" type="video/mp4" />
  </video>

  {/* 🔥 OVERLAY (keep your class but ensure above video) */}
  <div
    className="westin-strip-ov"
    style={{
      position: "absolute",
      inset: 0,
      zIndex: 1,
      background:
        "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.85))",
    }}
  />

  {/* 🧠 CONTENT (UNCHANGED STYLE, just ensure zIndex) */}
  <div
    className="westin-strip-content"
    style={{
      position: "relative",
      zIndex: 2,
    }}
  >
    <span
      className="westin-section-label"
      style={{ textAlign: "center", display: "block" }}
    >
      The Westin Promise
    </span>

    <h2>
      <em>This isn&apos;t</em> just where you live.<br />
      It&apos;s how you live.
    </h2>

    <a href="#contact" className="westin-btn-outline-light">
      Experience It Yourself
    </a>
  </div>
</section>
      {/* ══════════════════════════════════════════
          LOCATION  (light)
      ══════════════════════════════════════════ */}
      <section id="location" className="westin-location">
        <div className="westin-loc-inner">

          {/* Text */}
          <div>
            <span className="westin-section-label">Prime Location</span>
            <h2>
              Sector 103,<br /><em>Dwarka Expressway</em>
            </h2>
            <div className="westin-divider" />
            <p style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 200,
              fontSize: 14,
              color: "var(--w-text-lmid)",
              lineHeight: 1.9,
              marginBottom: 28,
            }}>
              Strategically located at the heart of Gurugram&apos;s fastest-growing corridor -
              seamlessly connected to Delhi, IGI Airport, and all major business hubs.
            </p>

            {CONNECTIVITY.map((c) => (
              <div key={c.label} className="westin-conn-row">
                <span className="westin-conn-lbl">{c.label}</span>
                <span className="westin-conn-dist">{c.dist}</span>
              </div>
            ))}

            <div style={{ marginTop: 36 }}>
              <a
                href="https://maps.google.com/?q=Sector+103+Gurugram"
                target="_blank"
                rel="noopener noreferrer"
                className="westin-btn-outline-dark"
              >
                View on Google Maps
              </a>
            </div>
          </div>

          {/* Map visual */}
          <div className="westin-map-box">
           <Image
  src="/images/westin/map.png"
              alt="Sector 103 Gurugram aerial view"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover", filter: "brightness(0.9) saturate(0.65)" }}
            />
            <div className="westin-map-ov" />
            <div className="westin-map-pin">
           
              <p>Sector 103, Gurugram</p>
              <span>Dwarka Expressway</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONTACT / ENQUIRY  (dark)
      ══════════════════════════════════════════ */}
   <section
  id="contact"
  className="westin-contact"
  style={{
    position: "relative",
    overflow: "hidden",
  }}
>
  {/* 🔥 BACKGROUND IMAGE */}
  <img
    src="/images/westin/contact-bg.png"
    alt="Luxury background"
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      zIndex: 0,
    }}
  />

  {/* 🔥 DARK OVERLAY */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: "rgba(0, 0, 0, 0.8)",
      zIndex: 1,
    }}
  />

  {/* 🧠 CONTENT */}
  <div style={{ position: "relative", zIndex: 2 }}>
    
    <span
      className="westin-section-label"
      style={{ textAlign: "center", display: "block" }}
    >
      Private Enquiry
    </span>

    <h2>
      Begin Your Journey<br /><em>to Elevated Living</em>
    </h2>

    <div className="westin-divider westin-divider-c" />

    <p className="westin-contact-desc">
      Book a private site visit and experience Westin Residences Gurugram firsthand.
      Our advisors are ready to curate a personalised tour.
    </p>

    <div className="westin-form-box">

      {/* ✅ SUCCESS MESSAGE */}
      {success && (
        <div
          style={{
            background: "rgba(200,164,90,0.1)",
            border: "1px solid rgba(200,164,90,0.4)",
            color: "#C8A45A",
            padding: "12px",
            marginBottom: "15px",
            textAlign: "center",
            fontSize: "12px",
            letterSpacing: "0.5px",
          }}
        >
          ✓ Your request has been received. Our advisor will contact you shortly.
        </div>
      )}

      {/* ❌ ERROR MESSAGE */}
      {error && (
        <p style={{ color: "#ff4d4f", fontSize: 12, marginBottom: 10 }}>
          {error}
        </p>
      )}

      <div className="westin-form-row">
        <div className="westin-field">
          <input
            className="westin-lux-input"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
        </div>

        <div className="westin-field">
          <input
            className="westin-lux-input"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </div>
      </div>

      <div className="westin-field">
        <input
          className="westin-lux-input"
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />
      </div>

      <div className="westin-field" style={{ marginBottom: 40 }}>
        <select
          className="westin-lux-input"
          value={formData.type}
          onChange={(e) =>
            setFormData({ ...formData, type: e.target.value })
          }
        >
          <option value="3BHK">3 BHK Apartment</option>
          <option value="4BHK">4 BHK Apartment</option>
          <option value="penthouse">Penthouse</option>
          <option value="info">General Information</option>
        </select>
      </div>

      <button
        className="westin-btn-gold"
        onClick={handleSubmit}
        disabled={loading}
        style={{
          width: "100%",
          textAlign: "center",
          fontSize: 11,
          opacity: loading ? 0.7 : 1,
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Processing..." : "Book a Private Site Visit"}
      </button>
    </div>

    <p className="westin-phone-note">
      OR CALL DIRECTLY ·{" "}
      <a href="tel:+919811422554">+91 98114 22554</a>
    </p>

  </div>
</section>
      <Footer />
    </div>
  );
}
