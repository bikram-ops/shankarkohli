import Image from "next/image";

export default function Footer() {
  return (
    <footer className="px-6 md:px-10 py-16 bg-[#0f0f0f] border-t border-[#1a1a1a]">

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

        {/* LEFT: LOGO + BRAND */}
        <div>

          {/* LOGO */}
          <div className="mb-4 w-[140px]">
  <Image
    src="/images/logo.svg"
    alt="Mark Real Estate"
    width={140}
    height={20}
    className="w-full h-auto object-contain"
  />
</div>

          <p className="text-[#E8E2D9] text-sm">
            Shankar Kohli
          </p>

          <p className="text-[#8A8A8A] text-sm mt-1">
            Founder – Mark Real Esstate
          </p>

          <p className="text-[#8A8A8A] text-sm mt-2">
            Luxury Real Estate Advisory
          </p>

          <p className="text-[#8A8A8A] text-sm">
            Gurugram
          </p>
        </div>

        {/* CENTER: NAV */}
        <div className="flex flex-col gap-3">

          <p className="text-[#C8A45A] text-[10px] tracking-[0.35em] mb-2">
            NAVIGATION
          </p>

          <a href="#investors" className="text-[#8A8A8A] text-sm hover:text-[#E8E2D9] transition">
            Investors
          </a>

          <a href="#deals" className="text-[#8A8A8A] text-sm hover:text-[#E8E2D9] transition">
            Strategic Deals
          </a>

          <a href="#advisory" className="text-[#8A8A8A] text-sm hover:text-[#E8E2D9] transition">
            Advisory
          </a>

          <a href="#final-cta" className="text-[#8A8A8A] text-sm hover:text-[#E8E2D9] transition">
            Contact
          </a>

        </div>

        {/* RIGHT: CTA */}
        <div>

          <p className="text-[#C8A45A] text-[10px] tracking-[0.35em] mb-4">
            PRIVATE ACCESS
          </p>

          <p className="text-[#8A8A8A] text-sm mb-6 max-w-xs">
            Connect for discreet advisory and access to off-market opportunities.
          </p>

          <button
  onClick={() => {
    window.location.href =
      "mailto:info@markrealesstate.com?subject=Consultation Request&body=Hello,%0D%0A%0D%0AI would like to request a consultation.";
  }}
  className="bg-[#C8A45A] text-black px-6 py-2 text-sm tracking-[0.1em] hover:opacity-90 transition"
>
  Request Consultation
</button>

        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="mt-14 pt-6 border-t border-[#1a1a1a] flex flex-col md:flex-row justify-between items-center gap-4">

        <p className="text-[#666] text-xs">
          © 2026 Mark Real Esstate. All rights reserved.
        </p>

        <p className="text-[#666] text-xs tracking-wide">
          Discreet • Confidential • By Appointment Only
        </p>

      </div>

    </footer>
  );
}