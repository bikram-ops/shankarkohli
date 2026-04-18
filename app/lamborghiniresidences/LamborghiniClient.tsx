"use client";
import { useState, useEffect } from "react";

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
    fontFamily: "'Cormorant Garamond', 'Georgia', serif",
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
    fontFamily: "'Cormorant Garamond', serif",
  },
  navLogoSub: {
    fontSize: "9px",
    letterSpacing: "0.4em",
    color: "#b40000",
    textTransform: "uppercase" as const,
    fontFamily: "'Montserrat', sans-serif",
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
    fontFamily: "'Montserrat', sans-serif",
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
    fontSize: "clamp(32px, 5vw, 60px)",
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
    fontSize: "17px",
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
    fontSize: "clamp(36px, 4vw, 56px)",
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
    fontSize: "18px",
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
    width: "100%",
    background: "rgba(180,0,0,0.05)",
    border: "1px solid rgba(180,0,0,0.2)",
    color: "#f5f0e8",
    padding: "16px 20px",
    fontSize: "14px",
    fontFamily: "'Montserrat', sans-serif",
    outline: "none",
    boxSizing: "border-box" as const,
    transition: "border-color 0.3s",
  },
  formSelect: {
    width: "100%",
    background: "#140303",
    border: "1px solid rgba(180,0,0,0.2)",
    color: "#a89880",
    padding: "16px 20px",
    fontSize: "14px",
    fontFamily: "'Montserrat', sans-serif",
    outline: "none",
    boxSizing: "border-box" as const,
    gridColumn: "1 / -1" as const,
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
  },
  {
    icon: <Building2 size={26} strokeWidth={1.5} color="#b40000" />,
    title: "Ultra-Luxury Clubhouse",
    desc: "A members-only retreat for refined living.",
  },
  {
    icon: <Waves size={26} strokeWidth={1.5} color="#b40000" />,
    title: "Resort-Style Pool Deck",
    desc: "Infinity-edge pool with cabanas and skyline views.",
  },
  {
    icon: <Dumbbell size={26} strokeWidth={1.5} color="#b40000" />,
    title: "Performance Fitness Centre",
    desc: "World-class gym with training zones and wellness spaces.",
  },
  {
    icon: <Trees size={26} strokeWidth={1.5} color="#b40000" />,
    title: "Curated Landscaped Gardens",
    desc: "Green terraces with Italian-inspired outdoor design.",
  },
  {
    icon: <ConciergeBell size={26} strokeWidth={1.5} color="#b40000" />,
    title: "Concierge & Smart Services",
    desc: "24/7 concierge, smart home tech, and valet services.",
  },
];
const locationPoints = [
  { text: "Golf Course Extension Road — 5 min" },
  { text: "IGI Airport — 35 min via NH-48" },
  { text: "Cyber Hub / Cyber City — 20 min" },
  { text: "Top Schools & Hospitals — 10 min" },
  { text: "Premium Malls & Dining — 5 min" },
  { text: "Sohna Road & NH-48 — Direct Access" },
];
const reasons = [
  { title: "The Lamborghini Name", body: "Globally iconic brand driving long-term value." },
  { title: "SPR – Gurgaon's Gold Corridor", body: "High-growth corridor with strong appreciation potential." },
  { title: "Extraordinary Scarcity", body: "Limited inventory ensures rarity-driven demand." },
  { title: "Signature Global Track Record", body: "Trusted developer with consistent delivery history." },
  { title: "Curated Luxury Ecosystem", body: "Lifestyle-led amenities designed for elite living." },
  { title: "Long-Term Asset Growth", body: "Positioned for strong capital appreciation over time." },
];
export default function LamborghiniResidences() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", config: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
const { scrollY } = useScroll();

