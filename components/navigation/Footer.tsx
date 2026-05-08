"use client";

import Link from "next/link";
import { Linkedin, Twitter, Github } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Logo from "./Logo";
import Button from "@/components/ui/Button";
import Flip3DText from "@/components/animations/Flip3DText";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Products", href: "/products" },
  // { name: "Tech Stack", href: "/tech-stack" },
  { name: "Projects", href: "/projects" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

const socialLinks = [
  { name: "LinkedIn", href: "https://linkedin.com/company/tonsoft", icon: Linkedin },
  // { name: "GitHub", href: "https://github.com/tonsoft", icon: Github },
 // { name: "Twitter (X)", href: "https://twitter.com/tonsoft", icon: Twitter },
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
      className="bg-noir text-pure pt-16 pb-8 border-t border-[rgba(254,143,4,0.15)]"
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
              className="text-slate max-w-md mb-6 leading-relaxed"
            >
              Building Scalable, Secure &amp; Intelligent Software Systems.
              Founded by a former Senior Engineer at Amazon Web Services — bringing
              global engineering standards to every project.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Button
                href="/contact"
                variant="rounded-outline"
                showArrow={true}
                className="text-pure border-solis hover:border-solis"
              >
                Get in Touch
              </Button>
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <motion.h3
              variants={itemVariants}
              className="text-lg font-semibold mb-4 text-solis"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Quick Links
            </motion.h3>
            <ul className="space-y-1">
              {quickLinks.map((page, index) => (
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
                        <span className="text-slate text-left hover:text-pure">{page.name}</span>
                      }
                      hoverContent={
                        <span className="text-left" style={{ color: "#FE8F04" }}>{page.name}</span>
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

          {/* Contact & Social */}
          <motion.div variants={itemVariants}>
            <motion.h3
              variants={itemVariants}
              className="text-lg font-semibold mb-4 text-solis"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Contact
            </motion.h3>
            <div className="space-y-3 mb-6">
              <p className="text-slate text-sm leading-relaxed">
                📧{" "}
                <a
                  href="mailto:info@tonsoft.org
                  "
                  className="hover:text-solis transition-colors"
                >
                  info@tonsoft.org
                </a>
              </p>
              <p className="text-slate text-sm leading-relaxed">
                📍 Sri Lanka · Available Globally Remote
              </p>
              <p className="text-slate text-sm leading-relaxed">
                🕐 Response within 24 hours
              </p>
            </div>

            <motion.h3
              variants={itemVariants}
              className="text-lg font-semibold mb-3 text-solis"
              style={{ fontFamily: "var(--font-syne)" }}
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
                          <span className="flex items-center gap-2 text-slate text-left">
                            <IconComponent className="w-4 h-4 shrink-0" />
                            {social.name}
                          </span>
                        }
                        hoverContent={
                          <span className="flex items-center gap-2 text-left" style={{ color: "#FE8F04" }}>
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
          className="py-5 border-t border-[rgba(254,143,4,0.15)] flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <motion.p variants={itemVariants} className="text-slate text-sm">
            © {new Date().getFullYear()} TONSOFT. All rights reserved. | Built with precision.
          </motion.p>
          <motion.p variants={itemVariants} className="text-slate text-sm">
            Sri Lanka · Global Remote
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
