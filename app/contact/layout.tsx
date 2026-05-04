import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Get in Touch with Falconics Pink",
  description:
    "Contact Falconics Pink for luxury car rental inquiries, bookings, or support. Reach us via phone, email, or WhatsApp for instant assistance.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
