"use client";

import Image from "next/image";
import { BlogPost } from "@/types";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useLayoutEffect } from "react";

interface BlogPostImageProps {
  post: BlogPost;
}

export default function BlogPostImage({ post }: BlogPostImageProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3, margin: "0px" });
  const [isInitiallyVisible, setIsInitiallyVisible] = useState(false);

  // Check if element is in view on mount
  useLayoutEffect(() => {
    if (ref.current) {
      const element = ref.current as HTMLElement;
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const isVisible =
        rect.top < viewportHeight * 1.1 && rect.bottom > viewportHeight * 0.1;

      if (isVisible) {
        requestAnimationFrame(() => {
          setIsInitiallyVisible(true);
        });
      }
    }
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        scale: 0.85,
      }}
      animate={
        isInView || isInitiallyVisible
          ? {
              opacity: 1,
              scale: 1,
            }
          : {
              opacity: 0,
              scale: 0.85,
            }
      }
      transition={{
        duration: 0.7,
        delay: 0.5,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="flex justify-center my-6 sm:my-8 md:my-10 lg:my-[40px]"
    >
      <div className="relative w-full max-w-full sm:max-w-[600px] md:max-w-[800px] md:w-full lg:w-[720px] lg:max-w-[720px] h-[240px] sm:h-[320px] md:h-[400px] lg:h-[480px] rounded-2xl overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
    </motion.div>
  );
}
