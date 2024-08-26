"use client"

import { useEffect, useRef, useState } from 'react';

// Define your images here
const images = [
  "/images/xl_carousel/9.png",
  "/images/xl_carousel/1.png",
];

const ImageCarousel: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Function to handle image rotation
  const rotateImages = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  // Start rotating images when component mounts on the client-side
  useEffect(() => {
    // Check if window is defined to ensure we're in the client-side context
    if (typeof window !== 'undefined') {
      intervalRef.current = window.setInterval(rotateImages, 5000); // Rotate every 3 seconds

      // Clean up interval when component unmounts
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, []);

  return (
      <div className="relative w-full h-full overflow-hidden">
        {images.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Image ${index}`}
            className={`absolute top-0 left-0 w-full h-full opacity-0 scale-110 object-contain transition-all duration-1000 ${
              index === currentImage ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
            }`}
          />
        ))}
      </div>
  );
};

export default ImageCarousel;
