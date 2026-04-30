"use client";
import { useEffect, useState, useRef } from "react";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import React from "react";
import {
  Landmark,
  Building2,
  Waves,
  Dumbbell,
  Trees,
  ConciergeBell,
 
} from "lucide-react";


const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const amenityImages = [
  {
    title: "Outdoor Fitness Area",
    desc: "A workout space built beyond walls.",
    image: "/images/lambo/amenities/outdoor-fitness.jpg",
  },
  {
    title: "Poolside Area",
    desc: "Your place to unwind after a long day.",
    image: "/images/lambo/amenities/pool.jpg",
  },
  {
    title: "Cricket Practice Nets",
    desc: "A place to train technique and flow.",
    image: "/images/lambo/amenities/cricket.jpg",
  },
  {
    title: "Kids Play Area",
    desc: "A safe corner for your young ones.",
    image: "/images/lambo/amenities/kids.jpg",
  },
  {
    title: "Jogging Track",
    desc: "A circuit to start your morning routine.",
    image: "/images/lambo/amenities/jogging.jpg",
  },
  {
    title: "Bicycle Track",
    desc: "A track to train your rhythm.",
    image: "/images/lambo/amenities/cycle.jpg",
  },
  {
    title: "Club House",
    desc: "A 50,000 sq.ft. destination for lifestyle.",
    image: "/images/lambo/amenities/clubhouse.jpg",
  },
  {
    title: "Reception Lobby",
    desc: "An arrival defined by Italian elegance.",
    image: "/images/lambo/amenities/lobby.jpg",
  },
  {
    title: "Coffee Cafe",
    desc: "Moments brewed in refined indulgence.",
    image: "/images/lambo/amenities/cafe.jpg",
  },
  {
    title: "Banquet",
    desc: "A grand venue for special occasions.",
    image: "/images/lambo/amenities/banquet.jpg",
  },
  {
    title: "Kitchen",
    desc: "Where culinary artistry comes alive.",
    image: "/images/lambo/amenities/kitchen.jpg",
  },
  {
    title: "Yoga & Gym",
    desc: "Modern facilities for fitness and mindfulness.",
    image: "/images/lambo/amenities/gym.jpg",
  },
  {
    title: "Spa & Sauna",
    desc: "A sanctuary of serene rejuvenation.",
    image: "/images/lambo/amenities/spa.jpg",
  },
  {
    title: "Salon",
    desc: "A destination for indulgence and care.",
    image: "/images/lambo/amenities/salon.jpg",
  },
  {
    title: "Gaming Arcade",
    desc: "Immersive experiences for leisure.",
    image: "/images/lambo/amenities/gaming.jpg",
  },
];
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8 },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8 },
  },
};
const styles: Record<string, React.CSSProperties> = {
  root: {
    fontFamily: "var(--font-georama)",
    background: "#0a0a0a",
    color: "#f0ece4",
    minHeight: "100vh",
    overflowX: "hidden",
    cursor: "default",
  },

  // HERO
  hero: {
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    background: "linear-gradient(160deg, #0a0a0a 0%, #1a0505 50%, #0a0a0a 100%)",
  },
 
  heroGlow: {
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "600px",
    height: "600px",
    background: "radial-gradient(circle, rgba(180,0,0,0.18) 0%, transparent 70%)",
    zIndex: 0,
    borderRadius: "50%",
  },
  heroContent: {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
    padding: "0 24px",
    maxWidth: "900px",
  },
  eyebrow: {
    letterSpacing: "0.4em",
    fontSize: "11px",
    color: "#b40000",
    textTransform: "uppercase" as const,
    marginBottom: "32px",
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 500,
  },
  heroTitle: {
    fontSize: "clamp(42px, 8vw, 100px)",
    fontWeight: 300,
    lineHeight: 1,
    letterSpacing: "-0.02em",
    marginBottom: "8px",
    color: "#f5f0e8",
  },
  heroTitleBold: {
    fontWeight: 700,
    color: "#c40000",
    fontStyle: "italic",
  },
  heroSub: {
    fontSize: "clamp(16px, 2.5vw, 26px)",
    fontWeight: 300,
    letterSpacing: "0.15em",
    color: "#a89880",
    marginBottom: "48px",
    marginTop: "16px",
  },
  dividerLine: {
    width: "80px",
    height: "1px",
    background: "linear-gradient(90deg, transparent, #b40000, transparent)",
    margin: "0 auto 48px",
  },
  heroCta: {
    display: "inline-flex",
    gap: "16px",
    flexWrap: "wrap" as const,
    justifyContent: "center",
  },
  btnPrimary: {
    background: "linear-gradient(135deg, #b40000, #7a0000)",
    color: "#f5f0e8",
    border: "none",
    padding: "16px 40px",
    fontSize: "12px",
    letterSpacing: "0.3em",
    textTransform: "uppercase" as const,
    cursor: "pointer",
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 600,
    clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
    transition: "all 0.3s ease",
  },
  btnSecondary: {
    background: "transparent",
    color: "#f5f0e8",
    border: "1px solid rgba(180,0,0,0.5)",
    padding: "16px 40px",
    fontSize: "12px",
    letterSpacing: "0.3em",
    textTransform: "uppercase" as const,
    cursor: "pointer",
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 500,
    clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
    transition: "all 0.3s ease",
  },
  scrollIndicator: {
    position: "absolute",
    bottom: "40px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "8px",
    color: "rgba(180,0,0,0.6)",
    fontSize: "10px",
    letterSpacing: "0.3em",
    fontFamily: "'Montserrat', sans-serif",
    zIndex: 2,
  },

  heroVideo: {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  zIndex: 0,
  opacity: 1, // keeps your gradient aesthetic alive
},

heroOverlay: {
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(160deg, rgba(10,10,10,0.85) 0%, rgba(26, 5, 5, 0.65) 50%, rgba(10,10,10,0.95) 100%)",
  zIndex: 1,
},


heroFlex: {
  position: "relative",
  zIndex: 3,
  display: "grid",
  gridTemplateColumns: "1.2fr 0.8fr",
  gap: "40px",
  alignItems: "center",
  width: "100%",
  maxWidth: "1200px",
  padding: "0 40px",
},

heroLeft: {
  textAlign: "left",
},

heroFormBox: {
  background: "rgba(10,10,10,0.7)",
  border: "1px solid rgba(180,0,0,0.25)",
  backdropFilter: "blur(12px)",
  padding: "32px",
  borderRadius: "6px",
},

heroFormInner: {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
},

heroFormTitle: {
  fontSize: "18px",
  color: "#f5f0e8",
  marginBottom: "8px",
  letterSpacing: "0.1em",
  fontFamily: "Montserrat, sans-serif",
},

heroInput: {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(180,0,0,0.2)",
  padding: "14px",
  color: "#fff",
  outline: "none",
},

heroSelect: {
  background: "#140303",
  border: "1px solid rgba(180,0,0,0.2)",
  padding: "14px",
  color: "#aaa",
},

heroSubmit: {
  background: "linear-gradient(135deg, #b40000, #7a0000)",
  border: "none",
  padding: "14px",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",
  letterSpacing: "0.2em",
  marginTop: "8px",
},

heroFormNote: {
  fontSize: "11px",
  color: "#888",
  textAlign: "center",
},



  // NAV
  nav: {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 100,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 16px", // 🔥 reduce padding on mobile
  background: "linear-gradient(180deg, rgba(10,10,10,0.95) 0%, transparent 100%)",
},
  navLogo: {
    display: "flex",
    flexDirection: "column" as const,
    lineHeight: 1,
  },
  navLogoMain: {
    fontSize: "20px",
    fontWeight: 700,
    letterSpacing: "0.1em",
    color: "#f5f0e8",
    fontFamily: "var(--font-georama)",
  },
  navLogoSub: {
    fontSize: "9px",
    letterSpacing: "0.4em",
    color: "#b40000",
    textTransform: "uppercase" as const,
    fontFamily: "var(--font-kanit)",
  },
  navLinks: {
    display: "flex",
    gap: "32px",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  navLink: {
    fontSize: "12px",
    letterSpacing: "0.3em",
    
    color: "#f9f9f9",
    cursor: "pointer",
    fontFamily: "var(--font-kanit)",
    fontWeight: 600,
    transition: "color 0.2s",
  },
  navCta: {
    background: "#b40000",
    color: "#fff",
    border: "none",
    padding: "10px 24px",
    fontSize: "10px",
    letterSpacing: "0.3em",
    textTransform: "uppercase" as const,
    cursor: "pointer",
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 600,
  },

  // SECTION
  section: {
    padding: "100px 40px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  sectionLabel: {
    fontSize: "10px",
    letterSpacing: "0.5em",
    color: " #eceaea",
    textTransform: "uppercase" as const,
    fontFamily: "'Montserrat', sans-serif",
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  sectionLabelLine: {
    width: "40px",
    height: "1px",
    background: "#b40000",
  },
  sectionTitle: {
    fontSize: "clamp(24px, 2.8vw, 36px)",
    fontWeight: 300,
    lineHeight: 1.1,
    marginBottom: "24px",
    color: "#f5f0e8",
  },
  sectionTitleAccent: {
    color: "#c40000",
    fontStyle: "italic",
    fontWeight: 700,
  },
  sectionBody: {
    fontSize: "14px",
    lineHeight: 1.8,
    color: "#ededed",
    maxWidth: "660px",
    fontWeight: 300,
  },

  // STATS BAR
  statsBar: {
    background: "linear-gradient(135deg, #1a0505 0%, #0f0f0f 100%)",
    borderTop: "1px solid rgba(180,0,0,0.2)",
    borderBottom: "1px solid rgba(180,0,0,0.2)",
    padding: "48px 40px",
  },
  statsGrid: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "1px",
    background: "rgba(180,0,0,0.15)",
  },
  statItem: {
    padding: "32px",
    textAlign: "center" as const,
    background: "#0a0a0a",
  },
  statNumber: {
    fontSize: "clamp(40px, 5vw, 64px)",
    fontWeight: 300,
    color: "#c40000",
    lineHeight: 1,
    marginBottom: "8px",
    fontStyle: "italic",
  },
  statLabel: {
    fontSize: "10px",
    letterSpacing: "0.3em",
    color: "#a89880",
    textTransform: "uppercase" as const,
    fontFamily: "'Montserrat', sans-serif",
  },

  // APARTMENTS
  aptsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "2px",
    marginTop: "60px",
    background: "rgba(180,0,0,0.1)",
  },
 aptCard: {
  background: "#0f0804",
  padding: "40px 32px",
  borderBottom: "2px solid transparent",
  transition: "all 0.4s ease",
  position: "relative" as const,
  overflow: "hidden",
  backgroundSize: "cover",
  backgroundPosition: "center",
  color: "#fff",
},
aptOverlay: {
  position: "absolute" as const,
  inset: 0,
  background:
    "linear-gradient(to top, rgba(15,8,4,0.95), rgba(15,8,4,0.4))",
  zIndex: 1,
},
aptContent: {
  position: "relative" as const,
  padding: "22px",
  zIndex: 2,
},

  aptCardAccent: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    height: "2px",
    background: "linear-gradient(90deg, #b40000, #ff2200)",
  },
  aptType: {
    fontSize: "11px",
    letterSpacing: "0.4em",
    color: "#b40000",
    textTransform: "uppercase" as const,
    fontFamily: "'Montserrat', sans-serif",
    marginBottom: "16px",
  },
  aptSize: {
    fontSize: "clamp(24px, 2.5vw, 32px)",
    fontWeight: 300,
    color: "#f5f0e8",
    lineHeight: 1,
    marginBottom: "4px",
  },
  aptSizeUnit: {
    fontSize: "16px",
    color: "#a89880",
    marginLeft: "4px",
  },
  aptPrice: {
    fontSize: "20px",
    color: "#c40000",
    fontWeight: 600,
    margin: "16px 0 20px",
    fontFamily: "'Montserrat', sans-serif",
  },
  aptFeature: {
    fontSize: "13px",
    color: "#a89880",
    padding: "6px 0",
    borderBottom: "1px solid rgba(180,0,0,0.1)",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  aptFeatureDot: {
    width: "4px",
    height: "4px",
    background: "#b40000",
    flexShrink: 0,
  },

    // AMENITIES SECTION
amenitiesSection: {
  position: "relative",
  background: "#f8f6f2",
  padding: "120px 40px",
  overflow: "hidden",
},

amenitiesGrid: {
  maxWidth: "1200px",
  margin: "60px auto 0",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "28px",
},
amenityCard: {
  border: "1px solid rgba(255,255,255,0.35)",
  padding: "36px",
  background: "rgba(255, 255, 255, 0.33)", // 🔥 transparent glass
  backdropFilter: "blur(1px)",
  WebkitBackdropFilter: "blur(12px)",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
  position: "relative",
  overflow: "hidden",
},
amenityIconWrap: {
  display: "flex",              // 🔥 use flex (not inline-flex)
  alignItems: "center",
  justifyContent: "center",
  width: "56px",
  height: "56px",
  borderRadius: "50%",
  background: "rgba(180,0,0,0.06)",
  margin: "0 auto 20px",        // 🔥 THIS centers the whole icon block
},
amenityTitle: {
  fontSize: "18px",
  fontWeight: 600,
  color: "#1a1a1a",
  marginBottom: "6px",
  letterSpacing: "0.04em",
},

amenityDesc: {
  fontSize: "13px",
  color: "#5a5a5a",
  lineHeight: 1.7,
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 300,
},
  // LOCATION
  locationSection: {
    padding: "100px 40px",
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "80px",
    alignItems: "center",
  },
  locationList: {
    listStyle: "none",
    margin: "32px 0 0",
    padding: 0,
    display: "flex",
    flexDirection: "column" as const,
    gap: "2px",
  },
  locationItem: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "14px 20px",
    background: "rgba(180,0,0,0.04)",
    borderLeft: "2px solid rgba(180,0,0,0.3)",
    fontSize: "14px",
    color: "#c8b89a",
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 300,
  },
  locationMapBox: {
    background: "linear-gradient(135deg, #150505, #0f0f0f)",
    border: "1px solid rgba(180,0,0,0.2)",
    height: "420px",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    position: "relative" as const,
    overflow: "hidden",
  },
  mapPulse: {
    width: "12px",
    height: "12px",
    background: "#b40000",
    borderRadius: "50%",
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "0 0 0 20px rgba(180,0,0,0.1), 0 0 0 40px rgba(180,0,0,0.05)",
  },
  mapLabel: {
    position: "absolute" as const,
    bottom: "32px",
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: "11px",
    letterSpacing: "0.3em",
    color: "#b40000",
    fontFamily: "'Montserrat', sans-serif",
    textTransform: "uppercase" as const,
    whiteSpace: "nowrap" as const,
  },

  // COLLAB
  collabSection: {
    background: "#0f0404",
    padding: "80px 40px",
    borderTop: "1px solid rgba(180,0,0,0.15)",
    borderBottom: "1px solid rgba(180,0,0,0.15)",
  },
  collabInner: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 1px 1fr",
    gap: "64px",
    alignItems: "center",
  },
  collabDivider: {
    background: "linear-gradient(180deg, transparent, #b40000, transparent)",
    alignSelf: "stretch",
  },
  collabBrand: {
    textAlign: "center" as const,
  },
  collabBrandName: {
    fontSize: "clamp(24px, 4vw, 42px)",
    fontWeight: 700,
    fontStyle: "italic",
    letterSpacing: "0.05em",
  },
  collabBrandSub: {
    fontSize: "11px",
    letterSpacing: "0.4em",
    color: "#a89880",
    textTransform: "uppercase" as const,
    fontFamily: "'Montserrat', sans-serif",
    marginTop: "8px",
  },

  // FORM
  formSection: {
    background: "linear-gradient(180deg, #0a0a0a 0%, #1a0505 50%, #0a0a0a 100%)",
    padding: "100px 40px",
    position: "relative" as const,
    overflow: "hidden",
  },
  formGlow: {
    position: "absolute" as const,
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "800px",
    height: "400px",
    background: "radial-gradient(ellipse at bottom, rgba(180,0,0,0.15) 0%, transparent 70%)",
    zIndex: 0,
  },
  formInner: {
    maxWidth: "680px",
    margin: "0 auto",
    position: "relative" as const,
    zIndex: 1,
  },
  formTitle: {
    textAlign: "center" as const,
    fontSize: "clamp(32px, 5vw, 56px)",
    fontWeight: 300,
    marginBottom: "48px",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    marginBottom: "16px",
  },
  formInput: {
  padding: "12px 14px",
  fontSize: "13px",
  fontWeight: 300,
  color: "#f5f0e8",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "6px",
  outline: "none",
},
  formSelect: {
  padding: "12px 14px",
  fontSize: "13px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "#f5f0e8",
},
  formSubmit: {
    width: "100%",
    background: "linear-gradient(135deg, #b40000, #7a0000)",
    color: "#fff",
    border: "none",
    padding: "20px",
    fontSize: "12px",
    letterSpacing: "0.4em",
    textTransform: "uppercase" as const,
    cursor: "pointer",
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 700,
    marginTop: "8px",
    transition: "opacity 0.3s",
    clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
  },
  formNote: {
    textAlign: "center" as const,
    fontSize: "11px",
    color: "rgba(168,152,128,0.6)",
    marginTop: "16px",
    fontFamily: "'Montserrat', sans-serif",
    letterSpacing: "0.1em",
  },

  

  // FOOTER
  footer: {
    background: "#050505",
    borderTop: "1px solid rgba(180,0,0,0.2)",
    padding: "60px 40px 32px",
  },
  footerInner: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  footerTop: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr",
    gap: "64px",
    marginBottom: "48px",
    paddingBottom: "48px",
    borderBottom: "1px solid rgba(180,0,0,0.1)",
  },
  footerBrand: {
    fontSize: "28px",
    fontWeight: 700,
    fontStyle: "italic",
    color: "#f5f0e8",
    marginBottom: "12px",
  },
  footerBrandSub: {
    fontSize: "10px",
    letterSpacing: "0.4em",
    color: "#b40000",
    textTransform: "uppercase" as const,
    fontFamily: "'Montserrat', sans-serif",
    marginBottom: "16px",
  },
  footerBody: {
    fontSize: "13px",
    color: "#7a6a5a",
    lineHeight: 1.7,
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 300,
  },
  footerHeading: {
    fontSize: "11px",
    letterSpacing: "0.3em",
    color: "#b40000",
    textTransform: "uppercase" as const,
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 600,
    marginBottom: "20px",
  },
  footerLinks: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
  },
  footerLink: {
    fontSize: "13px",
    color: "#7a6a5a",
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 300,
    cursor: "pointer",
  },
  footerMarketer: {
    textAlign: "center" as const,
    fontSize: "12px",
    color: "#4a3a2a",
    fontFamily: "'Montserrat', sans-serif",
    letterSpacing: "0.2em",
    marginTop: "16px",
  },
  footerMarketerName: {
    color: "#C8A45A",
    fontWeight: 600,
  },

  // DISCLAIMER
  disclaimer: {
    background: "#030303",
    padding: "24px 40px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  disclaimerText: {
    fontSize: "10px",
    color: "#4a3a2a",
    fontFamily: "'Montserrat', sans-serif",
    lineHeight: 1.7,
    letterSpacing: "0.05em",
  },

  // TAG
  tag: {
    display: "inline-block",
    padding: "4px 12px",
    background: "rgba(180,0,0,0.15)",
    border: "1px solid rgba(180,0,0,0.3)",
    fontSize: "10px",
    letterSpacing: "0.3em",
    color: "#ebdfdf",
    textTransform: "uppercase" as const,
    fontFamily: "'Montserrat', sans-serif",
    marginBottom: "24px",
  },

  // WHY INVEST
  reasonsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
    marginTop: "60px",
    background: "rgba(180, 0, 0, 0)",
  },
  reasonCard: {
  background: "rgba(10,10,10,0.55)", // semi-transparent
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  padding: "36px 32px",
  display: "flex",
  gap: "20px",
  alignItems: "flex-start",
  border: "1px solid rgba(180,0,0,0.15)",
  transition: "all 0.4s ease",
  
},

  reasonNum: {
    fontSize: "48px",
    fontWeight: 300,
    color: "rgba(180,0,0,0.2)",
    lineHeight: 1,
    fontStyle: "italic",
    flexShrink: 0,
    minWidth: "52px",
  },
  reasonTitle: {
    fontSize: "17px",
    fontWeight: 600,
    color: "#f5f0e8",
    marginBottom: "8px",
    letterSpacing: "0.03em",
  },
  reasonBody: {
    fontSize: "13px",
    color: "#7a6a5a",
    lineHeight: 1.7,
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 300,
  },

  // COLLAB X
  xSymbol: {
    fontSize: "40px",
    color: "rgba(180,0,0,0.4)",
    fontWeight: 300,
    textAlign: "center" as const,
  },
};

