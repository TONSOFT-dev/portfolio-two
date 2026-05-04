"use client";

import Link from "next/link";
import Flip3D from "@/components/animations/Flip3D";
import { LOGO_CONFIG } from "./config";

interface LogoProps {
  onClick?: () => void;
}

export default function Logo({ onClick }: LogoProps) {
  return (
    <Link
      href="/"
      className="shrink-0 cursor-pointer block h-10 sm:h-14 md:h-16"
      onClick={onClick}
    >
      <Flip3D
        defaultImage={LOGO_CONFIG.src}
        hoverImage={LOGO_CONFIG.src}
        alt={LOGO_CONFIG.alt}
        width={LOGO_CONFIG.width}
        height={LOGO_CONFIG.height}
        axis="x"
        duration={0.6}
        className="h-full w-auto"
      />
    </Link>
  );
}
