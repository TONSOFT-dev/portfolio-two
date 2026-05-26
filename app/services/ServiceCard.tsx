"use client";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { 
  LucideIcon, Cloud, Server, Shield, Network, Box, Github, Code, Terminal, 
  Webhook, Blocks, Activity, Database, Lock, Globe, FileCode2 
} from "lucide-react";
import React from "react";
import { Service } from "@/lib/data/services";

const getTechIcon = (tech: string): LucideIcon => {
  const t = tech.toLowerCase();
  if (t.includes('aws') || t.includes('vpc')) return Cloud;
  if (t.includes('kms') || t.includes('waf') || t.includes('security')) return Shield;
  if (t.includes('docker') || t.includes('kubernetes')) return Box;
  if (t.includes('github')) return Github;
  if (t.includes('node') || t.includes('python') || t.includes('java')) return Terminal;
  if (t.includes('api') || t.includes('graphql')) return Webhook;
  if (t.includes('microservices')) return Blocks;
  if (t.includes('kafka') || t.includes('event')) return Activity;
  if (t.includes('redis') || t.includes('postgre')) return Database;
  if (t.includes('tls') || t.includes('ssl')) return Lock;
  if (t.includes('terraform')) return FileCode2;
  return Code;
};

interface ServiceCardProps {
  service: Service;
  icon: LucideIcon;
  index: number;
}

export default function ServiceCard({ service, icon: Icon, index }: ServiceCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const xPos = e.clientX - rect.left;
    const yPos = e.clientY - rect.top;
    
    mouseX.set(xPos);
    mouseY.set(yPos);

    const xPct = xPos / width - 0.5;
    const yPct = yPos / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const spotlight = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(254,143,4,0.15), transparent 80%)`;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
      }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ 
          repeat: Infinity, 
          duration: 5, 
          ease: "easeInOut", 
          delay: index * 0.2 
        }}
        className="h-full"
      >
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          whileHover={{ 
            y: -15, 
            scale: 1.02,
            boxShadow: "0px 30px 60px -15px rgba(254,143,4,0.2)",
            transition: { duration: 0.3, ease: "easeOut" }
          }}
          className="group relative p-[1px] rounded-3xl cursor-pointer h-full flex flex-col"
        >
          {/* Animated Gradient Border Layer */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-[#FE8F04]/30 opacity-30 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Inner Card Background */}
          <div className="absolute inset-[1px] rounded-[23px] bg-[#122840]/95 backdrop-blur-2xl overflow-hidden pointer-events-none z-0">
            {/* Mouse Spotlight */}
            <motion.div
              className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: spotlight }}
            />
            
            {/* Top Corner Glow */}
            <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-[#FE8F04]/10 blur-[80px] group-hover:bg-[#FE8F04]/20 transition-colors duration-700" />
            
            {/* Animated Bottom Line */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-gradient-to-r from-transparent via-[#FE8F04] to-transparent transition-all duration-700 group-hover:w-full opacity-0 group-hover:opacity-100" />
          </div>

          {/* 3D Pop Content (Foreground) */}
          <div className="relative p-6 sm:p-8 flex flex-col flex-grow z-10" style={{ transform: "translateZ(40px)" }}>
            
            {/* Top row: Icon + Category */}
            <div className="flex items-start justify-between">
              <div className="relative inline-flex p-4 rounded-2xl bg-white/5 border border-white/10 text-[#FE8F04] overflow-hidden group-hover:border-[#FE8F04]/40 transition-colors duration-500 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FE8F04]/20 to-transparent translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <Icon size={28} strokeWidth={1.5} className="relative z-10 group-hover:scale-110 transition-transform duration-500" />
              </div>
              
              <div className="flex items-center">
                <span className="px-4 py-1.5 rounded-full text-[11px] uppercase tracking-widest font-semibold bg-white/5 text-white/50 border border-white/10 group-hover:text-white/80 transition-colors duration-500">
                  {service.category}
                </span>
              </div>
            </div>

            {/* Title and Description */}
            <div className="mt-8">
              <div className="flex items-center gap-3 mb-4 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                 <div className="h-[1px] w-8 bg-gradient-to-r from-[#FE8F04] to-transparent" />
                 <span className="text-[#FE8F04] text-[10px] font-bold tracking-[0.2em] uppercase">
                   {service.badge}
                 </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-[#FE8F04] transition-colors duration-500 leading-tight" style={{ fontFamily: "var(--font-syne)" }}>
                {service.name}
              </h3>
              <p className="text-white/60 leading-relaxed text-sm sm:text-base font-light">
                {service.description}
              </p>
            </div>

            {/* Highlights */}
            <div className="space-y-3 mt-6">
              {service.highlights.map((h, i) => (
                <div key={h} className="flex items-start gap-4 text-white/70 text-sm group/item">
                  <div className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#FE8F04]/40 transition-colors duration-500">
                     <div className="w-1.5 h-1.5 rounded-full bg-[#FE8F04] scale-0 group-hover:scale-100 transition-transform duration-500" style={{ transitionDelay: `${i * 100}ms` }} />
                  </div>
                  <span className="leading-relaxed group-hover:text-white/90 transition-colors duration-500">{h}</span>
                </div>
              ))}
            </div>

            {/* Tech stack chips */}
            <div className="flex flex-wrap gap-2 mt-8 flex-grow">
              {service.techStack.map((tech) => {
                const TechIcon = getTechIcon(tech);
                return (
                  <span
                    key={tech}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white/50 bg-gradient-to-b from-white/5 to-transparent border border-white/10 group-hover:border-[#FE8F04]/30 group-hover:text-[#FE8F04] transition-all duration-300"
                  >
                    <TechIcon size={12} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                    {tech}
                  </span>
                );
              })}
            </div>

            {/* Link/Button */}
            <div className="pt-8 mt-auto border-t border-white/5">
              <a href="/contact" className="inline-flex items-center gap-3 text-[#FE8F04] font-medium text-sm group/btn">
                <span className="group-hover/btn:underline underline-offset-4">Start a Project</span>
                <div className="w-8 h-8 rounded-full bg-[#FE8F04]/10 flex items-center justify-center group-hover/btn:bg-[#FE8F04] group-hover/btn:text-[#122840] transition-colors duration-300">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:translate-x-1 transition-transform duration-300">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}