const [loading, setLoading] = useState(false);
  const y = useTransform(scrollY, [0, 500], [0, 120]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  useEffect(() => {
    // Load fonts
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&family=Montserrat:wght@300;400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const handleSubmit = async (e: React.MouseEvent) => {
  e.preventDefault();

  if (!formData.name || !formData.phone) {
    alert("Please fill required fields");
    return;
  }

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
      alert("API error: " + res.status);
    }
  } catch (err) {
    console.error("FULL ERROR:", err);
    alert("Network error — check console");
  } finally {
    setLoading(false);
  }
};
const [isMobile, setIsMobile] = useState(false);
const [hovered, setHovered] = useState<string | null>(null);
// Detect screen size
useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  handleResize();
  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);

  return (
    
    <div style={styles.root}>
  

     {/* NAV */}
<nav
  style={{
    ...styles.nav,
    background: scrolled
      ? "rgba(10,10,10,0.98)"
      : "linear-gradient(180deg, rgba(10,10,10,0.95) 0%, transparent 100%)",
  }}
>
  {/* LOGO */}
  <div
    style={{ cursor: "pointer" }}
    onClick={() =>
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  >
    <div style={styles.navLogo}>
      <Image
        src="/images/lambo/logo.png"
        alt="Lamborghini"
        width={180}
        height={50}
        style={{
          height: "50px",
          width: "auto",
        }}
        priority
      />
    </div>
  </div>

  {/* NAV LINKS (HIDE ON MOBILE) */}
  {!isMobile && (
    <ul
      style={{
        ...styles.navLinks,
        listStyle: "none",
      }}
    >
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
  )}

  {/* CTA BUTTON (ALWAYS VISIBLE — MOBILE PRIORITY) */}
 <a
  href="tel:+919811422554"
  style={{
    ...styles.navCta,
    textDecoration: "none",

    padding: isMobile ? "6px 10px" : "10px 20px",
    fontSize: isMobile ? "11px" : "14px",

    borderRadius: "4px",

    whiteSpace: "nowrap",   // ✅ FORCE SINGLE LINE
    flexShrink: 0,          // ✅ PREVENT SQUEEZE
  }}
>
  {isMobile ? "CALL NOW" : "+91 98114 22554"}
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
  {/* VIDEO */}
  <video
    autoPlay
    loop
    muted
    playsInline
    style={{
      position: "absolute",
      width: "100%",
      height: "100%",
      objectFit: "cover",
      zIndex: 0,
      filter: "brightness(0.88)",
    }}
  >
    <source src="/videos/lambo/lamborghini-hero.mp4" />
  </video>

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
        letterSpacing: "0.3em",
        color: "#bbb1b1",
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
    fontSize: "clamp(32px, 5vw, 76px)", // 🔥 improved scaling
    fontWeight: 500,
    letterSpacing: "0.02em", // tighter = more luxury
    lineHeight: 1.15,
    color: "#ffffff",
    marginBottom: "20px",
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
    opacity: 0.9,
    fontSize: "clamp(20px, 2.5vw, 32px)",
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
    fontSize: "clamp(14px, 1.6vw, 18px)", // 🔥 responsive
    color: "rgba(255,255,255,0.75)",
    marginBottom: "28px",
    lineHeight: 1.6,
    maxWidth: "520px", // 🔥 key fix (premium readability)
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: 300,
  }}
>
  Where global design meets elite living in India.
</motion.p>
    <motion.button
  variants={{
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }}
  transition={{ duration: 0.6 }}
  whileHover={{
    y: -4,
    scale: 1.02,
    boxShadow: "0 14px 35px rgba(180,0,0,0.35)",
  }}
  whileTap={{ scale: 0.97 }}
  onClick={() =>
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
    })
  }
  style={{
    ...styles.formSubmit,
    width: isMobile ? "100%" : "auto",
    padding: isMobile ? "16px" : "20px 32px",
    fontSize: isMobile ? "11px" : "12px",
    letterSpacing: isMobile ? "0.25em" : "0.4em",
    marginTop: "20px",
  }}
>
  {isMobile
    ? "Get Private Access"
    : "Get Private Access Before Inventory Closes"}