const amenities = [
  {
    icon: <Landmark size={26} strokeWidth={1.5} color="#b40000" />,
    title: "Grand Lamborghini Lobby",
    desc: "An entrance of Italian marble. Lamborghini design.",
    image: "/images/lambo/amenities/lobby.jpg",
  },
  {
    icon: <Building2 size={26} strokeWidth={1.5} color="#b40000" />,
    title: "Ultra-Luxury Clubhouse",
    desc: "A members-only retreat for refined living.",
    image: "/images/lambo/amenities/clubhouse.jpg",
  },
  {
    icon: <Waves size={26} strokeWidth={1.5} color="#b40000" />,
    title: "Resort-Style Pool Deck",
    desc: "Infinity-edge pool with cabanas and skyline views.",
    image: "/images/lambo/amenities/pool.jpg",
  },
  {
    icon: <Dumbbell size={26} strokeWidth={1.5} color="#b40000" />,
    title: "Performance Fitness Centre",
    desc: "World-class gym with training zones and wellness spaces.",
    image: "/images/lambo/amenities/gym.jpg",
  },
  {
    icon: <Trees size={26} strokeWidth={1.5} color="#b40000" />,
    title: "Curated Landscaped Gardens",
    desc: "Green terraces with Italian-inspired outdoor design.",
    image: "/images/lambo/amenities/garden.jpg",
  },
  {
    icon: <ConciergeBell size={26} strokeWidth={1.5} color="#b40000" />,
    title: "Concierge & Smart Services",
    desc: "24/7 concierge, smart home tech, and valet services.",
    image: "/images/lambo/amenities/concierge.jpg",
  },
];
const locationPoints = [
  { text: "Golf Course Ext. · 5m" },
  { text: "Cyber City · 20m" },
  { text: "Airport · 35m" },
  { text: "NH-48 · Direct" },
];
const reasons = [
  {
    title: "Prime Location",
    body: "Located in Gurugram’s high-growth corridor.",
  },
  {
    title: "Limited Inventory",
    body: "Low supply ensures long-term value.",
  },
  {
    title: "Strong Appreciation",
    body: "Consistent price growth in premium segment.",
  },
  {
    title: "Luxury Demand",
    body: "High interest from global buyers.",
  },
];
export default function LamborghiniClient() {


const [errors, setErrors] = useState({
  name: "",
  phone: "",
});

  const validateForm = () => {
  const newErrors: any = {};

  if (!formData.name.trim()) {
    newErrors.name = "Please enter your name";
  }

  if (!formData.phone.trim()) {
    newErrors.phone = "Please enter your phone number";
  } else if (!/^\d{10}$/.test(formData.phone)) {
    newErrors.phone = "Enter a valid 10-digit number";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  const slides = amenityImages || [];
  const total = slides.length;

  React.useEffect(() => {
    if (!total || paused) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 4500);

    return () => clearInterval(interval);
  }, [paused, total]);

  if (!total) return null;





useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 60);
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

const [hovered, setHovered] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", config: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

const [loading, setLoading] = useState(false);
  useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 60);
  };


  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  const handleSubmit = async (e: React.MouseEvent) => {
  e.preventDefault();

if (!validateForm()) return;

  setLoading(true);

  try {
    const res = await fetch("/api/lambo", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: formData.name,
    phone: formData.phone,
    email: formData.email || "",
    configuration: formData.config || "",
    message: formData.message || "", 
  }),
});

    console.log("STATUS:", res.status);

    const data = await res.text();
    console.log("RESPONSE:", data);

    if (res.ok) {
      setSubmitted(true);
    } else {
      console.error("API error:", res.status);
    }
  } catch (err) {
    console.error("FULL ERROR:", err);
    alert("Network error — check console");
  } finally {
    setLoading(false);
  }
};


  return (
    
    <div style={styles.root}>
  

     {/* NAV */}
<nav
  style={{
    ...styles.nav,
    background: mounted && scrolled
      ? "rgba(10,10,10,0.95)"
      : "transparent",
    backdropFilter: mounted && scrolled
      ? "blur(6px)"
      : "none",
    transition: "all 0.3s ease",
  }}
>
  {/* LOGO */}
  <div
    style={{ cursor: "pointer" }}
    onClick={() => {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}}
  >
    <div style={styles.navLogo}>
      <Image
        src="/images/lambo/logo.png"
        alt="Lamborghini"
        width={180}
        height={50}
        style={{
          height: "40px",
          width: "auto",
        }}
        priority
      />
    </div>
  </div>

  {/* NAV LINKS (HIDE ON MOBILE) */}
  <ul style={styles.navLinks} className="nav-links">
      {[
        { label: "Overview", id: "overview" },
        { label: "Amenities", id: "amenities" },
        { label: "Location", id: "location" },
      ].map((l) => (
        <li key={l.label}>
  <a
    href={`#${l.id}`}
    onMouseEnter={() => setHovered(l.label)}
    onMouseLeave={() => setHovered(null)}
    style={{
      ...styles.navLink,
      textDecoration: "none",
      position: "relative",
      paddingBottom: "4px",
    }}
  >
    {l.label}

    {/* UNDERLINE */}
    <span
      style={{
        position: "absolute",
        left: 0,
        bottom: 0,
        height: "1.5px",
        width: hovered === l.label ? "100%" : "0%",
        background: "#fff",
        transition: "width 0.3s ease",
      }}
    />
  </a>
</li>
      ))}
    </ul>

  {/* CTA BUTTON (ALWAYS VISIBLE — MOBILE PRIORITY) */}
 <a
  href="tel:+919811422554"
  style={{
    ...styles.navCta,
    textDecoration: "none",
    borderRadius: "4px",
    whiteSpace: "nowrap",
    flexShrink: 0,
    padding: "clamp(6px, 2vw, 10px) clamp(10px, 3vw, 20px)",
    fontSize: "clamp(11px, 1.5vw, 14px)",
  }}
>
  <span className="desktop-text">+91 98114 22554</span>
  <span className="mobile-text">CALL NOW</span>
</a>
</nav>

{/* HERO */}
<section
  style={{
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  }}
>


  <div
  style={{
    position: "absolute",
    inset: 0,
    background: "#0a0a0a",
    zIndex: 0,
  }}
/>
  {/* IMAGE */}
<Image
  src="/images/lambo/lamborghini-hero.png"
  alt="Lamborghini Residences Gurgaon"
  fill
  priority
  style={{
    objectFit: "cover",
    zIndex: 0,
    filter: "brightness(0.88)",
    opacity: mounted ? 1 : 0,
  }}
/>

  {/* OVERLAY */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.65))",
      zIndex: 1,
    }}
  />

  {/* CONTENT */}
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.25, // 🔥 smooth sequence
        },
      },
    }}
    style={{
      position: "relative",
      zIndex: 2,
      textAlign: "center",
      maxWidth: "900px",
      padding: "0 20px",
    }}
  >
    {/* EYEBROW */}
   <motion.p
  variants={{
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }}
  transition={{ duration: 0.6 }}
  style={{
    fontSize: "11px",
    letterSpacing: "0.18em",
    color: "rgba(255,255,255,0.65)",
    marginBottom: "22px",
    fontFamily: "Montserrat, sans-serif",
  }}
