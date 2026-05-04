"use client";

import Link from "next/link";
import { Instagram, Twitter, Youtube } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Logo from "./Logo";
import Button from "@/components/ui/Button";
import Flip3DText from "@/components/animations/Flip3DText";

const mainPages = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Models", href: "/models" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const socialLinks = [
  { name: "Instagram", href: "#", icon: Instagram },
  { name: "Twitter (X)", href: "#", icon: Twitter },
  { name: "YouTube", href: "#", icon: Youtube },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
    },
  },
};

const listItemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.05,
      ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
    },
  }),
};

export default function Footer() {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.2 });

  return (
    <motion.footer
      ref={footerRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="bg-noir text-pure pt-16 pb-8 border-t border-coal"
    >
      <div className="w-full max-w-[1315px] mx-auto px-5 xl:px-0">
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <motion.div
              variants={itemVariants}
              className="mb-4 flex justify-start"
            >
              <Logo />
            </motion.div>
            <motion.p
              variants={itemVariants}
              className="text-slate max-w-md mb-6"
            >
              Falconics Pink is a women-centric luxury car rental service in
              Dubai, offering curated premium cars, trusted women drivers, and
              seamless, secure bookings.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Button
                href="/contact"
                variant="rounded-outline"
                showArrow={true}
                className="text-pure border-pure"
              >
                Book Now
              </Button>
            </motion.div>
          </motion.div>

          {/* Main Pages */}
          <motion.div variants={itemVariants}>
            <motion.h3
              variants={itemVariants}
              className="text-lg font-semibold mb-4 text-solis"
            >
              Main Pages
            </motion.h3>
            <ul className="space-y-1">
              {mainPages.map((page, index) => (
                <motion.li
                  key={page.name}
                  custom={index}
                  variants={listItemVariants}
                >
                  <Link
                    href={page.href}
                    className="text-pure transition-colors"
                  >
                    <Flip3DText
                      defaultContent={
                        <span className="text-pure text-left">{page.name}</span>
                      }
                      hoverContent={
                        <span className="text-pure text-left">{page.name}</span>
                      }
                      axis="x"
                      duration={0.6}
                      transformOrigin="left center"
                      className="w-full"
                    />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Follow Us */}
          <motion.div variants={itemVariants}>
            <motion.h3
              variants={itemVariants}
              className="text-lg font-semibold mb-4 text-solis"
            >
              Follow Us
            </motion.h3>
            <ul className="space-y-1">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.li
                    key={social.name}
                    custom={index}
                    variants={listItemVariants}
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pure transition-colors"
                    >
                      <Flip3DText
                        defaultContent={
                          <span className="flex items-center gap-2 text-pure text-left">
                            <IconComponent className="w-4 h-4 shrink-0" />
                            {social.name}
                          </span>
                        }
                        hoverContent={
                          <span className="flex items-center gap-2 text-pure text-left">
                            <IconComponent className="w-4 h-4 shrink-0" />
                            {social.name}
                          </span>
                        }
                        axis="x"
                        duration={0.6}
                        transformOrigin="left center"
                        className="w-full"
                      />
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="py-5 border-t border-slate/20 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <motion.div
            variants={itemVariants}
            className="text-slate text-sm flex items-center justify-center"
          >
            <span className="pb-[6px]">Powered by</span>{" "}
            <a
              href="https://backergysoft.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pure hover:text-solis transition-colors inline-block ml-1"
            >
              <Flip3DText
                defaultContent={
                  <span className="text-pure text-left">Backergysoft</span>
                }
                hoverContent={
                  <span className="text-pure text-left">Backergysoft</span>
                }
                axis="x"
                duration={0.6}
                transformOrigin="left center"
                className=""
              />
            </a>
          </motion.div>
          <motion.p variants={itemVariants} className="text-slate text-sm">
            © {new Date().getFullYear()} Falconics Pink. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
