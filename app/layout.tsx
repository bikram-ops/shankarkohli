import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default:
      "Luxury Real Estate in Gurugram | Shankar Kohli – Branded Residences & HNI Investments",
    template: "%s | Shankar Kohli",
  },

  description:
    "Explore luxury real estate in Gurugram with Shankar Kohli. Specializing in branded residences, ultra-luxury apartments, and high-return property investments for HNI & NRI clients.",

  keywords: [
    "Luxury real estate Gurugram",
    "Branded residences Gurgaon",
    "Ultra luxury homes India",
    "HNI property investment",
    "Shankar Kohli real estate",
  ],

  authors: [{ name: "Shankar Kohli" }],
  creator: "Shankar Kohli",

  metadataBase: new URL("https://shankarkohli.com"),

  openGraph: {
    title:
      "Luxury Real Estate in Gurugram | Shankar Kohli – Branded Residences",
    description:
      "Discover premium branded residences and ultra-luxury property investments in Gurugram with expert advisory.",
    url: "https://shankarkohli.com",
    siteName: "Shankar Kohli",
    images: [
      {
        url: "https://shankarkohli.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Luxury Real Estate in Gurugram",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Luxury Real Estate in Gurugram | Shankar Kohli",
    description:
      "Discover luxury homes and branded residences in Gurugram.",
    images: ["https://shankarkohli.com/images/og-image.jpg"],
  },

  robots: {
    index: true, // ✅ visible on Google
    follow: true,
  },

  alternates: {
    canonical: "https://shankarkohli.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} bg-[#0D0D0D] text-white antialiased overflow-x-hidden`}
      >
        {/* 🔥 META PIXEL */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', '1595376804911221');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* NOSCRIPT FALLBACK */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1595376804911221&ev=PageView&noscript=1"
          />
        </noscript>

        {/* 🔥 SEO SCHEMA */}
        <Script id="schema-person" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Shankar Kohli",
            jobTitle: "Luxury Real Estate Advisor",
            areaServed: "Gurugram, India",
            url: "https://shankarkohli.com",
          })}
        </Script>

        {/* APP */}
        <div className="w-full overflow-x-hidden">{children}</div>
      </body>
    </html>
  );
}