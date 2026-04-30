"use client";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef , useState, useEffect  } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Image from "next/image";
import { ChevronLeft,  ChevronRight, User, Phone, Mail, IndianRupee  } from "lucide-react";

type Post = {
  slug: string;
  title: string;
  excerpt?: string;
  image?: string;
  readTime?: string;
};
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
type CaseStudy = {
  name: string;
  image: string;
  link?: string;
  insight: string;
  tag: string;

  // EXISTING (for graph UI)
  start?: number;
  mid?: number;
  end?: number;

  // NEW (for real investor storytelling)
  launchPrice?: string;
  currentPrice?: string;
  appreciation?: string;
  gain?: string;

  entryYear?: string;
  currentYear?: string;

  isAccessDeal?: boolean;
};
const caseStudies: CaseStudy[] = [
  // 💰 STRONG INVESTMENT OUTCOMES (PRIMARY)

  {
    name: "DLF The Arbour",
    image: "/images/arbour.webp",
    launchPrice: "₹6.5–7 Cr",
    currentPrice: "₹10–11 Cr+",
    appreciation: "50%–70%",
    gain: "₹3–4 Cr+",
    entryYear: "2023",
    currentYear: "2026",
    tag: "HIGH DEMAND",
    insight:
      "Entered during pre-launch inefficiency, capturing ₹3Cr+ upside within ~3 years as demand accelerated.",
  },

  {
    name: "Krisumi Waterfall Residences",
    image: "/images/krisumi.jpg",
    launchPrice: "₹2.3–3.3 Cr",
    currentPrice: "₹3.5–7 Cr+",
    appreciation: "60%–120%",
    gain: "₹1.5–3 Cr+",
    entryYear: "2020",
    currentYear: "2026",
    tag: "LONG TERM",
    insight:
      "Long-term hold aligned with brand-led demand delivered multi-year appreciation of up to 2x.",
  },

  {
    name: "Elan The Presidential",
    image: "/images/elan.jpg",
    launchPrice: "₹3.8–6 Cr",
    currentPrice: "₹5–8.5 Cr+",
    appreciation: "25%–60%",
    gain: "₹1–2.5 Cr+",
    entryYear: "2023",
    currentYear: "2026",
    tag: "VALUE UNLOCK",
    insight:
      "Early investor positioning captured price discovery during initial market expansion phase.",
  },

  {
    name: "Trevoc Royal Residences",
    image: "/images/trevoc_royal.avif",
    launchPrice: "₹6–6.5 Cr",
    currentPrice: "₹6.7–7.5 Cr",
    appreciation: "10%–20%",
    gain: "₹0.5–1 Cr",
    entryYear: "2024",
    currentYear: "2026",
    tag: "EARLY STAGE",
    insight:
      "Early-stage entry secured pricing advantage before broader market momentum builds.",
  },

  // 🎯 LIVE OPPORTUNITY (NOT CASE STUDY)

  {
    name: "Westin Residences",
    image: "/images/westin-residences.png",
    launchPrice: "₹6.5 Cr",
    currentPrice: "₹7.2 Cr+",
    appreciation: "~30%+",
    gain: "₹1 Cr+",
    entryYear: "2024",
    currentYear: "2026",
    link: "/westinresidences",
    tag: "LIVE OPPORTUNITY",
    insight:
      "Marriott-branded residences driving premium demand and strong early-stage appreciation.",
  },

  // 🔒 ACCESS DEAL (NO NUMBERS)

  {
    name: "Elie Saab Residences",
    image: "/images/elie-saab.webp",
    tag: "PRIVATE ACCESS",
    isAccessDeal: true,
    insight:
      "Pre-launch inventory secured through developer access before public release.",
  },

  // ⚠️ OPTIONAL (ONLY KEEP IF YOU ADD DATA)

  {
  name: "Tulip Monsella",
  image: "/images/tulip.webp",
  launchPrice: "₹18,000 / sq ft",
  currentPrice: "₹32,000 / sq ft",
  appreciation: "~75%+",
  gain: "₹14,000 / sq ft growth",
  entryYear: "2022",
  currentYear: "2026",
  tag: "MARKET GROWTH",
  insight:
    "Entered early on Golf Course Road, capturing ~75% appreciation as infrastructure and demand rapidly expanded. Future growth driven by premium micro-market positioning.",
}
];
function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

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

