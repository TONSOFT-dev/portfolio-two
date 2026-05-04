import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import { SmoothScrollProvider } from "@/components/animations/SmoothScrollProvider";
import CustomCursor from "@/components/ui/CustomCursor";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.falconicspink.com"),
  title: {
    default: "Falconics Pink - Women-Centric Luxury Car Rental in Dubai",
    template: "%s | Falconics Pink",
  },
  description:
    "Falconics Pink is a women-centric luxury car rental service in Dubai, offering curated premium cars, trusted women drivers, and seamless, secure bookings.",
  keywords: [
    "luxury car rental Dubai",
    "women car rental Dubai",
    "premium car rental UAE",
    "luxury car hire Dubai",
    "women drivers Dubai",
    "Falconics Pink",
  ],
  authors: [{ name: "Falconics Pink" }],
  creator: "Falconics Pink",
  publisher: "Falconics Pink",
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: "https://www.falconicspink.com",
    title: "Falconics Pink - Women-Centric Luxury Car Rental in Dubai",
    description:
      "Falconics Pink is a women-centric luxury car rental service in Dubai, offering curated premium cars, trusted women drivers, and seamless, secure bookings.",
    siteName: "Falconics Pink",
  },
  twitter: {
    card: "summary_large_image",
    title: "Falconics Pink - Women-Centric Luxury Car Rental in Dubai",
    description:
      "Falconics Pink is a women-centric luxury car rental service in Dubai, offering curated premium cars, trusted women drivers, and seamless, secure bookings.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={figtree.variable}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="antialiased">
        <CustomCursor />
        <SmoothScrollProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