>
  PRIVATE RESIDENCES · GURUGRAM
</motion.p>

    {/* HEADLINE */}
   <motion.h1
  variants={{
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  }}
  transition={{ duration: 0.8 }}
  style={{
    fontSize: "clamp(30px, 4.2vw, 64px)",
fontWeight: 400,
letterSpacing: "-0.01em",
    lineHeight: 1.2,
    color: "#ffffff",
    marginBottom: "28px",
  }}
>
  <span style={{ fontWeight: 700 }}>
  Own a Lamborghini Residence.
</span>

<span
  style={{
    display: "block",
    marginTop: "6px",
    fontStyle: "italic",
    fontWeight: 400,
    opacity: 0.8,
    fontSize: "clamp(18px, 2vw, 26px)"
  }}
>
  Live Beyond Ordinary.
</span>
</motion.h1>

    {/* SUBTEXT */}
    <motion.p
  variants={{
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }}
  transition={{ duration: 0.8 }}
  style={{
    fontSize: "clamp(14px, 1.6vw, 17px)", // 🔥 responsive
    color: "rgba(255,255,255,0.75)",
    marginBottom: "28px",
    lineHeight: 1.6,
    maxWidth: "520px", // 🔥 key fix (premium readability)
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: 300,
  }}
>
  A new standard of branded luxury in India.