export default function Page({ posts }: { posts: Post[] }) {
const latestPosts = posts;
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
const scrollToSection = (id: string) => {
  if (typeof window !== "undefined") {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }
};
const next = () => {
  setActiveIndex((prev: number) => (prev + 1) % videos.length);
};

const prevSlide = () => {
  setActiveIndex((prev: number) => (prev - 1 + videos.length) % videos.length);
};

const GrowthLine = ({ start, mid, end }: any) => (
  (() => {
    const g1 = (mid - start) / start;
    const g2 = (end - mid) / mid;

    const baseY = 50;
    const maxGrowth = Math.max(g1, g2);
    const scale = 50 / maxGrowth;

    const yMid = baseY - g1 * scale;
    const yEnd = yMid - g2 * scale * 1.4;

    const path: string = `M0 ${baseY} C80 ${yMid + 10}, 120 ${yMid}, 160 ${yMid} S240 ${yEnd}, 300 ${yEnd}`;

    return (
      <div className="w-full h-[60px] mt-4">
        <svg viewBox="0 0 300 60" className="w-full h-full">

          {/* base */}
          <path d={path} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

          {/* gold animated line */}
          <path
            d={path}
            fill="none"
            stroke="#C8A45A"
            strokeWidth="2"
            strokeDasharray="400"
            strokeDashoffset="400"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="400"
              to="0"
              dur="2.5s"
              fill="freeze"
            />
          </path>

          {/* arrow */}
          <polygon points="0,-4 8,0 0,4" fill="#C8A45A">
            <animateMotion
              dur="2.5s"
              fill="freeze"
              rotate="auto"
              path={path}
            />
          </polygon>

        </svg>
      </div>
    );
  })()
);


const calculateROI = (start: number, end: number) =>
  Math.round(((end - start) / start) * 100);
/* COUNTER */
const Counter = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);

 useEffect(() => {
    let start = 0;
    const duration = 1200;
    const step = value / (duration / 16);

    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}%</span>;
};


const intervalRef = useRef<NodeJS.Timeout | null>(null);
const [isPaused, setIsPaused] = useState(false);
useEffect(() => {
  if (isPaused) return;

  intervalRef.current = setInterval(() => {
    setActiveIndex((prev) => (prev + 1) % caseStudies.length);
  }, 5500);

  return () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
}, [isPaused]);



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
  preload="auto"
    className="hidden md:block absolute inset-0 w-full h-full object-cover"
  >
    <source src="/videos/hero.mp4" type="video/mp4" />
  </video>

  {/* 🌑 OVERLAY */}
  <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

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
  sizes="(max-width: 768px) 100vw, 50vw"
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
  onClick={() => scrollToSection("final-cta")}
  className="flex-1 bg-[#C8A45A] text-black py-3 text-sm tracking-[0.08em]"
>
  Book Deep-Dive
</button>

     <button
  onClick={() => (window.location.href = "/case-studies")}
  className="flex-1 border border-white/30 text-white py-3 text-sm tracking-[0.08em]"
>
  Case Studies
</button>

    </div>

  </div>

</div>

</section>

<section id="about" data-section="about" className="hidden md:block py-20 md:py-28 px-5 bg-[#0f0f0f] border-t border-[#1a1a1a]">
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">

    {/* TEXT (LEFT) */}
    <div className="max-w-xl">

      <p className="text-[#C8A45A] text-[10px] tracking-[0.35em] mb-5">
        ABOUT SHANKAR KOHLI
      </p>

      <h2 className="text-3xl md:text-4xl text-[#E8E2D9] leading-snug mb-6">
        Trusted Advisor for
        <span className="block italic text-[#C8A45A] mt-1">
          Luxury Real Estate in Gurugram
        </span>
      </h2>

      <p className="text-[#8A8A8A] text-sm md:text-base leading-relaxed mb-5">
        Shankar Kohli is a luxury real estate advisor specialising in high-value
        investments across Gurugram, offering access to pre-launch inventory
        and off-market opportunities.
      </p>

      <p className="text-[#8A8A8A] text-sm md:text-base leading-relaxed">
        Working closely with HNI investors, he focuses on strategic entry,
        discretion, and long-term value creation in branded residences.
      </p>

      <div className="w-10 h-[1px] bg-[#C8A45A] mt-8" />

    </div>

    {/* IMAGE (RIGHT) */}
    <div className="relative w-full h-[520px] overflow-hidden group">

      <Image
        src="/images/shankar-kohli.jpeg"
        alt="Shankar Kohli Real Estate Advisor Gurugram"
        fill
        sizes="50vw"
        className="object-cover object-[90%_10%] transition duration-700 group-hover:scale-105"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      {/* GOLD LINE */}
      <div className="absolute bottom-0 right-0 w-20 h-[2px] bg-[#C8A45A]" />

    </div>

  </div>
