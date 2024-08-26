import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselMainContainer,
  CarouselThumbsContainer,
  SliderMainItem,
  SliderThumbItem,
} from "@/components/extension/carousel";

interface GalleryProps {
  $id: string;
  previewUrl: string;
  name: string;
}

const ProductCarousel = ({ gallery }: { gallery: GalleryProps[] }) => {
  const [orientation, setOrientation] = useState<"vertical" | "horizontal">(
    "vertical"
  );

  console.log(gallery);

  useEffect(() => {
    const updateOrientation = () => {
      if (window.innerWidth < 1024) {
        setOrientation("horizontal");
      } else {
        setOrientation("vertical");
      }
    };

    // Set the initial orientation
    updateOrientation();

    // Add event listener to handle resize
    window.addEventListener("resize", updateOrientation);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateOrientation);
    };
  }, []);

  return (
    <Carousel
      orientation={orientation}
      className="flex flex-col lg:flex-row items-center gap-2"
    >
      <CarouselThumbsContainer className={`hidden lg:flex w-full lg:h-60 `}>
        {gallery?.map((item, index) => (
          <SliderThumbItem
            key={index}
            index={index}
            className="rounded-md bg-transparent"
          >
            <span className="border border-muted flex items-center justify-center h-full w-full rounded-md cursor-pointer bg-background">
              <img
                src={item?.previewUrl}
                alt={item?.$id}
                className="object-contain w-32 h-32"
              />
            </span>
          </SliderThumbItem>
        ))}
      </CarouselThumbsContainer>
      <div className={`relative`}>
        <CarouselMainContainer className="w-full lg:h-[75vh] xl:h-[90vh]">
          {gallery?.map((item, index) => (
            <SliderMainItem
              key={index}
              className="flex items-start justify-start h-full w-full"
            >
              <img
                src={item?.previewUrl}
                alt={item?.$id}
                className="object-cover w-full h-full"
                
              />
            </SliderMainItem>
          ))}
        </CarouselMainContainer>
      </div>
      <CarouselThumbsContainer className={`flex lg:hidden w-full h-24`}>
        {gallery?.map((item, index) => (
          <SliderThumbItem key={index} index={index} className="w-fit h-full">
            <span className="flex items-center justify-center h-24 w-24 cursor-pointer">
              <img
                src={item?.previewUrl}
                alt={item?.$id}
                className="object-contain w-20 h-20"
              />
            </span>
          </SliderThumbItem>
        ))}
      </CarouselThumbsContainer>
    </Carousel>
  );
};

export default ProductCarousel;