</motion.p>
<motion.button
  className="hero-btn btn-hover"
  style={{
    ...styles.formSubmit,

    width: "fit-content",

    padding: "13px 20px",      // 🔥 balanced (not bulky, not small)
    fontSize: "13px",          // 🔥 slightly bigger
    letterSpacing: "0.10em",   // 🔥 premium spacing

    display: "inline-block",
    whiteSpace: "nowrap",

    marginTop: "20px",
    marginLeft: "auto",
    marginRight: "auto",
  }}
  onClick={() =>
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
    })
  }
>
  <span className="desktop-text">
    Get Private Access Before Inventory Closes
  </span>
  <span className="mobile-text">
    Get Private Access
  </span>
</motion.button>

    {/* TRUST */}
    <motion.p
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      transition={{ duration: 0.6 }}
      style={{
        marginTop: "22px",
        fontSize: "13px",
        color: "rgba(255,255,255,0.7)",
      }}
    >
      Limited Inventory · ₹4.75 Cr+ · Reserved for Select Buyers
    </motion.p>
  </motion.div>


</section>


<section
  id="overview"
  style={{
    padding: "120px 20px",
    background: "#f5f0e8", // 🔥 key fix (light break)
  }}
>
  <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
    
    {/* IMAGE */}
    <div
      style={{
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0,0,0,0.15)", // subtle depth
      filter: "contrast(1.05) brightness(0.95)"
      }}
    >
      <Image
        src="/images/lambo/lambo.png"
        alt="Lamborghini Residences Exterior"
        width={1600}
        height={900}
        style={{
          width: "100%",
          height: "auto",
          objectFit: "cover",
        }}
      />
    </div>

    {/* TEXT BELOW */}
    <div style={{ marginTop: "50px", padding: "0 16px" }}>

  <div style={{
    letterSpacing: "0.35em",
    fontSize: "11px",
    color: "#b40000",
    marginBottom: "14px",
  }}>
    ICONIC ARCHITECTURE
  </div>

 <h2 style={{
  fontSize: "clamp(26px, 4vw, 42px)",
  fontWeight: 300,
  color: "#1a1a1a",
  lineHeight: 1.2,
  marginBottom: "16px",
  letterSpacing: "-0.01em", // 🔥 subtle premium touch
}}>
  Designed to be Seen.