</section>
<section
  id="investors"
  data-section="investors"
  className="py-20 md:py-32 bg-[#111111] border-t border-[#1a1a1a]"
>
  <div className="w-full grid md:grid-cols-2 items-center">

    {/* IMAGE (FULL BLEED) */}
    <Reveal>
      <div className="relative w-full h-[340px] md:h-[520px] overflow-hidden group">

        <Image
          src="/images/luxury-investor.jpg"
          alt="Luxury Real Estate Advisory"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
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
<section className="relative py-20 md:py-32 overflow-hidden bg-[#0c0c0c]">

  {/* 🔥 ANIMATED GOLD GLOW */}
  <div className="absolute inset-0 -z-10 overflow-hidden">

    <motion.div
      animate={{ x: ["-20%", "20%", "-20%"], y: ["-10%", "10%", "-10%"] }}
      transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      className="absolute w-[600px] h-[600px] bg-[#C8A45A]/10 blur-[60px] rounded-full"
    />

    <motion.div
      animate={{ x: ["20%", "-20%", "20%"], y: ["10%", "-10%", "10%"] }}
      transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      className="absolute right-0 w-[400px] h-[400px] bg-[#C8A45A]/5 blur-[60px] rounded-full"
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
              preload="auto"
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

{/* ═════════ GLOBAL → INDIA → LAMBORGHINI (ELITE VERSION) ═════════ */}
<section
  id="new-launch"
  data-section="new-launch"
  className="py-24 md:py-36 px-5 bg-[#121212] relative overflow-hidden"
