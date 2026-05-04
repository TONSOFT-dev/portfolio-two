"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import GalleryModal from "./GalleryModal";

interface CarImageGalleryProps {
  images: string[];
  mainImage: string;
  carName: string;
}

export default function CarImageGallery({
  images,
  mainImage,
  carName,
}: CarImageGalleryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);

  const handleGalleryClick = () => {
    // Find the index of the main image in the images array
    const index = images.findIndex((img) => img === mainImage);
    setInitialIndex(index >= 0 ? index : 0);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-lg overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          data-cursor-hover
        >
          <Image
            src={mainImage}
            alt={carName}
            fill
            className="object-cover"
            priority
            data-cursor-hover
          />
        </motion.div>
        {/* Overlay - Same as ModelCard */}
        <div
          className="absolute inset-0 bg-linear-to-r from-[rgba(8,8,5,0.478)] to-[rgba(8,8,5,0.478)]"
          data-cursor-hover
        />

        {/* Gallery Icon Button - Bottom Left */}
        {images && images.length > 1 && (
          <motion.div
            className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 md:bottom-5 md:left-5"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <button
              onClick={handleGalleryClick}
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-14 md:h-14 rounded-full bg-[rgba(255,255,255,0.16)] border border-white flex items-center justify-center hover:bg-[rgba(255,255,255,0.24)] transition-colors cursor-pointer"
              aria-label="View gallery"
            >
              <Image
                src="/images/svg-icons/images.svg"
                alt="Gallery"
                width={28}
                height={28}
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 object-contain"
              />
            </button>
          </motion.div>
        )}
      </div>

      <GalleryModal
        key={`${isModalOpen}-${initialIndex}`}
        images={images}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialIndex={initialIndex}
      />
    </>
  );
}
