"use client";

import Image from "next/image";
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
      <Image
        src="/logo.svg"
        alt="TONSOFT"
        width={550}
        height={550}
        priority
        className="h-11 w-auto sm:h-12 md:h-14"
      />
    </Link>
  );
}