>
  {/* 🔥 GLOW (optimized) */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute w-[600px] h-[600px] bg-[#C8A45A]/10 blur-[60px] rounded-full left-[10%] top-[-100px]" />
  </div>

  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

    {/* LEFT SIDE */}
    <div>

      <p className="text-[#C8A45A] text-[10px] tracking-[0.4em] mb-6">
        GLOBAL LAUNCH
      </p>

      <h2 className="text-3xl md:text-5xl text-[#E8E2D9] leading-tight mb-6">
        A Global Luxury Landmark
        <span className="block italic text-[#C8A45A] mt-2">
          Now Live in Gurugram
        </span>
      </h2>

      <p className="text-[#8A8A8A] text-sm md:text-base leading-relaxed mb-8 max-w-lg">
        From Miami to Dubai, branded residences define ultra-luxury living.
        Lamborghini Residences now bring that same global demand,
        design, and exclusivity to India — now officially launched.
      </p>

      {/* PRICE */}
      <p className="text-[#E8E2D9] text-lg mb-1">
        ₹4.75Cr+ Entry (Live Inventory)
      </p>

      <p className="text-[#666] text-xs mb-6">
        ₹24,000/sq.ft • Launch Phase Pricing
      </p>

      {/* URGENCY */}
      <p className="text-[#C8A45A] text-xs tracking-[0.15em] mb-8">
        Limited inventory remaining in initial phase
      </p>

      {/* CTA */}
      <div className="flex flex-wrap gap-3">

        {/* PRIMARY */}
        <button
          onClick={() => {
            if (typeof window !== "undefined") {
              window.location.href = "/lamborghiniresidences";
            }
          }}
          className="bg-[#C8A45A] text-black px-8 py-3 text-sm tracking-[0.15em] hover:opacity-90 transition"
        >
          EXPLORE PROJECT →
        </button>


      </div>

    </div>

    {/* RIGHT SIDE - IMAGE COLLAGE */}
   <div className="relative h-[420px] md:h-[605px]">

  {/* MAIN IMAGE */}
  <div className="relative w-full h-full overflow-hidden rounded-xl">

    <Image
      src="/images/lambo.webp"
      alt="Luxury Residences in Gurugram"
      fill
      sizes="(max-width: 768px) 100vw, 50vw"
      className="object-cover object-[50%_40%]"
    />

    {/* DARK OVERLAY */}
    <div className="absolute inset-0 bg-black/10" />

    {/* GRADIENT DEPTH */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

  
  </div>

</div>

  </div>

  {/* BOTTOM LINE */}
  <div className="text-center mt-20 max-w-xl mx-auto">
    <p className="text-[#8A8A8A] text-sm">
      Early-phase access is where the strongest long-term value is created.
    </p>
  </div>

</section>

<section className="py-24 md:py-32 px-5 bg-[#0a0a0a] border-y border-[#1a1a1a]">

  <div className="max-w-6xl mx-auto">

    {/* LABEL */}
    <p className="text-[#C8A45A] text-[10px] tracking-[0.35em] mb-5 text-center">
      TRACK RECORD
    </p>

    {/* HEADING */}
    <h2 className="text-2xl md:text-4xl text-[#E8E2D9] mb-16 max-w-2xl mx-auto text-center leading-snug">
      Proven Access to
      <span className="block italic text-[#C8A45A] mt-1">
        High-Performing Luxury Assets
      </span>
    </h2>

    {/* 🔥 PROJECT CARDS FIRST */}
    <div className="grid md:grid-cols-2 gap-8 mb-20">

      {/* WESTIN */}
      <Link href="/westinresidences" className="block">
        <div className="group cursor-pointer bg-[#111] border border-[#1a1a1a] 
                        hover:border-[#C8A45A]/40 
                        hover:shadow-[0_0_40px_rgba(200,164,90,0.08)] 
                        transition duration-500 overflow-hidden">

          <div className="relative h-[300px] md:h-[360px] overflow-hidden">
            <Image
              src="/images/westin.jpg"
              alt="Westin Residences"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>

          <div className="p-6 flex flex-col h-full">

  <h3 className="text-[#E8E2D9] text-lg mb-2 group-hover:text-white transition">
    Westin Residences
  </h3>

  <p className="text-[#C8A45A] text-sm mb-3">
    ₹6.5Cr → ₹7.22Cr
  </p>

  <p className="text-[#8A8A8A] text-sm leading-relaxed mb-6">
    ~35% return on deployed capital through structured pre-launch entry.
  </p>

  {/* 🔥 CTA */}
  <div className="mt-auto flex items-center justify-between">

    <span className="text-xs text-[#C8A45A] tracking-[0.15em] 
                     group-hover:translate-x-1 transition">
      View Full Project →
    </span>

    <div className="w-8 h-[1px] bg-[#C8A45A] 
                    group-hover:w-12 transition-all duration-300" />

  </div>

</div>
        </div>
      </Link>

      {/* ELIE SAAB */}
      <div className="group bg-[#111] border border-[#1a1a1a] hover:border-[#C8A45A]/30 transition duration-500 overflow-hidden">

        <div className="relative h-[300px] md:h-[360px] overflow-hidden">
          <Image
            src="/images/elie-saab.webp"
            alt="Elie Saab Residences"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        <div className="p-6">
          <h3 className="text-[#E8E2D9] text-lg mb-2">
            Elie Saab Residences
          </h3>
          <p className="text-[#C8A45A] text-sm mb-3">
            INVITE ONLY
          </p>
          <p className="text-[#8A8A8A] text-sm">
            Secured exclusive inventory before public release.
          </p>
        </div>

      </div>

    </div>

    {/* 🔥 STATS AT BOTTOM */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center border-t border-[#1a1a1a] pt-12">

      <div>
        <p className="text-2xl md:text-3xl text-[#C8A45A]">₹120Cr+</p>
        <p className="text-xs text-[#777] mt-1">Deals Facilitated</p>
      </div>

      <div>
        <p className="text-2xl md:text-3xl text-[#C8A45A]">40+</p>
        <p className="text-xs text-[#777] mt-1">Investors</p>
      </div>

      <div>
        <p className="text-2xl md:text-3xl text-[#C8A45A]">2X–3.5X</p>
        <p className="text-xs text-[#777] mt-1">Avg Growth</p>
      </div>

      <div>
        <p className="text-2xl md:text-3xl text-[#C8A45A]">5+ Years</p>
        <p className="text-xs text-[#777] mt-1">Experience</p>
      </div>

    </div>

  </div>
</section>


{/* ═════════ CASE STUDIES (ELITE VERSION) ═════════ */}
<section
  id="case-studies" 
  data-section="case-studies"
  className="py-24 md:py-32 px-5 bg-[#0e0e0e]"
>
  <div className="max-w-6xl mx-auto text-center">

    <p className="text-[#C8A45A] text-[10px] tracking-[0.4em] mb-6">
      STRATEGIC ENTRY CASE STUDIES
    </p>

    <h2 className="text-3xl md:text-5xl text-[#E8E2D9] mb-16 md:mb-20">
      Investment Strategies.
      <span className="block italic text-[#C8A45A] mt-2">
        Backed by Data & Access
      </span>
    </h2>

    {/* ✅ FIXED HEIGHT WRAPPER (NO CROP) */}
    <div className="relative w-full max-w-5xl mx-auto">

      {/* NAV */}
      <button
        onClick={() =>
          setActiveIndex((prev) =>
            (prev - 1 + caseStudies.length) % caseStudies.length
          )
        }
        className="absolute left-0 top-1/2 -translate-y-1/2 z-30 text-white/40 hover:text-white"
      >
        ←
      </button>

      <button
        onClick={() =>
          setActiveIndex((prev) =>
            (prev + 1) % caseStudies.length
          )
        }
        className="absolute right-0 top-1/2 -translate-y-1/2 z-30 text-white/40 hover:text-white"
      >
        →
      </button>

      {/* ✅ STACK CONTAINER */}
      <div className="relative flex items-center justify-center">

        {caseStudies.map((item, i) => {
          const isActive = i === activeIndex;

          return (
            <motion.div
              key={i}
              initial={false}
              animate={{
                scale: isActive ? 1 : 0.9,
                opacity: isActive ? 1 : 0,
                x: isActive ? 0 : i < activeIndex ? -220 : 220,
                position: isActive ? "relative" : "absolute",
                pointerEvents: isActive ? "auto" : "none", 
              }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              {/* ✅ CARD (AUTO HEIGHT — NO CROP EVER) */}
              <div className="bg-[#121212] border border-[#1f1f1f]">

                {/* IMAGE */}
                <div className="relative h-[220px] md:h-[260px]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    priority={isActive}
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className="p-6 md:p-8 text-left">

                  <p className="text-[10px] text-[#777] mb-2">
                    {item.tag}
                  </p>

                  <p className="text-[#C8A45A] text-xs mb-4">
                    {item.name}
                  </p>

                  {/* VALUE */}
                  {item.appreciation && (
                    <p className="text-3xl text-[#C8A45A] mb-2">
                      {item.appreciation}
                    </p>
                  )}

                  {item.gain && (
                    <p className="text-xs text-[#888] mb-4">
                      {item.gain} wealth created
                    </p>
                  )}

                  {/* PRICE */}
                  {item.launchPrice && item.currentPrice && (
                    <div className="mb-4 text-sm">
                      <div className="flex justify-between text-[#aaa]">
                        <span>Entry</span>
                        <span>{item.launchPrice}</span>
                      </div>
                      <div className="flex justify-between text-white mt-1">
                        <span>Current</span>
                        <span>{item.currentPrice}</span>
                      </div>
                    </div>
                  )}

                  {/* YEAR */}
                  {item.entryYear && item.currentYear && (
                    <p className="text-[11px] text-[#666] mb-4">
                      {item.entryYear} → {item.currentYear}
                    </p>
                  )}

                  {/* INSIGHT */}
                  <p className="text-[#8A8A8A] text-sm leading-relaxed">
                    {item.insight}
                  </p>

                  {/* CTA */}
                  <div className="mt-6 flex justify-between items-center">
                    <span className="text-xs text-[#666]">
                      PRIVATE ACCESS
                    </span>

                    {item.link ? (
                      <Link href={item.link}>
                        <span className="text-[#C8A45A] text-sm hover:translate-x-1 transition cursor-pointer">
                          VIEW →
                        </span>
                      </Link>
                    ) : (
                      <span className="text-[#666] text-sm">
                        INVITE ONLY
                      </span>
                    )}
                  </div>

                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>

  </div>

  {/* ✅ BUTTON ALWAYS VISIBLE */}
  <div className="mt-20 text-center">
    <Link href="/case-studies">
      <button className="group inline-flex items-center gap-2 px-8 py-3 
                        border border-[#C8A45A]/40 
                        text-[#C8A45A] text-sm tracking-[0.15em]
                        hover:bg-[#C8A45A] hover:text-black 
                        transition duration-300">

        VIEW ALL CASE STUDIES

        <span className="group-hover:translate-x-1 transition">
          →
        </span>
      </button>
    </Link>
  </div>
</section>


{/* ═════════ AUTHORITY (WITH IMAGE) ═════════ */}
<section className="py-24 md:py-36 px-5 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
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
{/* ═════════ MARKET INSIGHTS (BLOG) ═════════ */}
<section id="insights" data-section="insights" className="py-28 md:py-36 px-5 bg-[#0a0a0a]">

  <div className="max-w-6xl mx-auto text-center">

    {/* LABEL */}
    <p className="text-[#C8A45A] text-[10px] tracking-[0.4em] mb-6">
      MARKET INSIGHTS
    </p>

    {/* HEADING */}
    <h2 className="text-3xl md:text-5xl text-[#E8E2D9] mb-20">
      Strategic Thinking.
      <span className="block italic text-[#C8A45A] mt-2">
        Backed by Market Reality
      </span>
    </h2>

    {/* INSIGHTS GRID */}
    <div className="grid md:grid-cols-3 gap-8 text-left">

  {latestPosts.map((post, i) => (

    <Link key={i} href={`/insights/${post.slug}`}>

      <div className="group bg-[#111] border border-[#1a1a1a] p-6 
                      hover:border-[#C8A45A]/40 
                      hover:shadow-[0_0_30px_rgba(200,164,90,0.08)]
                      transition duration-500">

        {/* IMAGE */}
        <div className="relative h-[180px] mb-5 overflow-hidden">

          <Image
            src={post.image || `/insights/${post.slug}.jpg`}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition duration-500"
          />

          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* META */}
        <p className="text-[10px] text-[#666] mb-2 tracking-[0.15em]">
          {post.readTime || "3 MIN READ"}
        </p>

        {/* TITLE */}
        <h3 className="text-[#E8E2D9] text-lg mb-3 group-hover:text-white transition">
          {post.title}
        </h3>

        {/* EXCERPT */}
        <p className="text-[#8A8A8A] text-sm leading-relaxed mb-6">
          {post.excerpt}
        </p>

        {/* CTA */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#666]">
            READ INSIGHT
          </span>

          <span className="text-[#C8A45A] text-sm group-hover:translate-x-1 transition">
            →
          </span>
        </div>

      </div>

    </Link>

  ))}

</div>

    {/* VIEW ALL BLOG */}
    <div className="mt-16">

      <Link href="/insights">
        <button className="group inline-flex items-center gap-2 px-8 py-3 
                          border border-[#C8A45A]/40 
                          text-[#C8A45A] text-sm tracking-[0.15em]
                          hover:bg-[#C8A45A] hover:text-black 
                          transition duration-300">

          VIEW ALL INSIGHTS

          <span className="group-hover:translate-x-1 transition">
            →
          </span>

        </button>
      </Link>

    </div>

  </div>

</section>

{/* ═════════ RECOGNITION (AUTO SCROLL PREMIUM) ═════════ */}
<section className="py-20 md:py-28 px-5 bg-[#0c0c0c] overflow-hidden">
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
<section id="advisory" data-section="advisory" className="py-24 md:py-36 px-5 bg-[#111111]">
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
  onClick={() => scrollToSection("final-cta")}
  className="bg-[#C8A45A] text-black px-8 py-3 text-sm tracking-[0.1em] hover:opacity-90 transition"
>
  Request Private Consultation
</button>
      </div>
    </Reveal>

  </div>
</section>

 <section className="section-dark">
      <div className="section-inner text-center">

        {/* LABEL */}
        <p className="text-[#C8A45A] text-[10px] tracking-[0.35em] mb-4">
          TRUSTED BY SERIOUS INVESTORS
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
                    <div className="relative w-full h-full">

  {/* THUMBNAIL */}
  {!isActive && (
   <Image
  src={`/images/testimonials/thumb-${i + 1}.png`}
  alt="Video preview"
  fill
  sizes="(max-width: 768px) 300px, 440px"
  className="object-cover"
/>
  )}

  {/* VIDEO */}
  {isActive && (
   <video
  src={src}
  controls
  preload="none"
  poster={`/images/testimonials/thumb-${i + 1}.png`}
  className="w-full h-full object-cover"
/>
  )}

</div>
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
  <div className="absolute inset-0 bg-black/70" />

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
<p className="text-[#C8A45A] text-xs tracking-[0.15em] mb-6">
  Limited onboarding slots available this month
</p>
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
    <div className="bg-[#111]/90 backdrop-blur-md border border-[#1a1a1a] p-6 md:p-8"
    >

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