</h2>

  <p style={{
    maxWidth: "520px",
    margin: "0 auto",
    fontSize: "14px",
    color: "#5a5a5a",
    lineHeight: 1.7,
    fontFamily: "'Montserrat', sans-serif",
  }}>
    A bold expression of Italian design and engineering - where architecture becomes identity, and every detail reflects power, precision, and prestige.
  </p>

</div>

  </div>

  
</section>

{/* APARTMENTS */}
<section id="apartments" style={{ padding: "100px 20px" }}>
  <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
    
    {/* HEADER */}
    <div style={styles.sectionLabel}>
      <span style={styles.sectionLabelLine} /> Residences
    </div>

    <h2 style={styles.sectionTitle}>
      Select Your <span style={styles.sectionTitleAccent}>Residence</span>
    </h2>

    <p style={{ ...styles.sectionBody, maxWidth: "520px" }}>
      Three distinct residences. Each crafted with uncompromising detail.
    </p>

    {/* GRID */}
    <div className="apts-grid">
      {[
        {
          type: "3 BHK",
          size: "2,050",
          price: "Starting ₹4.75 Cr*",
          image: "/images/lambo/apartments/3bhk.png",
          desc: "Designed for those who value quiet sophistication",
        },
        {
          type: "4 BHK",
          size: "2,400",
          price: "Starting ₹5.75 Cr*",
          image: "/images/lambo/apartments/4bhk.png",
          desc: "Crafted for expansive luxury lifestyles",
          highlight: true,
        },
        {
          type: "4 BHK + Utility",
          size: "2,800",
          price: "Starting ₹6.75 Cr*",
          image: "/images/lambo/apartments/4bhk-utility.png",
          desc: "Ultimate space for elite living",
        },
      ].map((apt, i) => (
        <motion.div
          key={`${apt.type}-${i}`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -8, scale: 1.01 }} // 🔥 FIXED (no CSS conflict)
          transition={{ duration: 0.6, delay: i * 0.12 }}
          viewport={{ once: true }}
          className={`apt-card ${apt.highlight ? "highlight" : ""}`}
        >
          {/* 🔥 IMAGE ZOOM LAYER */}
          <motion.div
            className="apt-bg"
            style={{
              backgroundImage: `url(${apt.image})`,
            }}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6 }}
          />

          {/* BADGE */}
          {apt.highlight && (
            <div className="apt-badge">MOST SELECTED</div>
          )}

          {/* OVERLAY */}
          <div className="apt-overlay" />

          {/* CONTENT */}
          <div className="apt-content">
            <div className="apt-type">{apt.type}</div>
<div className="apt-price">{apt.price}</div>
            <div className="apt-size">
              {apt.size}
              <span className="apt-unit"> sq.ft.</span>
            </div>

            

            <div className="apt-desc">{apt.desc}</div>

            <button
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="apt-btn"
            >
              Request Private Details
            </button>
          </div>
        </motion.div>
      ))}


      
    </div>

   <h3
  style={{
    marginTop: "60px",
    textAlign: "center",
    fontSize: "clamp(14px, 1.2vw, 16px)",
    letterSpacing: "0.08em",
    fontWeight: 300,
    opacity: 0.85,
    color: "#fff",
  }}
>
  Limited Residences. Reserved for a Select Few.
</h3>
  </div>

</section>


