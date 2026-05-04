"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryModalProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export default function GalleryModal({
  images,
  isOpen,
  onClose,
  initialIndex = 0,
}: GalleryModalProps) {
  // State is reset via key prop in parent component
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Reset loading state when image changes - check if image is already loaded
  useEffect(() => {
    let isMounted = true;

    const checkImageLoad = () => {
      const img = new window.Image();
      img.src = images[selectedIndex];

      if (img.complete) {
        // Image is already loaded (cached), don't show loader
        if (isMounted) {
          setIsImageLoading(false);
        }
      } else {
        // Image needs to load, show loader
        if (isMounted) {
          setIsImageLoading(true);
        }
        img.onload = () => {
          if (isMounted) {
            setIsImageLoading(false);
          }
        };
        img.onerror = () => {
          if (isMounted) {
            setIsImageLoading(false);
          }
        };
      }
    };

    checkImageLoad();

    return () => {
      isMounted = false;
    };
  }, [selectedIndex, images]);

  if (!isOpen) return null;

  const handleThumbnailClick = (index: number) => {
    setDirection(index > selectedIndex ? 1 : -1);
    setSelectedIndex(index);
  };

  const handlePrev = () => {
    setDirection(-1);
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-[#000000e6] backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full h-full mx-auto p-4 flex flex-col items-center space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-linear-to-r from-[rgba(8,8,5,0.478)] to-[rgba(8,8,5,0.478)] backdrop-blur-sm flex items-center justify-center hover:from-[rgba(8,8,5,0.6)] hover:to-[rgba(8,8,5,0.6)] transition-all text-pure cursor-pointer"
          aria-label="Close gallery"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Main Image */}
        <div className="w-full max-w-4xl xl:max-w-7xl flex-1 flex items-center justify-center mt-12 md:mt-8 lg:mt-0">
          <div className="relative w-full aspect-video min-h-[430px] max-h-[80vh] rounded-lg overflow-hidden shadow-lg">
            {/* Loading State */}
            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-coal/50 z-20">
                <Loader2 className="w-8 h-8 text-solis animate-spin" />
              </div>
            )}

            {/* Image with Slide Animation */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={selectedIndex}
                custom={direction}
                initial="enter"
                animate="center"
                exit="exit"
                variants={{
                  enter: (dir: number) => ({
                    x: dir > 0 ? 300 : -300,
                    opacity: 0,
                  }),
                  center: {
                    x: 0,
                    opacity: 1,
                  },
                  exit: (dir: number) => ({
                    x: dir > 0 ? -300 : 300,
                    opacity: 0,
                  }),
                }}
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-0"
                data-cursor-hover
              >
                <Image
                  src={images[selectedIndex]}
                  alt={`Gallery image ${selectedIndex + 1}`}
                  fill
                  className="rounded-lg object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                  onLoad={handleImageLoad}
                  onLoadingComplete={handleImageLoad}
                  onError={() => setIsImageLoading(false)}
                  data-cursor-hover
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                {/* Left Arrow Button - Always visible, arrow hidden on first image */}
                <button
                  onClick={selectedIndex > 0 ? handlePrev : undefined}
                  disabled={selectedIndex === 0}
                  className={`absolute left-0 top-0 bottom-0 z-10 w-10 md:w-[68px] lg:w-[68px] h-full rounded-none md:rounded-l-lg lg:rounded-l-lg bg-linear-to-r from-[rgba(8,8,5,0.478)] to-[rgba(8,8,5,0.478)] backdrop-blur-sm flex items-center justify-center hover:from-[rgba(8,8,5,0.6)] hover:to-[rgba(8,8,5,0.6)] transition-all text-pure ${
                    selectedIndex > 0
                      ? "cursor-pointer"
                      : "cursor-default opacity-50"
                  }`}
                  aria-label="Previous image"
                >
                  {selectedIndex > 0 && (
                    <Image
                      src="/images/svg-icons/left-arrow.svg"
                      alt="Previous"
                      width={24}
                      height={40}
                      className="w-5 h-5 md:w-6 md:h-10 lg:w-6 lg:h-10 object-contain pointer-events-none"
                    />
                  )}
                </button>
                {/* Right Arrow Button - Always visible, arrow hidden on last image */}
                <button
                  onClick={
                    selectedIndex < images.length - 1 ? handleNext : undefined
                  }
                  disabled={selectedIndex === images.length - 1}
                  className={`absolute right-0 top-0 bottom-0 z-10 w-10 md:w-[68px] lg:w-[68px] h-full rounded-none md:rounded-r-lg lg:rounded-r-lg bg-linear-to-r from-[rgba(8,8,5,0.478)] to-[rgba(8,8,5,0.478)] backdrop-blur-sm flex items-center justify-center hover:from-[rgba(8,8,5,0.6)] hover:to-[rgba(8,8,5,0.6)] transition-all text-pure ${
                    selectedIndex < images.length - 1
                      ? "cursor-pointer"
                      : "cursor-default opacity-50"
                  }`}
                  aria-label="Next image"
                >
                  {selectedIndex < images.length - 1 && (
                    <Image
                      src="/images/svg-icons/right-arrow.svg"
                      alt="Next"
                      width={24}
                      height={40}
                      className="w-5 h-5 md:w-6 md:h-10 lg:w-6 lg:h-10 object-contain pointer-events-none"
                    />
                  )}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="flex flex-nowrap items-center justify-center space-x-2 overflow-x-auto w-full max-w-4xl xl:max-w-7xl py-1 custom-scrollbar scroll-smooth">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`w-16 h-16 sm:w-18 sm:h-18 md:w-16 md:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20 rounded-lg cursor-pointer shrink-0 border-2 transition-all overflow-hidden ${
                  selectedIndex === index
                    ? "border-transparent scale-105"
                    : "border-transparent hover:border-slate/50"
                }`}
                aria-label={`View image ${index + 1}`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                  {selectedIndex === index && (
                    <div className="absolute inset-0 bg-solis/30 rounded-lg" />
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
