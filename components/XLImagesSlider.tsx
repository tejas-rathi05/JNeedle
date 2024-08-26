"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/xl-images-carousel";
import Autoplay from "embla-carousel-autoplay";
import gsap from "gsap";
import useEmblaCarousel from "embla-carousel-react";

const XLImagesSlider = () => {
  const [responsiveImage, setResponsiveImage] = useState<string>("lg");
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay({ delay: 5000 })]);

  const animateActiveSlide = useCallback(() => {
    gsap.to(".g_grow", {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "power1",
    });
  }, []);

  useEffect(() => {
    const updateImage = () => {
      if (window.innerWidth < 768) {
        setResponsiveImage("sm");
      } else {
        setResponsiveImage("lg");
      }
    };

    // Set the initial orientation
    updateImage();

    // Add event listener to handle resize
    window.addEventListener("resize", updateImage);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateImage);
    };
  }, []);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", animateActiveSlide);

      // Initial animation on first load
      animateActiveSlide();
    }

    return () => {
      if (emblaApi) {
        emblaApi.off("select", animateActiveSlide);
      }
    };
  }, [emblaApi, animateActiveSlide]);

  return (
    <section className="w-full h-full">
      <div className="flex h-full">
        <Carousel className="w-full h-full" plugins={[Autoplay({ delay: 5000 })]} ref={emblaRef}>
          <CarouselContent>
            <CarouselItem key={1}>
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src={`/images/xl_carousel/${responsiveImage === "sm" ? "9-sm" : "9"}.png`}
                  alt=""
                  className="w-full h-full object-contain opacity-0 scale-110 g_grow"
                />
              </div>
            </CarouselItem>
            <CarouselItem key={2}>
              <div className="w-full h-full">
                <img
                  src={`/images/xl_carousel/${responsiveImage === "sm" ? "1-sm" : "1"}.png`}
                  alt=""
                  className="w-full h-full object-contain opacity-0 scale-110 g_grow"
                />
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default XLImagesSlider;
