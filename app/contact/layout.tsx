import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Get in Touch with TONSOFT",
  description:
    "Contact TONSOFT for a technical consultation on cloud architecture, legacy modernization, or full-stack product development. We respond within 24 hours.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