{/* AMENITIES + EXPERIENCE */}
<section
      id="amenities"
      className="relative bg-[#0a0a0a] overflow-hidden px-5 md:px-8 pt-[100px] md:pt-[140px] pb-[120px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/lambo/amenities.jpg"
          alt=""
          fill
          className="object-cover object-[center_25%] scale-105 opacity-60"
        />
      </div>

      {/* OVERLAY */}
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(to_right,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.6)_40%,rgba(0,0,0,0.3)_100%),linear-gradient(to_bottom,rgba(0,0,0,0.4),rgba(0,0,0,0.9))]" />

      <div className="relative z-[2] max-w-[1200px] mx-auto">

        {/* LABEL */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-[1px] bg-[#d6d0c4]" />
          <span className="text-[10px] tracking-[0.35em] text-[#d6d0c4] uppercase">
            Amenities
          </span>
        </div>

        <h2
  style={{
    fontSize: "clamp(24px, 2.8vw, 36px)",
    fontWeight: 300,
    lineHeight: 1.2,
    marginBottom: "16px",
    color: "#f5f3ef",
  }}
>
  Crafted for{" "}
  <span
    style={{
      color: "#d6d0c4",
      fontStyle: "italic",
      fontWeight: 600,
      position: "relative",
      display: "inline-block",
    }}
  >
    Extraordinary
    <span
      style={{
        position: "absolute",
        left: 0,
        bottom: "-6px",
        width: "100%",
        height: "2px",
        background: "linear-gradient(90deg, #b40000, transparent)",
      }}
    />
  </span>{" "}
  Living
</h2>

        {/* SUBTEXT */}
        <p className="text-[13px] md:text-[14px] text-[#9a9488] max-w-[520px] leading-[1.7] mb-12 md:mb-16">
          A private ecosystem designed for comfort, prestige, and effortless luxury.
        </p>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-10 md:gap-x-16 max-w-[900px]">
          {amenities.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="flex flex-col gap-2 pl-4 border-l border-white/10 hover:translate-x-1 transition"
            >
              <div className="mb-1">
                {React.cloneElement(a.icon, { size: 22 })}
              </div>

              <div className="text-[15px] md:text-[17px] font-medium text-[#f5f0e8] tracking-[0.02em]">
                {a.title}
              </div>

              <div className="text-[12.5px] md:text-[13px] text-[#a89880] leading-[1.6] opacity-80">
                {a.desc}
              </div>
            </motion.div>
          ))}
        </div>

        {/* SLIDER */}
        <div className="relative w-full mt-14 md:mt-20 h-[260px] sm:h-[320px] md:h-[420px] lg:h-[520px] rounded-xl overflow-hidden">

          {slides.map((item, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                i === index ? "opacity-100 z-10" : "opacity-0"
              }`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="100vw"
                quality={100}
                className="object-cover object-center md:object-[center_30%]"
              />

              <div className="absolute inset-0 bg-black/15" />
            </div>
          ))}

          {/* ARROWS */}
          <button
            onClick={() =>
              setIndex((prev) => (prev - 1 + total) % total)
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-full backdrop-blur-md"
          >
            ‹
          </button>

          <button
            onClick={() =>
              setIndex((prev) => (prev + 1) % total)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-full backdrop-blur-md"
          >
            ›
          </button>

          {/* DOTS */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, i) => (
              <div
                key={i}
                onClick={() => setIndex(i)}
                className={`h-[6px] w-[6px] rounded-full cursor-pointer ${
                  i === index ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* FADE END (fix blank issue) */}
       <div className="h-[40px] w-full bg-gradient-to-b from-transparent to-black/70 mt-4" />

      </div>
    </section>
    {/* LOCATION */}
<div
  id="location"
  style={{
    background: "#0a0a0a",
    padding: "clamp(70px, 8vw, 100px) 24px",
  }}
>
  <div
    className="location-section"
    style={{
      maxWidth: "1200px",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "1fr 1.2fr", // 🔥 image gets more space
      gap: "70px",
      alignItems: "center",
    }}
  >
    {/* LEFT */}
    <div>
      {/* LABEL */}
      <div
        style={{
          fontSize: "10px",
          letterSpacing: "0.35em",
          color: "#d6d0c4",
          textTransform: "uppercase",
          marginBottom: "18px",
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <span style={{ width: "40px", height: "1px", background: "#d6d0c4" }} />
        Location
      </div>

      {/* TITLE */}
      <h2
        style={{
          fontSize: "clamp(24px, 2.8vw, 36px)",
          fontWeight: 300,
          color: "#f5f3ef",
          marginBottom: "16px",
          lineHeight: 1.2,
          letterSpacing: "-0.01em",
        }}
      >
        Where{" "}
        <span
          style={{
            color: "#d6d0c4",
            fontStyle: "italic",
            fontWeight: 600,
            position: "relative",
            display: "inline-block",
          }}
        >
          Location
          <span
            style={{
              position: "absolute",
              bottom: "-6px",
              left: 0,
              width: "100%",
              height: "2px",
              background: "linear-gradient(90deg,#b40000,transparent)",
            }}
          />
        </span>{" "}
        Becomes Advantage
      </h2>


      {/* LIST */}
      <ul
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "14px 32px",
    marginTop: "20px",
  }}
>
        {locationPoints.map((p, i) => (
  <li
    key={`${p.text}-${i}`}
    style={{
      listStyle: "none",
      fontSize: "clamp(13px, 0.9vw, 14px)",
      color: "rgba(214,208,196,0.65)",
      fontWeight: 300,
      lineHeight: 1.6,
      letterSpacing: "0.02em",
    }}
  >
    {p.text}
  </li>
))}
      </ul>
    </div>

    {/* RIGHT (MAP HERO) */}
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "clamp(260px, 35vw, 420px)", // 🔥 shorter height (wide look)
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      {/* MAP IMAGE */}
      <img
        src="/images/lambo/location-map.png"
        alt="Location Map"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          inset: 0,
        }}
      />

      {/* OVERLAY */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(10,10,10,0.85), rgba(10,10,10,0.25))",
        }}
      />

      {/* PIN */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="map-pin" />
      </div>

      {/* LABEL */}
      <div
        style={{
          position: "absolute",
          bottom: "18px",
          left: "18px",
          fontSize: "11px",
          letterSpacing: "0.2em",
          color: "#d6d0c4",
          opacity: 0.9,
        }}
      >
        SECTOR 71 · SPR · GURUGRAM
      </div>
    </div>
  </div>
</div>

{/* INVEST SECTION */}
<section
  id="invest"
  style={{
    position: "relative",
    padding: "clamp(110px, 12vw, 130px) 24px",
    overflow: "hidden",
  }}
>
  {/* 🎥 BACKGROUND VIDEO (unchanged) */}
  <Image
  src="/images/lambo/invest-bg.jpg" // 👉 use your best fallback image
  alt="Investment Background"
  fill
  priority
  sizes="(max-width: 768px) 100vw, 100vw"
  style={{
    objectFit: "cover",
    objectPosition: "center 30%", // 🔥 prevents top crop
    zIndex: 0,
    filter: "brightness(0.6)", // keep readability
    opacity: mounted ? 1 : 0,
  }}
/>

  {/* OVERLAY (unchanged) */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(180deg, rgba(10,10,10,0.65), rgba(10,10,10,0.85))",
      zIndex: 1,
    }}
  />

  <div style={{ position: "relative", zIndex: 2 }}>
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

      {/* LABEL */}
      <div
        style={{
          fontSize: "11px",
          letterSpacing: "0.32em",
          color: "#d6d0c4",
          marginBottom: "18px",
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <span style={{ width: "40px", height: "1px", background: "#d6d0c4" }} />
        Investment Case
      </div>

     {/* TITLE */}
<h2
  style={{
    fontSize: "clamp(26px, 3.2vw, 40px)",
    fontWeight: 300,
    color: "#f5f3ef",
    marginBottom: "14px", // 🔥 slightly tighter
    lineHeight: 1.2,
    letterSpacing: "-0.01em",
  }}
>
  Why <span style={{ fontStyle: "italic" }}>Smart Capital</span> Is Moving Here
</h2>

{/* POWER LINE */}
<p
  style={{
    fontSize: "clamp(15px, 1.2vw, 17px)",
    color: "#d6d0c4",
    marginBottom: "28px", // 🔥 give breathing space
  }}
>
  Limited supply. Global demand.
</p>

{/* SUBTEXT */}
<p
  style={{
    maxWidth: "520px", // 🔥 tighter = more premium
    marginBottom: "60px",
    fontSize: "clamp(13px, 1vw, 15px)",
    color: "#a89880",
    lineHeight: 1.7,
  }}
>
  Located in Gurugram’s fastest-growing corridor.
</p>
      {/* GRID */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.12 },
          },
        }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "22px",
        }}
      >
        {reasons.map((r, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "28px 24px",
              display: "flex",
              gap: "16px",
              alignItems: "flex-start",
              backdropFilter: "blur(8px)",
            }}
          >
            {/* NUMBER (FIXED) */}
            <div
              style={{
                fontSize: "32px",
                fontWeight: 300,
                color: "rgba(236, 22, 22, 0.66)",
                minWidth: "40px",
                fontStyle: "italic",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </div>

            {/* TEXT */}
            <div>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#f5f3ef",
                  marginBottom: "6px",
                  letterSpacing: "0.02em",
                }}
              >
                {r.title}
              </div>

              <div
                style={{
                  fontSize: "13px",
                  color: "#a89880",
                  lineHeight: 1.7,
                }}
              >
                {r.body}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <div style={{ marginTop: "60px", textAlign: "center" }}>
        <p
          style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          Limited residences · High-net-worth investors only
        </p>
      </div>
    </div>
  </div>
</section>
      {/* FORM */}
     <div id="contact" style={styles.formSection}>
  <div style={styles.formGlow} />

  <div style={styles.formInner}>
    {/* LABEL */}
    <div style={{ ...styles.sectionLabel, justifyContent: "center" }}>
      <span style={styles.sectionLabelLine} />
      Register Interest
      <span style={styles.sectionLabelLine} />
    </div>

    {/* TITLE */}
    <h2
  style={{
    fontSize: "clamp(26px, 3.2vw, 40px)", // 🔥 aligned with site
    fontWeight: 300,
    color: "#f5f3ef",
    marginBottom: "18px",
    letterSpacing: "-0.01em",
    textAlign: "center",
  }}
>
  Claim Your <span style={styles.sectionTitleAccent}>Priority Access</span>
</h2>

    {/* SUCCESS STATE */}
    {submitted ? (
      <div
        style={{
          textAlign: "center",
          padding: "60px 20px",
          animation: "fadeIn 0.5s ease",
        }}
      >
        <div style={{ fontSize: "42px", marginBottom: "10px" }}>✓</div>

<h3
  style={{
    color: "#f5f0e8",
    fontSize: "18px",
    marginBottom: "8px",
    fontWeight: 500,
  }}
>
  You're on the Priority List
</h3>

<p
  style={{
    color: "#a89880",
    fontFamily: "Montserrat,sans-serif",
    fontSize: "13px",
    lineHeight: 1.6,
  }}
>
  Our luxury sales team will contact you within 24 hours.
</p>

        {/* OPTIONAL RESET */}
        <button
          onClick={() => setSubmitted(false)}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            borderRadius: "6px",
            border: "1px solid #c8a96a",
            background: "transparent",
            color: "#c8a96a",
            cursor: "pointer",
          }}
        >
          Submit Another Request
        </button>
      </div>
    ) : (
      <>
        {/* FORM GRID */}
        <div
          style={{
            ...styles.formGrid,
            
          }}
          className="form-grid"
        >
          <input
  style={{
    ...styles.formInput,
    border: errors.name
      ? "1px solid #ff4d4d"
      : styles.formInput.border,
  }}
  placeholder="Your Full Name *"
  value={formData.name}
  onChange={(e) => {
    setFormData({ ...formData, name: e.target.value });
    setErrors({ ...errors, name: "" });
  }}
/>

{errors.name && (
  <div style={{ color: "#ff6b6b", fontSize: "12px", marginTop: "6px" }}>
    {errors.name}
  </div>
)}

          <input
  style={{
    ...styles.formInput,
    border: errors.phone
      ? "1px solid #ff4d4d"
      : styles.formInput.border,
  }}
  placeholder="Phone Number *"
  value={formData.phone}
  onChange={(e) => {
    setFormData({ ...formData, phone: e.target.value });
    setErrors({ ...errors, phone: "" });
  }}
/>

{errors.phone && (
  <div style={{ color: "#ff6b6b", fontSize: "12px", marginTop: "6px" }}>
    {errors.phone}
  </div>
)}

          <input
            style={{ ...styles.formInput, gridColumn: "1 / -1" }}
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <select
            style={styles.formSelect}
            value={formData.config}
            onChange={(e) =>
              setFormData({ ...formData, config: e.target.value })
            }
          >
            <option value="">Select Configuration</option>
            <option>3 BHK - ₹4.75 Cr+</option>
            <option>4 BHK - ₹5.75 Cr+</option>
            <option>4 BHK + Utility - ₹6.75 Cr+</option>
          </select>

          <textarea
            style={{
              ...styles.formInput,
              gridColumn: "1 / -1",
              height: "100px",
              resize: "none",
            }}
            placeholder="Any specific requirements..."
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />
        </div>

        {/* SUBMIT BUTTON */}
        <button
          style={styles.formSubmit}
          className="btn-hover"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Processing..." : "Request Priority Callback"}
        </button>
<p
  style={{
    fontSize: "12px",
    color: "#666",
    marginTop: "12px",
    textAlign: "center",
  }}
>
  By submitting, you agree to our{" "}
  <a
    href="/privacy-policy"
    style={{
      color: "#c8a96a",
      textDecoration: "none",
      borderBottom: "1px solid rgba(200,169,106,0.4)",
    }}
  >
    Privacy Policy
  </a>
  .
</p>
      </>
    )}
  </div>