</motion.button>


    {/* TRUST */}
    <motion.p
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      transition={{ duration: 0.6 }}
      style={{
        marginTop: "18px",
        fontSize: "13px",
        color: "rgba(255,255,255,0.7)",
      }}
    >
      Limited Inventory · ₹5 Cr+ · Reserved for Select Buyers
    </motion.p>
  </motion.div>

  {/* SCROLL */}
  <div
    style={{
      position: "absolute",
      bottom: "30px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 2,
      textAlign: "center",
      color: "rgba(255,255,255,0.6)",
      fontSize: "10px",
      letterSpacing: "0.3em",
    }}
  >
    SCROLL
    <div
      style={{
        marginTop: "8px",
        width: "2px",
        height: "30px",
        background: "rgba(255,255,255,0.4)",
        animation: "scrollLine 1.8s infinite",
      }}
    />
  </div>



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
      Choose Your <span style={styles.sectionTitleAccent}>Canvas</span>
    </h2>

    <p style={{ ...styles.sectionBody, maxWidth: "520px" }}>
      Three distinct residences. Each crafted with uncompromising detail.
    </p>

    {/* GRID */}
    <div className="apts-grid">
      {[
        {
          type: "3 BHK",
          size: "2,000+",
          price: "Starting ₹5 Cr*",
          image: "/images/lambo/apartments/3bhk.png",
          desc: "Ideal for refined city living",
        },
        {
          type: "4 BHK",
          size: "2,400+",
          price: "Starting ₹6 Cr*",
          image: "/images/lambo/apartments/4bhk.png",
          desc: "Crafted for expansive luxury lifestyles",
          highlight: true,
        },
        {
          type: "4 BHK + Utility",
          size: "2,800",
          price: "Starting ₹7 Cr*",
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
            <div className="apt-badge">MOST POPULAR</div>
          )}

          {/* OVERLAY */}
          <div className="apt-overlay" />

          {/* CONTENT */}
          <div className="apt-content">
            <div className="apt-type">{apt.type}</div>

            <div className="apt-size">
              {apt.size}
              <span className="apt-unit"> sq.ft.</span>
            </div>

            <div className="apt-price">{apt.price}</div>

            <div className="apt-desc">{apt.desc}</div>

            <button
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="apt-btn"
            >
              View Private Details
            </button>
          </div>
        </motion.div>
      ))}


      
    </div>

    <h3 style={{
  marginTop: "60px",
  textAlign: "center",
  fontSize: "18px",
  color: "#fff"
}}>
  Secure Your Residence Before Prices Rise Further
</h3>
  </div>

</section>
{/* AMENITIES */}
<div
  id="amenities"
  style={{
    position: "relative",
    background: "#0a0a0a",
    padding: "140px 40px", // 🔥 more breathing space
    overflow: "hidden",
  }}
