"use client";

import { motion, useInView } from "framer-motion";
import { useRef , useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Image from "next/image";
import { ChevronLeft,  ChevronRight, User, Phone, Mail, IndianRupee  } from "lucide-react";

/* ───────── ANIMATION SYSTEM ───────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp}
    >
      {children}
    </motion.div>
  );
}

/* ───────── DATA ───────── */
const stats = [
  { value: "12+", label: "Years Experience" },
  { value: "₹1000+ Cr", label: "Transactions" },
  { value: "A-Grade", label: "Developers" },
  { value: "HNI", label: "Clients" },
];

const services = [
  "Investment Strategy",
  "Deal Negotiation",
  "Transaction Management",
  "Financial Structuring",
  "Portfolio Planning",
  "Property Management",
];

const residences = [
  "Westin Residences",
  "Elie Saab Residences",
  "Tonino Lamborghini",
];

export default function Page() {
const [success, setSuccess] = useState(false);
const [loading, setLoading] = useState(false);
const [activeIndex, setActiveIndex] = useState<number>(0);
const videoRef = useRef<HTMLVideoElement>(null);
const [isMuted, setIsMuted] = useState(true);
const toggleSound = () => {
  if (!videoRef.current) return;

  videoRef.current.muted = !videoRef.current.muted;
  setIsMuted(videoRef.current.muted);

  videoRef.current.play(); // ensures playback resumes
};
const videos: string[] = [
  "/videos/testimonials/video1.mp4",
  "/videos/testimonials/video2.mp4",
  "/videos/testimonials/video3.mp4",
  "/videos/testimonials/video4.mp4",
  "/videos/testimonials/video5.mp4",
  "/videos/testimonials/video6.mp4",
];

const next = () => {
  setActiveIndex((prev: number) => (prev + 1) % videos.length);
};

const prevSlide = () => {
  setActiveIndex((prev: number) => (prev - 1 + videos.length) % videos.length);
};
  return (
    <main style={{ background: "#0A0A0A", color: "#E8E2D9" }}>

      <Header />
<section className="relative w-full md:h-[100dvh] overflow-hidden">

  {/* 🎥 DESKTOP VIDEO */}
  <video
    ref={videoRef}
    autoPlay
    muted
    loop
    playsInline
    className="hidden md:block absolute inset-0 w-full h-full object-cover"
  >
    <source src="/videos/hero.mp4" type="video/mp4" />
  </video>

  {/* 🌑 OVERLAY */}
  <div className="hidden md:block absolute inset-0 bg-black/30" />

  {/* 🔊 SOUND BUTTON */}
  <button
    onClick={toggleSound}
    className="hidden md:block absolute bottom-6 right-6 z-20 
               bg-black/50 backdrop-blur-md text-white 
               px-4 py-2 text-xs rounded-full"
  >
    {isMuted ? "🔇" : "🔊"}
  </button>

  {/* 📱 MOBILE CONTENT */}
 <div className="md:hidden relative h-[100svh] w-full overflow-hidden">

  {/* FULL SCREEN IMAGE */}
  <Image
    src="/images/shankar-kohli.jpeg"
    alt="Shankar Kohli"
    fill
    className="object-cover object-[50%_20%]"
    priority
  />

  {/* DARK OVERLAY */}
  <div className="absolute inset-0 bg-black/20" />

  {/* GRADIENT (BOTTOM READABILITY) */}
  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

  {/* CONTENT OVERLAY */}
  <div className="absolute inset-0 flex flex-col justify-end px-5 pb-6 pt-24">

    <p className="text-[#C8A45A] text-[10px] tracking-[0.3em] mb-2">
      FOUNDER OF MARK REAL ESSTATE
    </p>

    <h1 className="text-3xl font-serif leading-tight mb-3">
      Shankar Kohli
    </h1>

    <p className="text-gray-300 text-sm leading-relaxed mb-5">
      Helping Gurugram’s most discerning investors acquire ultra-luxury residences with precision, discretion, and unmatched access.
    </p>

    {/* CTA */}
    <div className="flex gap-3">

      <button
        onClick={() =>
          document
            .getElementById("final-cta")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        className="flex-1 bg-[#C8A45A] text-black py-3 text-sm tracking-[0.08em]"
      >
        Book Deep-Dive
      </button>

      <button
        onClick={() =>
          document
            .getElementById("deals")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        className="flex-1 border border-white/30 text-white py-3 text-sm tracking-[0.08em]"
      >
        View Projects
      </button>

    </div>

  </div>

</div>

</section>
<section
  id="investors"
  data-section="investors"
  className="py-20 md:py-32 bg-[#0f0f0f]"
>
  <div className="w-full grid md:grid-cols-2 items-center">

    {/* IMAGE (FULL BLEED) */}
    <Reveal>
      <div className="relative w-full h-[340px] md:h-[520px] overflow-hidden group">

        <Image
          src="/images/luxury-investor.jpg"
          alt="Luxury Real Estate Advisory"
          fill
          sizes="100vw"
          className="object-cover scale-105 transition duration-700 ease-out group-hover:scale-110"
        />

        {/* OVERLAYS */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-24 h-[2px] bg-[#C8A45A]" />

      </div>
    </Reveal>

    {/* TEXT (FULL WIDTH BUT CONTROLLED PADDING) */}
    <div className="w-full px-6 md:px-16 lg:px-24 py-10 md:py-0">

      <p className="text-[#C8A45A] text-[10px] tracking-[0.35em] mb-5">
        FOR SERIOUS INVESTORS
      </p>

      <Reveal>
        <h2 className="text-2xl md:text-4xl leading-snug mb-6">
          Designed for Investors Who Value
          <span className="block italic text-[#C8A45A] mt-2">
            Precision Over Hype
          </span>
        </h2>
      </Reveal>

      <Reveal>
        <div className="w-10 h-[1px] bg-[#C8A45A] mb-8" />
      </Reveal>

      <div className="space-y-5">

        {[
          "Deploying ₹5Cr+ into luxury real estate assets",
          "Seeking pre-launch or discreet off-market access",
          "NRI & HNI investors focused on strategic entry",
          "Prioritising long-term value over short-term noise",
        ].map((item, i) => (
          <Reveal key={i}>
            <div className="flex gap-4 items-start">
              <div className="w-3 h-[1px] bg-[#C8A45A] mt-3" />
              <p className="text-[#9a9a9a] text-sm leading-relaxed">
                {item}
              </p>
            </div>
          </Reveal>
        ))}

      </div>

    </div>

  </div>
</section>
<section className="relative py-20 md:py-32 overflow-hidden">

  {/* 🔥 ANIMATED GOLD GLOW */}
  <div className="absolute inset-0 -z-10 overflow-hidden">

    <motion.div
      animate={{ x: ["-20%", "20%", "-20%"], y: ["-10%", "10%", "-10%"] }}
      transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      className="absolute w-[600px] h-[600px] bg-[#C8A45A]/10 blur-[140px] rounded-full"
    />

    <motion.div
      animate={{ x: ["20%", "-20%", "20%"], y: ["10%", "-10%", "10%"] }}
      transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      className="absolute right-0 w-[400px] h-[400px] bg-[#C8A45A]/5 blur-[120px] rounded-full"
    />

  </div>

  {/* FULL WIDTH CONTAINER */}
  <div className="w-full">

    {/* CARD */}
    <div className="relative w-full bg-[#0f0f0f]/90 backdrop-blur-sm 
                    border-y border-[#1a1a1a] 
                    px-5 md:px-16 lg:px-24 
                    py-10 md:py-16 
                    grid md:grid-cols-2 gap-10 md:gap-16 items-center
                    hover:border-[#C8A45A]/30 transition duration-500">

      {/* LEFT: VIDEO */}
      <Reveal>
        <div className="flex justify-center md:justify-start">
          <div className="relative w-full max-w-[420px] aspect-[4/5] bg-black overflow-hidden group">

            <video
              src="/videos/interview.mp4"
              controls
              className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

          </div>
        </div>
      </Reveal>

      {/* RIGHT: TEXT */}
      <div className="w-full">

        <Reveal>
          <p className="text-[#C8A45A] text-[10px] tracking-[0.35em] mb-5">
            FEATURED
          </p>
        </Reveal>

        <Reveal>
          <h2 className="text-xl md:text-3xl lg:text-4xl mb-5 text-[#E8E2D9] leading-snug">
            How High-Net-Worth Investors Secure
            <span className="block italic text-[#C8A45A] mt-1">
              Private Luxury Opportunities
            </span>
          </h2>
        </Reveal>

        <Reveal>
          <p className="text-[#8A8A8A] text-sm md:text-base leading-relaxed">
            A deep dive into Gurugram’s evolving luxury market — uncovering how
            off-market deals are accessed, timed, and structured for maximum value.
          </p>
        </Reveal>

        {/* GOLD DIVIDER */}
        <Reveal>
          <div className="w-10 h-[1px] bg-[#C8A45A] my-6" />
        </Reveal>

        <Reveal>
          <p className="text-[#C8A45A] text-[11px] tracking-[0.15em]">
            Exclusive insights • Market timing • Private inventory
          </p>
        </Reveal>

      </div>

    </div>

  </div>
</section>

{/* ═════════ AUTHORITY (WITH IMAGE) ═════════ */}
<section className="py-24 md:py-36 px-5">
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">

    {/* IMAGE */}
    <div className="order-1 md:order-2">
      <Reveal>
  <div className="relative w-full h-[340px] md:h-[520px] overflow-hidden group">

    <Image
      src="/images/authority.jpg"
      alt="Luxury Real Estate Advisory"
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
      className="object-cover scale-105 transition duration-700 group-hover:scale-110"
    />

    {/* OVERLAY */}
    <div className="absolute inset-0 bg-black/50" />

    {/* GRADIENT */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

    {/* GOLD LINE */}
    <div className="absolute bottom-0 left-0 w-20 h-[2px] bg-[#C8A45A]" />

  </div>
</Reveal>
    </div>

    {/* TEXT */}
    <div className="max-w-xl order-2 md:order-1 mt-8 md:mt-0">

      <Reveal>
        <p className="text-[#C8A45A] text-[10px] tracking-[0.35em] mb-5">
          AUTHORITY
        </p>
      </Reveal>

      <Reveal>
        <h2 className="text-2xl md:text-4xl text-[#E8E2D9] leading-snug mb-6">
          Strategic Precision Behind
          <span className="block italic text-[#C8A45A] mt-1">
            Every Investment Decision
          </span>
        </h2>
      </Reveal>

      <Reveal>
        <p className="text-[#8A8A8A] text-sm md:text-base leading-relaxed max-w-lg">
          A decade of guiding high-net-worth investors in acquiring premium real estate assets across Gurugram - with a focus on timing, access, and long-term value creation.
        </p>
      </Reveal>

      <Reveal>
        <div className="w-10 h-[1px] bg-[#C8A45A] my-6" />
      </Reveal>

      <Reveal>
        <p className="text-[#C8A45A] text-[11px] tracking-[0.15em]">
          Off-market opportunities • Direct developer access • Discreet transactions
        </p>
      </Reveal>

    </div>

  </div>
</section>
{/* ═════════ GLOBAL → INDIA → LAMBORGHINI (ELITE VERSION) ═════════ */}
<section  id="new-launch" data-section="new-launch" className="py-24 md:py-36 px-5 bg-[#0f0f0f] relative overflow-hidden">

  {/* GLOW */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute w-[600px] h-[600px] bg-[#C8A45A]/10 blur-[160px] rounded-full left-[10%] top-[-100px]" />
  </div>

  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

    {/* LEFT SIDE - TEXT */}
    <div>

      <p className="text-[#C8A45A] text-[10px] tracking-[0.4em] mb-6">
        GLOBAL LAUNCH
      </p>

      <h2 className="text-3xl md:text-5xl text-[#E8E2D9] leading-tight mb-6">
        The Next Global Luxury Drop
        <span className="block italic text-[#C8A45A] mt-2">
          Now in Gurugram
        </span>
      </h2>

      <p className="text-[#8A8A8A] text-sm md:text-base leading-relaxed mb-8 max-w-lg">
        From Miami to Dubai, branded residences sell out within days.
        Lamborghini Residences now bring that same global demand,
        design, and exclusivity to India.
      </p>

      {/* PRICE */}
      <p className="text-[#E8E2D9] text-lg mb-1">
        ₹4.8Cr+ Entry (Pre-Launch)
      </p>

      <p className="text-[#666] text-xs mb-6">
        ₹24,000/sq.ft • Inaugural Pricing
      </p>

      {/* FOMO */}
      <p className="text-[#C8A45A] text-xs tracking-[0.15em] mb-8">
        Expected to sell out within days of launch
      </p>

      {/* CTA */}
      <button
        onClick={() =>
          document.getElementById("final-cta")?.scrollIntoView({ behavior: "smooth" })
        }
        className="bg-[#C8A45A] text-black px-8 py-3 text-sm tracking-[0.15em] hover:opacity-90 transition"
      >
        GET EARLY ALLOCATION
      </button>

    </div>

    {/* RIGHT SIDE - IMAGE COLLAGE */}
    <div className="relative h-[500px] md:h-[600px]">

      {/* MAIN IMAGE */}
      <div className="absolute w-[70%] h-[70%] top-0 right-0 overflow-hidden rounded-xl">
        <Image
          src="/images/lamborghini.png"
          alt="Main"
          fill
          className="object-cover"
        />
      </div>

      {/* SMALL IMAGE 1 */}
      <div className="absolute w-[45%] h-[40%] bottom-0 left-0 overflow-hidden rounded-xl border border-[#C8A45A]/20">
        <Image
          src="/images/lambo.png"
          alt="Interior"
          fill
          className="object-cover"
        />
      </div>

      {/* SMALL IMAGE 2 */}
      <div className="absolute w-[35%] h-[30%] top-[50%] left-[10%] overflow-hidden rounded-xl border border-[#C8A45A]/20">
        <Image
          src="/images/lamborgini-lifestyle.png"
          alt="Detail"
          fill
          className="object-cover"
        />
      </div>

    </div>

  </div>

  {/* BOTTOM LINE */}
  <div className="text-center mt-20 max-w-xl mx-auto">
    <p className="text-[#8A8A8A] text-sm">
      Pre-launch access is where real advantage is created.
    </p>
  </div>

</section>

{/* ═════════ TRACK RECORD (PREMIUM FIXED) ═════════ */}
<section className="py-24 md:py-32 px-5 bg-[#0a0a0a]">

  <div className="max-w-6xl mx-auto">

    {/* LABEL */}
    <p className="text-[#C8A45A] text-[10px] tracking-[0.35em] mb-5">
      TRACK RECORD
    </p>

    {/* HEADING */}
    <h2 className="text-2xl md:text-4xl text-[#E8E2D9] mb-16 max-w-2xl leading-snug">
      Proven Access to
      <span className="block italic text-[#C8A45A] mt-1">
        High-Performing Luxury Assets
      </span>
    </h2>

    {/* GRID */}
    <div className="grid md:grid-cols-2 gap-8">

      {/* WESTIN */}
      <div className="group bg-[#111] border border-[#1a1a1a] hover:border-[#C8A45A]/30 transition duration-500 overflow-hidden">

        {/* IMAGE */}
        <div className="relative h-[300px] md:h-[360px] overflow-hidden">
          <Image
            src="/images/westin.jpg"
            alt="Westin Residences"
            fill
            className="object-cover transition duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        {/* CONTENT */}
        <div className="p-6">

          <h3 className="text-[#E8E2D9] text-lg mb-2">
            Westin Residences
          </h3>

          <p className="text-[#C8A45A] text-sm mb-3">
            ₹6.5Cr → ₹7.22Cr
          </p>

          <p className="text-[#8A8A8A] text-sm leading-relaxed">
            ~35% return on deployed capital through structured pre-launch entry.
          </p>

          <div className="w-8 h-[1px] bg-[#C8A45A] mt-5 group-hover:w-12 transition-all duration-300" />

        </div>

      </div>

      {/* ELIE SAAB */}
      <div className="group bg-[#111] border border-[#1a1a1a] hover:border-[#C8A45A]/30 transition duration-500 overflow-hidden">

        {/* IMAGE */}
        <div className="relative h-[300px] md:h-[360px] overflow-hidden">
          <Image
            src="/images/elie-saab.webp"
            alt="Elie Saab Residences"
            fill
            className="object-cover transition duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        {/* CONTENT */}
        <div className="p-6">

          <h3 className="text-[#E8E2D9] text-lg mb-2">
            Elie Saab Residences
          </h3>

          <p className="text-[#C8A45A] text-sm mb-3">
            Off-Market Allocation
          </p>

          <p className="text-[#8A8A8A] text-sm leading-relaxed">
            Secured exclusive inventory before public release with high demand positioning.
          </p>

          <div className="w-8 h-[1px] bg-[#C8A45A] mt-5 group-hover:w-12 transition-all duration-300" />

        </div>

      </div>

    </div>

  </div>
</section>
{/* ═════════ RECOGNITION (AUTO SCROLL PREMIUM) ═════════ */}
<section className="py-20 md:py-28 px-5 bg-[#0f0f0f] overflow-hidden">
  <div className="max-w-6xl mx-auto text-center">

    {/* LABEL */}
    <p className="text-[#C8A45A] text-[10px] tracking-[0.35em] mb-6">
      RECOGNITION
    </p>

    {/* HEADING */}
    <h2 className="text-[#E8E2D9] text-xl md:text-2xl mb-4">
      Recognised Across Industry Platforms
    </h2>

    {/* SUBTEXT (optional but powerful) */}
    <p className="text-[#8A8A8A] text-xs md:text-sm mb-12">
      Featured across leading real estate platforms and industry awards
    </p>

    {/* SCROLL WRAPPER */}
    <div className="relative">

      {/* SCROLL TRACK */}
      <div className="flex gap-6 md:gap-10 w-full animate-scroll">

        {[
          "/images/awards/1.jpg",
          "/images/awards/2.jpg",
          "/images/awards/3.jpg",
          "/images/awards/4.jpg",
        ]
          .concat([
            "/images/awards/1.jpg",
            "/images/awards/2.jpg",
            "/images/awards/3.jpg",
            "/images/awards/4.jpg",
          ]) // duplicate for loop
          .map((img, i) => (
            <div
              key={i}
              className="relative min-w-[200px] md:min-w-[240px] h-[260px] md:h-[300px] overflow-hidden group rounded-sm"
            >

              {/* IMAGE */}
              <Image
                src={img}
                alt="Award Recognition"
                fill
                sizes="(max-width: 768px) 200px, (max-width: 1200px) 240px, 240px"
                className="object-cover transition duration-700 ease-out group-hover:scale-105"
              />

              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition duration-500" />

              {/* GRADIENT DEPTH */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            </div>
          ))}

      </div>

      {/* LEFT FADE */}
      <div className="absolute left-0 top-0 h-full w-16 md:w-24 bg-gradient-to-r from-[#0f0f0f] to-transparent pointer-events-none" />

      {/* RIGHT FADE */}
      <div className="absolute right-0 top-0 h-full w-16 md:w-24 bg-gradient-to-l from-[#0f0f0f] to-transparent pointer-events-none" />

    </div>

  </div>
</section>
     {/* ═════════ STRATEGIC ADVISORY (PREMIUM) ═════════ */}
<section id="advisory" data-section="advisory" className="py-24 md:py-36 px-5 bg-[#0f0f0f]">
  <div className="max-w-6xl mx-auto">

    {/* LABEL */}
    <p className="text-[#C8A45A] text-[10px] tracking-[0.35em] mb-5">
      STRATEGIC ADVISORY
    </p>

    {/* HEADING */}
    <Reveal>
      <h2 className="text-2xl md:text-4xl text-[#E8E2D9] mb-16 max-w-2xl leading-snug">
        A Structured Approach to
        <span className="block italic text-[#C8A45A] mt-1">
          High-Value Real Estate Investing
        </span>
      </h2>
    </Reveal>

    {/* GRID */}
    <div className="grid md:grid-cols-3 gap-8">

      {[
        {
          step: "01",
          title: "Strategic Identification",
          desc: "Curating high-potential assets based on timing, demand cycles, and long-term appreciation.",
        },
        {
          step: "02",
          title: "Private Acquisition",
          desc: "Securing early access inventory through direct developer relationships and structured negotiation.",
        },
        {
          step: "03",
          title: "Value Optimisation",
          desc: "Positioning assets for maximum growth through timing, holding strategy, and exit planning.",
        },
      ].map((item, i) => (
        <Reveal key={i}>
          <div className="group relative p-8 bg-[#111] border border-[#1a1a1a] hover:border-[#C8A45A]/30 transition duration-500">

            {/* STEP */}
            <span className="text-[#C8A45A]/40 text-xs mb-3 block">
              {item.step}
            </span>

            {/* TITLE */}
            <h3 className="text-[#E8E2D9] text-lg mb-3">
              {item.title}
            </h3>

            {/* DESC */}
            <p className="text-[#8A8A8A] text-sm leading-relaxed">
              {item.desc}
            </p>

            {/* GOLD LINE */}
            <div className="w-8 h-[1px] bg-[#C8A45A] mt-6 group-hover:w-12 transition-all duration-300" />

          </div>
        </Reveal>
      ))}

    </div>

    {/* CTA */}
    <Reveal>
      <div className="mt-20 text-center">

        <p className="text-[#8A8A8A] text-sm mb-6">
          A discreet, end-to-end system designed for serious investors.
        </p>

       <button
  onClick={() =>
    document.getElementById("final-cta")?.scrollIntoView({ behavior: "smooth" })
  }
  className="bg-[#C8A45A] text-black px-8 py-3 text-sm tracking-[0.1em] hover:opacity-90 transition"
>
  Request Private Consultation
</button>
      </div>
    </Reveal>

  </div>
</section>

 <section id="insights" className="section-dark">
      <div className="section-inner text-center">

        {/* LABEL */}
        <p className="text-[#C8A45A] text-[10px] tracking-[0.35em] mb-4">
          TRUST & INSIGHTS
        </p>

        {/* HEADING */}
        <Reveal>
          <h2 className="text-2xl md:text-4xl mb-14 md:mb-16 max-w-3xl mx-auto leading-snug">
            Trusted by Investors, Backed by Leading Developers
          </h2>
        </Reveal>

        {/* LOGOS */}
        <Reveal>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14 opacity-60 mb-16">
            {["DLF", "M3M", "Trump", "EMAAR", "Adani"].map((brand, i) => (
              <div
                key={i}
                className="text-sm tracking-widest text-[#aaa] hover:text-white transition duration-300"
              >
                {brand}
              </div>
            ))}
          </div>
        </Reveal>

        {/* 🎥 VIDEO CAROUSEL */}
        <Reveal>
          <div className="relative flex items-center justify-center">

            {/* GRADIENT EDGES */}
            <div className="absolute left-0 top-0 h-full w-24 md:w-32 bg-gradient-to-r from-[#0f0f0f] to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 h-full w-24 md:w-32 bg-gradient-to-l from-[#0f0f0f] to-transparent z-20 pointer-events-none" />

            {/* LEFT BUTTON */}
            <button
              onClick={prevSlide}
              className="absolute left-2 md:left-0 z-30 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 p-3 rounded-full transition"
            >
              <ChevronLeft size={18} />
            </button>

            {/* RIGHT BUTTON */}
            <button
              onClick={next}
              className="absolute right-2 md:right-0 z-30 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 p-3 rounded-full transition"
            >
              <ChevronRight size={18} />
            </button>

            {/* SLIDER */}
            <div className="relative w-full max-w-5xl flex items-center justify-center h-[260px] md:h-[360px]">

              {videos.map((src, i) => {
                const isActive = i === activeIndex;
                const isLeft =
                  i === (activeIndex - 1 + videos.length) % videos.length;
                const isRight =
                  i === (activeIndex + 1) % videos.length;

                return (
                  <motion.div
                    key={i}
                    animate={{
                      scale: isActive ? 1 : 0.8,
                      opacity: isActive ? 1 : 0.25,
                      x: isActive ? 0 : isLeft ? -260 : isRight ? 260 : 0,
                      rotate: isActive ? 0 : isLeft ? -6 : isRight ? 6 : 0,
                      filter: isActive ? "blur(0px)" : "blur(3px)",
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute w-[300px] md:w-[440px] aspect-[4/3] bg-black overflow-hidden rounded-xl shadow-lg"
                    style={{
                      zIndex: isActive ? 10 : 1,
                    }}
                  >
                    <video
                      src={src}
                      controls={isActive}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                );
              })}

            </div>
          </div>
        </Reveal>
      </div>
    </section>
    
{/* ═════════ WHY CLIENTS CHOOSE US (HERO BG) ═════════ */}
<section id="why" data-section="why"
  className="relative py-24 md:py-36 px-5 overflow-hidden bg-cover bg-center"
  style={{
    backgroundImage: "url('/images/luxury-bg.jpg')",
  }}
>

  {/* DARK OVERLAY */}
  <div className="absolute inset-0 bg-black/60" />

  {/* GRADIENT */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/80" />

  {/* CONTENT */}
  <div className="relative z-10 max-w-6xl mx-auto">

    {/* LABEL */}
    <p className="text-[#C8A45A] text-[10px] tracking-[0.35em] mb-5">
      DIFFERENTIATION
    </p>

    {/* HEADING */}
    <Reveal>
      <h2 className="text-2xl md:text-4xl text-[#E8E2D9] mb-16 max-w-2xl leading-snug">
        Why High-Net-Worth Investors
        <span className="block italic text-[#C8A45A] mt-1">
          Choose Strategic Advisory
        </span>
      </h2>
    </Reveal>

    {/* GLASS CARD */}
    <div className="bg-black/40 backdrop-blur-md border border-white/10 p-8 md:p-12">

      <div className="grid md:grid-cols-2 gap-10 md:gap-16">

        {[
          {
            title: "Off-Market Access",
            desc: "Opportunities not publicly listed, available only through direct relationships.",
          },
          {
            title: "Direct Developer Network",
            desc: "Strong connections ensuring priority allocation and early entry pricing.",
          },
          {
            title: "Negotiation Advantage",
            desc: "Structured deals designed to maximise value and minimise downside risk.",
          },
          {
            title: "Portfolio-First Approach",
            desc: "Focused on long-term asset growth, not just individual transactions.",
          },
        ].map((item, i) => (
          <Reveal key={i}>
            <div className="group">
              <h3 className="text-[#E8E2D9] text-lg mb-2">
                {item.title}
              </h3>

              <p className="text-[#B0B0B0] text-sm leading-relaxed max-w-md">
                {item.desc}
              </p>

              <div className="w-8 h-[1px] bg-[#C8A45A] mt-4 group-hover:w-12 transition-all duration-300" />
            </div>
          </Reveal>
        ))}

      </div>

    </div>

  </div>
</section>
     {/* ═════════ FINAL CTA (PREMIUM CLOSE) ═════════ */}

<section
  id="final-cta"
  className="relative py-28 md:py-36 px-5 overflow-hidden"
>
  {/* BACKGROUND */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: "url('/images/luxury-bg.jpg')" }}
  />

  {/* OVERLAY */}
  <div className="absolute inset-0 bg-black/80" />

  <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

    {/* LEFT SIDE */}
    <div>

      <p className="text-[#C8A45A] text-[10px] tracking-[0.35em] mb-6">
        PRIVATE ACCESS
      </p>

      <h2 className="text-2xl md:text-4xl text-[#E8E2D9] mb-6 leading-snug">
        Apply for Access to
        <span className="block italic text-[#C8A45A] mt-2">
          Off-Market Opportunities
        </span>
      </h2>

      <p className="text-[#B0B0B0] text-sm md:text-base mb-8 max-w-md">
        This is not a public enquiry form. Only a limited number of serious
        investors are onboarded each month.
      </p>

      <div className="space-y-3 text-sm text-[#C8A45A]">
        <p>✔ Direct developer access</p>
        <p>✔ Pre-launch inventory advantage</p>
        <p>✔ Strategic investment guidance</p>
      </div>

    </div>

    {/* RIGHT SIDE FORM */}
    <div className="bg-[#0f0f0f]/90 backdrop-blur-md border border-[#1a1a1a] p-6 md:p-8">

    <form
  onSubmit={async (e) => {
  e.preventDefault();

  setLoading(true);
  setSuccess(false);

  const form = e.target as HTMLFormElement;
  const data = new FormData(form);

  const payload = {
    name: data.get("name"),
    phone: data.get("phone"),
    email: data.get("email"),
    budget: data.get("budget"),
    purpose: data.get("purpose"),
    message: data.get("message"),
  };

  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setSuccess(true);
      form.reset();
    } else {
      alert("Something went wrong.");
    }
  } catch (error) {
    alert("Network error. Try again.");
  } finally {
    setLoading(false);
  }
}}

  className="space-y-4"
>

        {/* NAME */}
        <div className="relative">
          <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777]" />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="w-full bg-black border border-[#1f1f1f] pl-10 pr-4 py-3 text-sm text-white outline-none focus:border-[#C8A45A] focus:shadow-[0_0_0_1px_#C8A45A]"
          />
        </div>

        {/* PHONE */}
        <div className="relative">
          <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777]" />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
            className="w-full bg-black border border-[#1f1f1f] pl-10 pr-4 py-3 text-sm text-white outline-none focus:border-[#C8A45A] focus:shadow-[0_0_0_1px_#C8A45A]"
          />
        </div>

        {/* EMAIL */}
        <div className="relative">
          <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777]" />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full bg-black border border-[#1f1f1f] pl-10 pr-4 py-3 text-sm text-white outline-none focus:border-[#C8A45A] focus:shadow-[0_0_0_1px_#C8A45A]"
          />
        </div>

        {/* BUDGET */}
        <div className="relative">
          <IndianRupee size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777]" />
          <select
            name="budget"
            required
            className="w-full bg-black border border-[#1f1f1f] pl-10 pr-4 py-3 text-sm text-white outline-none focus:border-[#C8A45A] focus:shadow-[0_0_0_1px_#C8A45A]"
          >
            <option value="">Investment Budget</option>
            <option value="1-3cr">₹1Cr – ₹3Cr</option>
            <option value="3-5cr">₹3Cr – ₹5Cr</option>
            <option value="5cr+">₹5Cr+</option>
          </select>
        </div>

        {/* PURPOSE */}
        <select
          name="purpose"
          required
          className="w-full bg-black border border-[#1f1f1f] px-4 py-3 text-sm text-white outline-none focus:border-[#C8A45A] focus:shadow-[0_0_0_1px_#C8A45A]"
        >
          <option value="">Purpose</option>
          <option value="investment">Investment</option>
          <option value="end-use">End Use</option>
          <option value="nri">NRI Investment</option>
        </select>

        {/* MESSAGE */}
        <textarea
          name="message"
          placeholder="Additional details (optional)"
          rows={3}
          className="w-full bg-black border border-[#1f1f1f] px-4 py-3 text-sm text-white outline-none focus:border-[#C8A45A] focus:shadow-[0_0_0_1px_#C8A45A]"
        />

        {/* SUBMIT */}
       <button
  type="submit"
  disabled={loading}
  className="w-full bg-[#C8A45A] text-black py-3 text-sm tracking-[0.1em] hover:opacity-90 transition disabled:opacity-60"
>
  {loading ? "Submitting..." : "Apply for Private Access"}
</button>

{success && (
  <div className="mb-4 p-4 border border-green-500/30 bg-green-500/10 text-green-400 text-sm text-center">
    ✅ Application submitted successfully. Our team will contact you shortly.
  </div>
)}
      </form>

      <p className="text-[#666] text-xs mt-4 text-center">
        Discreet • Confidential • No Spam
      </p>

    </div>

  </div>
</section>
      <Footer />

    </main>
  );
}