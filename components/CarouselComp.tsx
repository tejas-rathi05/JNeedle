"use client";

import React, { useEffect, useState } from "react";
import { ImagesSlider } from "./ui/images-slider";

// Define type for images object
type Images = {
  sm: string[];
  lg: string[];
};

const CarouselComp: React.FC = () => {
  const [responsiveImage, setResponsiveImage] = useState<"sm" | "md">("md");

  useEffect(() => {
    const updateImage = () => {
      if (window.innerWidth < 768) {
        setResponsiveImage("sm");
      } else {
        setResponsiveImage("md");
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
  }, [responsiveImage]);

  console.log(responsiveImage);

  // Define your images for sm and lg sizes
  const imagesLG = [`/images/xl_carousel/9.png`, `/images/xl_carousel/1.png`];
  const imagesSM = [
    `/images/xl_carousel/9-sm.png`,
    `/images/xl_carousel/1-sm.png`,
  ];

  return (
    <div className="h-[30rem] md:h-[20rem] lg:h-[30rem] xl:h-[40rem]">
      {responsiveImage === "md" && (
        <ImagesSlider images={imagesLG} />
      ) }
      {
        responsiveImage === "sm" && (
          <ImagesSlider images={imagesSM} />
        )
      }
    </div>
  );
};

export default CarouselComp;