>
  {/* BACKGROUND */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      backgroundImage: "url('/images/lambo/amenities-bg.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      opacity: 0.55,
      zIndex: 0,
    }}
  />

  {/* OVERLAY */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0, 0, 0, 0.53))",
      zIndex: 1,
    }}
  />

  {/* CONTENT */}
  <div style={{ position: "relative", zIndex: 2 }}>
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      
      {/* LABEL */}
      <div
        style={{
          fontSize: "10px",
          letterSpacing: "0.4em",
          color: "#d6d0c4",
          textTransform: "uppercase",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <span style={{ width: "40px", height: "1px", background: "#d6d0c4" }} />
        Amenities
      </div>

      {/* TITLE */}
      <h2
        style={{
          fontSize: "clamp(42px, 6vw, 80px)", // 🔥 bigger
          fontWeight: 300,
          color: "#f5f3ef",
          marginBottom: "24px",
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
              bottom: "-8px",
              width: "100%",
              height: "2px",
              background: "linear-gradient(90deg, #b40000, transparent)",
            }}
          />
        </span>{" "}
        Living
      </h2>

      {/* SUBTEXT */}
      <p
        style={{
          maxWidth: "560px",
          marginBottom: "100px",
          fontSize: "15px", // 🔥 slightly bigger
          color: "#9a9488",
          lineHeight: 1.9,
        }}
      >
        Not just amenities — a private ecosystem designed to elevate everyday
        living into an experience of comfort, prestige, and effortless luxury.
      </p>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "60px 70px", // 🔥 more space
        }}
      >
        {amenities.map((a, i) => (
          <motion.div
            key={`${a.title}-${i}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            viewport={{ once: true }}
            className="amenity-clean"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {/* ICON */}
            <div className="icon-wrapper">
              {React.cloneElement(a.icon, {
                color: "#d6d0c4",
                size: 34,
              })}
            </div>

            {/* TITLE */}
            <div
              style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#f5f3ef",
              }}
            >
              {a.title}
            </div>

            {/* DESC */}
            <div
              style={{
                fontSize: "14px",
                color: "#9a9488",
                lineHeight: 1.8,
              }}
            >
              {a.desc}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>

 
</div>
     
     
    {/* LOCATION */}
<div
  id="location"
  style={{
    background: "#0a0a0a",
    padding: "clamp(110px, 12vw, 150px) 24px",
  }}
>
  <div
    className="location-section"
    style={{
      maxWidth: "1200px",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "70px",
      alignItems: "center",
    }}
  >
    {/* LEFT */}
    <div>
      {/* LABEL */}
      <div
        style={{
          fontSize: "11px",
          letterSpacing: "0.35em",
          color: "#d6d0c4",
          textTransform: "uppercase",
          marginBottom: "20px",
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
          fontSize: "clamp(36px, 5.5vw, 72px)",
          fontWeight: 300,
          color: "#f5f3ef",
          marginBottom: "24px",
          lineHeight: 1.2,
        }}
      >
        Where{" "}
        <span
          style={{
            color: "#d6d0c4",
            fontStyle: "italic",
            position: "relative",
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

      {/* SUBTEXT */}
      <p
        style={{
          maxWidth: "480px",
          marginBottom: "48px",
          fontSize: "clamp(16px, 1.2vw, 18px)",
          color: "#9a9488",
          lineHeight: 1.9,
        }}
      >
        At the center of Gurugram’s fastest-growing luxury corridor.
      </p>

      

      {/* LIST */}
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        {locationPoints.map((p, i) => (
          <li
  key={`${p.text}-${i}`}
  style={{
    display: "flex",
    alignItems: "flex-start", // 🔥 KEY FIX
    gap: "14px",
   
    color: "#d6d0c4",
    fontSize: "clamp(16px, 1.1vw, 17px)",
    fontWeight: 500,
    lineHeight: 1.6, // 🔥 IMPORTANT
  }}
>
            {/* ⚪ neutral dot (not red) */}
            <span
  style={{
    width: "8px",
    height: "8px",
    background: "#d6d0c4",
    borderRadius: "50%",
    marginTop: "6px", // 🔥 MAGIC FIX
    flexShrink: 0,
  }}
/>
            {p.text}
          </li>
        ))}
      </ul>
    </div>

    {/* RIGHT (MAP HERO) */}
    <div
      style={{
        position: "relative",
        height: "clamp(320px, 45vw, 520px)",
        borderRadius: "18px",
        overflow: "hidden",
        boxShadow: "0 40px 100px rgba(0,0,0,0.65)",
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

      {/* DEPTH OVERLAY */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, rgba(0,0,0,0.2), rgba(0,0,0,0.7))",
        }}
      />

      {/* BASE OVERLAY */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(10,10,10,0.85), rgba(10,10,10,0.25))",
        }}
      />

      {/* 🔴 SINGLE FOCUS PIN */}
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
          bottom: "22px",
          left: "22px",
          fontSize: "12px",
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


<section
  id="invest"
  style={{
    position: "relative",
    padding: "130px 24px",
    overflow: "hidden",
  }}
>
  {/* 🎥 BACKGROUND VIDEO */}
  <video
    autoPlay
    loop
    muted
    playsInline
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      zIndex: 0,
      filter: "brightness(0.5) contrast(1.05)",
      transform: "scale(1.08)",
      animation: "slowZoom 18s ease-in-out infinite alternate",
    }}
  >
    <source src="/videos/lambo/invest-bg.mp4" />
  </video>

  {/* 🌑 OVERLAY */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(180deg, rgba(10,10,10,0.65), rgba(10,10,10,0.85))",
      zIndex: 1,
    }}
  />

  {/* ✨ DEPTH */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      background:
        "radial-gradient(circle at center, rgba(0,0,0,0.2), rgba(0,0,0,0.8))",
      zIndex: 1,
    }}
  />

  {/* 🔴 SUBTLE BRAND GLOW */}
  <div
    style={{
      position: "absolute",
      top: "35%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "520px",
      height: "520px",
      background:
        "radial-gradient(circle, rgba(180,0,0,0.06), transparent 70%)",
      zIndex: 1,
    }}
  />

  {/* CONTENT */}
  <div style={{ position: "relative", zIndex: 2 }}>
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      
      {/* LABEL */}
      <div
        style={{
          fontSize: "11px",
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
        Investment Case
      </div>

      {/* TITLE */}
      <h2
        style={{
          fontSize: "clamp(38px, 5.5vw, 72px)",
          fontWeight: 300,
          color: "#f5f3ef",
          marginBottom: "20px",
          lineHeight: 1.2,
        }}
      >
        Why <span style={{ fontStyle: "italic" }}>Smart Capital</span> Is Moving Here
      </h2>

      {/* POWER LINE */}
      <p
        style={{
          fontSize: "18px",
          color: "#d6d0c4",
          marginBottom: "18px",
        }}
      >
        Limited supply. Global demand. Strategic location.
      </p>

      {/* SUBTEXT */}
      <p
        style={{
          maxWidth: "600px",
          marginBottom: "70px",
          fontSize: "clamp(14px, 1.1vw, 16px)",
          color: "#a89880",
          lineHeight: 1.8,
        }}
      >
        The next global luxury drop has arrived in India.  
        Positioned in Gurugram’s fastest-growing corridor with strong appreciation potential.
      </p>

      {/* GRID WITH MOTION */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.15 },
          },
        }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "24px",
        }}
      >
        {reasons.map((r, i) => (
          <motion.div
            key={`${r.title}-${i}`}
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "34px 28px",
              display: "flex",
              gap: "18px",
              alignItems: "flex-start",
              backdropFilter: "blur(8px)",
              transition: "all 0.4s ease",
            }}
            className="reasonCard"
          >
            {/* NUMBER */}
            <div
              style={{
                fontSize: "42px",
                fontWeight: 300,
                color: "rgba(180,0,0,0.22)",
                minWidth: "50px",
                fontStyle: "italic",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </div>

            {/* TEXT */}
            <div>
              <div
                style={{
                  fontSize: "17px",
                  fontWeight: 600,
                  color: "#f5f3ef",
                  marginBottom: "6px",
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
      <div
        style={{
          marginTop: "70px",
          textAlign: "center",
        }}
      >
       <p style={{
  marginTop: "16px",
  fontSize: "13px",
  color: "rgba(255,255,255,0.7)",
}}>
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
    <h2 style={styles.formTitle}>
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
        <div style={{ fontSize: "50px", marginBottom: "12px" }}>✓</div>

        <h3 style={{ color: "#f5f0e8", fontSize: "22px", marginBottom: "10px" }}>
          You're on the Priority List
        </h3>

        <p
          style={{
            color: "#a89880",
            fontFamily: "Montserrat,sans-serif",
            fontSize: "14px",
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
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          }}
          className="form-grid"
        >
          <input
            style={styles.formInput}
            placeholder="Your Full Name *"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />

          <input
            style={styles.formInput}
            placeholder="Phone Number *"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />

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
            <option>3 BHK - ₹5 Cr+</option>
            <option>4 BHK - ₹6 Cr+</option>
            <option>4 BHK + Utility - ₹7 Cr+</option>
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

        {/* NOTE */}
        <p style={styles.formNote}>
          Your information is completely confidential. No spam, ever.
        </p>
      </>
    )}
  </div>
</div>

      {/* FOOTER */}
      <footer
  style={{
    background: "#0a0a0a",
    padding: "80px 30px 40px",
    color: "#eaeaea",
  }}
>
  <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
    
    {/* TOP */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1.5fr 1fr 1fr",
        gap: "50px",
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
            height: "70px",
            marginBottom: "18px",
            opacity: 0.9,
          }}
        />

        <p
          style={{
            fontSize: "14px",
            lineHeight: 1.6,
            color: "#a0a0a0",
            maxWidth: "420px",
          }}
        >
          Italian design meets ultra-luxury living in Gurugram.
        </p>
      </div>

      {/* LINKS */}
      <div>
        <div
          style={{
            fontSize: "11px",
            letterSpacing: "0.25em",
            marginBottom: "18px",
            color: "#777",
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
            <li key={l.label} style={{ marginBottom: "10px" }}>
              <a
                href={`#${l.id}`}
                style={{
                  color: "#cfcfcf",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
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
            fontSize: "11px",
            letterSpacing: "0.25em",
            marginBottom: "18px",
            color: "#777",
          }}
        >
          CONTACT
        </div>

        <p
          style={{
            fontSize: "14px",
            color: "#cfcfcf",
            lineHeight: 1.6,
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
        background: "rgba(255,255,255,0.08)",
        margin: "30px 0",
      }}
    />

    {/* DISCLAIMER (SHORTENED) */}
    <p
      style={{
        fontSize: "12px",
        color: "#666",
        lineHeight: 1.6,
        textAlign: "center",
        maxWidth: "750px",
        margin: "0 auto 20px",
      }}
    >
      *Prices and availability are subject to change. Please verify all project details with the developer before making any decision.
    </p>

    {/* MARKETER (KEPT — CLEAN & PREMIUM) */}
    <p
      style={{
        textAlign: "center",
        fontSize: "13px",
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
          borderBottom: "1px solid rgba(255,255,255,0.2)",
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
          borderBottom: "1px solid rgba(255,255,255,0.2)",
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
      padding: 12px;
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
`}</style>

    </div>
  );
}

