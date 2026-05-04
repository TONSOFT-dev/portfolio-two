import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import { SmoothScrollProvider } from "@/components/animations/SmoothScrollProvider";
import CustomCursor from "@/components/ui/CustomCursor";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tonsoft.org"),
  title: {
    default: "TONSOFT — Scalable Software Systems",
    template: "%s | TONSOFT",
  },
  description:
    "TONSOFT is a modern software company building scalable, secure, and intelligent software systems. Founded by a former Senior Engineer at Amazon Web Services.",
  keywords: [
    "software development",
    "cloud architecture",
    "AWS engineering",
    "distributed systems",
    "DevOps",
    "microservices",
    "TONSOFT",
    "enterprise software",
  ],
  authors: [{ name: "TONSOFT" }],
  creator: "TONSOFT",
  publisher: "TONSOFT",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tonsoft.org",
    title: "TONSOFT — Scalable Software Systems",
    description:
      "TONSOFT is a modern software company building scalable, secure, and intelligent software systems.",
    siteName: "TONSOFT",
  },
  twitter: {
    card: "summary_large_image",
    title: "TONSOFT — Scalable Software Systems",
    description:
      "TONSOFT is a modern software company building scalable, secure, and intelligent software systems.",
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
      className={`${syne.variable} ${inter.variable}`}
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
