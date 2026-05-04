"use client";

import Link from "next/link";

interface LogoProps {
  onClick?: () => void;
}

export default function Logo({ onClick }: LogoProps) {
  return (
    <Link
      href="/"
      className="shrink-0 cursor-pointer block"
      onClick={onClick}
      aria-label="TONSOFT Home"
    >
      <span
        className="font-bold tracking-tight leading-none"
        style={{ fontFamily: "var(--font-syne), sans-serif", fontSize: "clamp(1.4rem, 2.5vw, 1.75rem)" }}
      >
        <span style={{ color: "#ffffff" }}>TON</span>
        <span style={{ color: "#FE8F04" }}>SOFT</span>
      </span>
    </Link>
  );
}
