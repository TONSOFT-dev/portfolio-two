"use client";

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Flip3DText from "@/components/animations/Flip3DText";

interface AccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  selectedValue?: string;
}

export default function Accordion({
  title,
  children,
  defaultOpen = false,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-coal backdrop-blur-sm border border-ashen rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between gap-2 px-4 py-4 text-left transition-all duration-300 cursor-pointer outline-none focus:outline-none focus-visible:outline-none min-w-0 ${
          isOpen ? "border-b border-ashen" : "border-b border-transparent"
        }`}
      >
        <span className="text-pure text-lg font-light truncate flex-1 min-w-0">
          {title}
        </span>
        <ChevronDown
          className={`w-5 h-5 lg:w-6 lg:h-6 text-pure transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{
              duration: 0.3,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="overflow-hidden"
          >
            <div className="p-4">
              <div className="flex flex-col gap-1">{children}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface AccordionItemProps {
  label: string;
  value: string;
  isSelected: boolean;
  onClick: () => void;
}

export function AccordionItem({
  label,
  isSelected,
  onClick,
}: AccordionItemProps) {
  return (
    <button
      onClick={onClick}
      className={`text-left font-light text-lg cursor-pointer w-full ${
        isSelected ? "text-solis" : "text-pure"
      }`}
    >
      <Flip3DText
        defaultContent={
          <span className="block truncate text-left w-full leading-6">
            {label}
          </span>
        }
        hoverContent={
          <span className="block truncate text-left w-full leading-6">
            {label}
          </span>
        }
        axis="x"
        duration={0.6}
        transformOrigin="left center"
        className="w-full"
      />
    </button>
  );
}
