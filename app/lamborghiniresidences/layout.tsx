import type { Metadata, Viewport } from "next";
export const metadata: Metadata = {
  metadataBase: new URL("https://shankarkohli.com"),

  title: {
    default:
      "Lamborghini Residences Gurgaon (Gurugram) | Ultra Luxury Living on SPR",
    template: "%s | Lamborghini Residences Gurgaon",
  },

  description:
    "Own a Lamborghini branded residence in Sector 71 Gurgaon (Gurugram). Ultra luxury 3 & 4 BHK apartments starting ₹5 Cr on Southern Peripheral Road.",

  keywords: [
    "Lamborghini Residences Gurgaon",
    "Lamborghini Residences Gurugram",
    "Luxury apartments Gurgaon",
    "Ultra luxury homes Gurugram",
    "SPR Gurgaon property",
    "Branded residences Gurgaon",
  ],

  authors: [{ name: "Shankar Kohli" }],
  creator: "Shankar Kohli",
  category: "Real Estate",

  icons: {
    icon: "/images/lambo/favicon.ico",
    shortcut: "/images/lambo/lamborghini.ico",
    apple: "/images/lambo/lamborghini.png",
  },

  openGraph: {
    type: "website",
    title:
      "Lamborghini Residences Gurgaon (Gurugram) | Ultra Luxury Apartments",
    description:
      "Experience Lamborghini living in Gurgaon (Gurugram). Limited residences starting ₹5 Cr on SPR.",
    url: "https://shankarkohli.com/lamborghiniresidences",

    images: [
      {
        url: "/images/lambo/og-lambo.png",
        width: 1200,
        height: 630,
        alt: "Lamborghini Residences Gurgaon Gurugram",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Lamborghini Residences Gurgaon (Gurugram) | Ultra Luxury Living",
    description:
      "Exclusive Lamborghini branded homes in Gurgaon (Gurugram) starting ₹5 Cr.",
    images: ["/images/lambo/og-lambo.png"],
  },

  alternates: {
    canonical: "/lamborghiniresidences",
  },

  robots: {
    index: true,
    follow: true,
  },
};

// ✅ THIS IS THE FIX
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function LamborghiniLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}