</div>
{/* FOOTER */}
<footer
  style={{
    background: "#0a0a0a",
    padding: "clamp(70px, 10vw, 90px) 24px 40px",
    color: "#eaeaea",
  }}
>
  <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
    
    {/* TOP */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1.4fr 1fr 1fr",
        gap: "clamp(30px, 5vw, 50px)",
        marginBottom: "50px",
      }}
      className="footer-top"
    >
      {/* BRAND */}
      <div>
        <img
          src="/images/lambo/lambologo.png"
          alt="Lamborghini Residences"
          style={{
            height: "60px",
            marginBottom: "16px",
            opacity: 0.85,
          }}
        />

        <p
          style={{
            fontSize: "13px",
            lineHeight: 1.7,
            color: "#a89880",
            maxWidth: "380px",
            fontWeight: 300,
          }}
        >
          Italian design meets ultra-luxury living in Gurugram.
        </p>
      </div>

      {/* LINKS */}
      <div>
        <div
          style={{
            fontSize: "10px",
            letterSpacing: "0.35em",
            marginBottom: "16px",
            color: "#d6d0c4",
          }}
        >
          NAVIGATION
        </div>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {[
            { label: "Overview", id: "overview" },
            { label: "Amenities", id: "amenities" },
            { label: "Location", id: "location" },
            { label: "Contact", id: "contact" },
          ].map((l) => (
            <li key={l.label} style={{ marginBottom: "8px" }}>
              <a
                href={`#${l.id}`}
                style={{
                  color: "#cfcfcf",
                  textDecoration: "none",
                  fontSize: "13px",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* CONTACT */}
      <div>
        <div
          style={{
            fontSize: "10px",
            letterSpacing: "0.35em",
            marginBottom: "16px",
            color: "#d6d0c4",
          }}
        >
          CONTACT
        </div>

        <p
          style={{
            fontSize: "13px",
            color: "#cfcfcf",
            lineHeight: 1.7,
            fontWeight: 300,
          }}
        >
          +91 98114 22554<br />
          info@markrealesstate.com
        </p>
      </div>
    </div>

    {/* DIVIDER */}
    <div
      style={{
        height: "1px",
        background: "rgba(255,255,255,0.06)",
        margin: "30px 0",
      }}
    />

   <p
  style={{
    fontSize: "clamp(11px, 1.2vw, 12px)",
    color: "#666",
    lineHeight: 1.5,
    textAlign: "center",
    margin: "0 auto 16px",
    fontWeight: 300,
    padding: "0 10px",
  }}
>
  *Prices & availability may change. Verify details before booking.
</p>

    {/* MARKETER */}
    <p
      style={{
        textAlign: "center",
        fontSize: "12.5px",
        color: "#888",
        lineHeight: 1.6,
      }}
    >
      Marketed by{" "}
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: "#eaeaea",
          textDecoration: "none",
          borderBottom: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        Shankar Kohli
      </a>{" "}
      · Founder,{" "}
      <a
        href="https://markrealesstate.com/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: "#eaeaea",
          textDecoration: "none",
          borderBottom: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        Mark Real Esstate
      </a>
    </p>
  </div>
</footer>
{/* GLOBAL STYLES — SINGLE SOURCE */}
<style jsx global>{`
  @keyframes scrollLine {
    0% { transform: translateY(0); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translateY(10px); opacity: 0; }
  }

  .apts-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }

  .apt-card {
    position: relative;
    height: 460px;
    border-radius: 14px;
    overflow: hidden;
  }

  .apt-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(10,10,10,0.82),
      rgba(10,10,10,0.2)
    );
  }

  .icon-wrapper {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* RESPONSIVE */
  @media (max-width: 768px) {
    .apts-grid {
      grid-template-columns: 1fr;
    }
  }


 footer a:hover {
      color: #b40000;
      border-bottom: 1px solid #b40000;
    }
@keyframes slowZoom {
      from { transform: scale(1.05); }
      to { transform: scale(1.15); }
    }

    .reasonCard:hover {
      transform: translateY(-8px);
      border-color: rgba(255,255,255,0.2);
      box-shadow: 0 25px 80px rgba(0,0,0,0.5);
    }

    .invest-cta:hover {
      background: rgba(255,255,255,0.08);
      border-color: #fff;
      transform: translateY(-2px);
    }

    @media (max-width: 768px) {
      #invest div[style*="grid-template-columns"] {
        grid-template-columns: 1fr !important;
      }
    }

     @media (max-width: 900px) {
      .location-section {
        grid-template-columns: 1fr !important;
        gap: 60px !important;
      }
    }

     .icon-wrapper {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: rgba(214,208,196,0.08);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.4s ease;
    }

    /* hover only animation */
    .amenity-clean:hover .icon-wrapper {
      background: rgba(214,208,196,0.15);
      box-shadow: 0 0 18px rgba(180,0,0,0.12);
    }

    .amenity-clean:hover svg {
      transform: scale(1.08) translateY(-4px);
      transition: all 0.3s ease;
      filter: drop-shadow(0 0 6px rgba(180,0,0,0.3));
    }

     .apts-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 32px;
      margin-top: 50px;
    }

    .apt-card {
      position: relative;
      height: 460px;
      border-radius: 14px;
      overflow: hidden;
    }

    /* 🔥 BACKGROUND LAYER */
    .apt-bg {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      z-index: 0;
    }

    /* 🔥 LIGHTER OVERLAY */
    .apt-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to top,
        rgba(10,10,10,0.82),
        rgba(10,10,10,0.2)
      );
      z-index: 1;
    }

    .apt-content {
      position: relative;
      z-index: 2;
      padding: 26px;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      height: 100%;
    }

    .apt-type {
      font-size: 11px;
      letter-spacing: 0.35em;
      color: #c8b89a;
      margin-bottom: 10px;
      font-family: 'Montserrat', sans-serif;
    }

    .apt-size {
      font-size: 36px;
      font-weight: 300;
      color: #f5f0e8;
    }

    .apt-unit {
      font-size: 14px;
      color: #a89880;
    }

    .apt-price {
      font-size: 16px;
      color: rgba(245,240,232,0.9);
      margin-top: 10px;
      font-family: 'Montserrat', sans-serif;
    }

    .apt-desc {
      font-size: 12px;
      color: #a89880;
      margin-top: 6px;
      line-height: 1.5;
      font-family: 'Montserrat', sans-serif;
    }

    .apt-btn {
      margin-top: 20px;
      width: 100%;
      fontSize: "12px",
      padding: 10px 14px;
      background: transparent;
      border: 1px solid rgba(200,184,154,0.5);
      backdrop-filter: blur(6px);
      color: #f5f0e8;
      border-radius: 30px;
      font-size: 12px;
      letter-spacing: 0.12em;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .apt-btn:hover {
      background: rgba(200,184,154,0.12);
      border-color: #c8b89a;
      transform: translateY(-2px);
    }

    /* 🔥 HIGHLIGHT (SUBTLE PREMIUM) */
    .apt-card.highlight {
      border: 1px solid rgba(200,184,154,0.25);
      transform: scale(1.03);
    }

    .apt-badge {
      position: absolute;
      top: 16px;
      right: 16px;
      font-size: 10px;
      letter-spacing: 0.2em;
      background: #b40000;
      padding: 6px 10px;
      border-radius: 20px;
      z-index: 3;
    }

    /* RESPONSIVE */
    @media (max-width: 992px) {
      .apts-grid {
        grid-template-columns: 1fr 1fr;
      }
    }

    @media (max-width: 600px) {
      .apts-grid {
        grid-template-columns: 1fr;
      }

      .apt-card {
        height: 360px;
      }

      .apt-card.highlight {
        transform: none;
      }
    }

     @keyframes scrollLine {
      0% { transform: translateY(0); opacity: 0; }
      50% { opacity: 1; }
      100% { transform: translateY(10px); opacity: 0; }
    }

    .btn-hover {
  transition: all 0.3s ease;
}

}
}
    }










    @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(180,0,0,0.4),0 0 0 0 rgba(180,0,0,0.2)} 50%{box-shadow:0 0 0 24px rgba(180,0,0,0.1),0 0 0 48px rgba(180,0,0,0.05)}}
        @keyframes bounceY {0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)}}
        @keyframes fadeIn {from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)}}
        .map-pulse { animation: pulse 2.5s ease-in-out infinite; }
        .scroll-bounce { animation: bounceY 1.8s ease-in-out infinite; }
        .hero-content-anim { animation: fadeIn 1s ease 0.2s both; }
        .btn-hover:hover { opacity: 0.85; transform: scale(1.02); }
        .apt-card-hover:hover { background: #180a0a !important; }
        .amenity-hover:hover { border-color: rgba(180,0,0,0.5) !important; }
        input::placeholder, textarea::placeholder { color: rgba(168,152,128,0.4); }
        input:focus, select:focus, textarea:focus { border-color: rgba(180,0,0,0.6) !important; }
        @media(max-width:768px){
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .apts-grid, .amenities-grid, .reasons-grid { grid-template-columns: 1fr !important; }
          .location-section { grid-template-columns: 1fr !important; }
          .collab-inner { grid-template-columns: 1fr !important; }
          .footer-top { grid-template-columns: 1fr !important; }
          .nav-links { display: none !important; }
          .form-grid { grid-template-columns: 1fr !important; }
          .collab-divider { display: none !important; }
        }

        .amenity-hover {
  position: relative;
}

.amenity-hover::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    120deg,
    transparent 30%,
    rgba(255,255,255,0.4),
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
}

.amenity-hover:hover::before {
  opacity: 1;
}

.amenity-hover:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: 0 25px 80px rgba(0,0,0,0.18);
  border-color: rgba(180,0,0,0.5);
}

.amenity-hover:hover svg {
  transform: scale(1.15);
  stroke: #7a0000;
  transition: all 0.3s ease;
}

/* ICON FLOAT (subtle luxury motion) */
@keyframes floatSoft {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-3px); }
}

/* ICON GLOW BREATH */
@keyframes iconPulse {
  0%, 100% { opacity: 0.85; }
  50% { opacity: 1; }
}


/* STAGGER (IMPORTANT → organic feel) */
.locationItem:nth-child(1) svg { animation-delay: 0s; }
.locationItem:nth-child(2) svg { animation-delay: 0.4s; }
.locationItem:nth-child(3) svg { animation-delay: 0.8s; }
.locationItem:nth-child(4) svg { animation-delay: 1.2s; }
.locationItem:nth-child(5) svg { animation-delay: 1.6s; }
.locationItem:nth-child(6) svg { animation-delay: 2s; }

/* HOVER INTERACTION */
.locationItem:hover svg {
  animation: none;
  transform: scale(1.15);
  stroke: #7a0000;
}

/* ITEM HOVER */
.locationItem {
  transition: all 0.3s ease;
}

.locationItem:hover {
  background: rgba(180,0,0,0.08);
  transform: translateX(6px);
}

@keyframes mapPulseLuxury {
  0% {
    box-shadow: 0 0 0 0 rgba(180,0,0,0.5);
  }
  70% {
    box-shadow: 0 0 0 30px rgba(180,0,0,0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(180,0,0,0);
  }
}

input::placeholder {
  color: rgba(245,240,232,0.4);
}

input:focus {
  border-bottom: 1px solid #b40000;
  box-shadow: 0 8px 25px rgba(180,0,0,0.2);
}



.apts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

@media (max-width: 768px) {
  .apts-grid {
    grid-template-columns: 1fr;
  }
}

/* APARTMENT CARD */
.apt-card {
  position: relative;
  height: 460px;
  overflow: hidden;
  border-radius: 14px;
}

.apt-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  z-index: 0;
}

.apt-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2));
  z-index: 1;
}

.apt-content {
  position: relative;
  z-index: 2;
  padding: 28px;
}

.apt-btn {
  margin-top: 16px;
  padding: 10px 18px;
  background: #b40000;
  color: #fff;
  border: none;
  cursor: pointer;
}

/* ANIMATIONS */
@keyframes scrollLine {
  0% { transform: translateY(0); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(10px); opacity: 0; }
}

@keyframes slowZoom {
  0% { transform: scale(1.05); }
  100% { transform: scale(1.12); }
}

/* LOCATION FIX */
@media (max-width: 768px) {
  .location-section {
    grid-template-columns: 1fr !important;
  }
}

/* INVEST GRID */
@media (max-width: 768px) {
  #invest div[style*="grid-template-columns"] {
    grid-template-columns: 1fr !important;
  }
}

/* ICON */
.icon-wrapper {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(180,0,0,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
 
  .hero-btn {
    width: 100% !important;
    padding: 16px !important;
    font-size: 11px !important;
    letter-spacing: 0.25em !important;
  }

  .form-grid {
    grid-template-columns: 1fr !important;
  }
}

.desktop-text {
  display: inline;
}

.mobile-text {
  display: none;
}

@media (max-width: 768px) {
  .desktop-text {
    display: none;
  }
  .mobile-text {
    display: inline;
  }
}

.hero-btn {
  width: fit-content !important;
  display: inline-block;
  padding: 10px 14px !important;
  white-space: nowrap;
  letter-spacing: 0.12em !important;
  margin-left: auto;
  margin-right: auto;
}

/* 🔥 HOVER EFFECT */
.btn-hover {
  transition: all 0.3s ease;
}

.btn-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(180, 0, 0, 0.35);
  opacity: 0.9;
}
`}</style>

    </div>
  );
}

