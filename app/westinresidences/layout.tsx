import type { Metadata } from "next";
import "./styles/westin.css";
import "swiper/css";
import "swiper/css/navigation";
export const metadata: Metadata = {
  title: {
    default: "Westin Residences | Luxury Living by Mark Real Esstate",
    template: "%s | Westin Residences",
  },
  description:
    "Discover Westin Residences – premium luxury homes crafted by Mark Real Esstate. Experience modern design, world-class amenities, and prime locations.",
  keywords: [
    "Westin Residences",
    "Mark Real Esstate",
    "Luxury Apartments",
    "Premium Homes",
    "Real Estate India",
  ],
  authors: [{ name: "Mark Real Estate" }],

  openGraph: {
    title: "Westin Residences | Luxury Living",
    description:
      "Premium residences by Mark Real Esstate with world-class amenities and elegant design.",
    url: "https://shankarkohli.com/westinresidences",
    siteName: "Westin Residences",
    images: [
      {
        url: "images/westin/favicon.ico", // add your OG image in public folder
        width: 1200,
        height: 630,
        alt: "Westin Residences",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Westin Residences",
    description:
      "Luxury living by Mark Real Estate. Explore premium residences.",
    images: ["/images/westin/favicon.ico"],
  },

  icons: {
    icon: "/images/westin/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}