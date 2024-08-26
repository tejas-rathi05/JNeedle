import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Bebas_Neue, Dancing_Script, Great_Vibes } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
});

const Categories = () => {
  return (
    <MaxWidthWrapper className="py-20">
      <section className="flex flex-col md:flex-row gap-10 w-full h-full">
        <Link href='/' className="w-full h-full relative cursor-pointer group overflow-hidden">
            <img
              src="/images/collages/vintage.jpg"
              alt=""
              className="w-full h-96 object-cover group-hover:scale-125 transition-all ease-in-out duration-1000"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/50">
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <p
                  className={cn(
                    greatVibes.className,
                    "text-white text-8xl underline underline-offset-[14px] text-center"
                  )}
                >
                  Vintage
                </p>
              </div>
            </div>
        </Link>
        <Link href='/' className="w-full h-full relative cursor-pointer group overflow-hidden">
            <img
              src="/images/collages/clutch.jpg"
              alt=""
              className="w-full h-96 object-cover group-hover:scale-125 transition-all ease-in-out duration-1000"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/50">
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <p
                  className={cn(
                    greatVibes.className,
                    "text-white text-8xl underline underline-offset-[14px] text-center"
                  )}
                >
                  Clutch
                </p>
              </div>
            </div>
        </Link>

        
        
      </section>
    </MaxWidthWrapper>
  );
};

export default Categories;
