import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { FaTruckFast } from "react-icons/fa6";
import { RiHandHeartFill } from "react-icons/ri";
import { GiEcology } from "react-icons/gi";
import { RiMedalFill } from "react-icons/ri";
import conf from "@/conf/conf";

const AboutUs = () => {
  return (
    <section className="py-20 mb-20" id="about-us">
      <MaxWidthWrapper>
        <div className="py-5">
          <h2 className="text-5xl font-extrabold tracking-wider text-stone-800">
            ABOUT JNEEDLE
          </h2>
          <p className="text-black/50">Redefining Elegance</p>
        </div>
        <div className="flex flex-col md:flex-row justify-center md:justify-between">
          <div className="w-full h-full">
            <div className="w-full h-full space-y-3">
              <p>
                Welcome to J Needle, where elegance meets tradition. As an
                Indian luxury brand, we specialize in exquisite handcrafting and
                embroidery.
              </p>
              <p>
                Each product reflects artisanal skill and dedication, blending
                heritage with modernity.
              </p>
              <p>
                Committed to sustainability and ethical sourcing, we offer
                timeless handcrafted pieces that celebrate the beauty of Indian
                craftsmanship. Experience the art of hand embroidery with J
                Needle.
              </p>
              <div className="w-fit h-full py-10 hidden md:inline-block">
                <a
                  href={`${conf.baseURL}/products?category=all`}
                  className="w-fit"
                >
                  <button className="hover:before:bg-white relative h-[50px] w-full overflow-hidden border border-stone-800 bg-stone-800 px-8 text-white shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-white before:transition-all before:duration-500 hover:text-stone-800 hover:before:left-0 hover:before:w-full">
                    <span className="relative z-10 w-full text-sm tracking-widest flex items-center justify-center">
                      MORE ABOUT US
                    </span>
                  </button>
                </a>
              </div>
            </div>
          </div>

          <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-y-14 place-items-center my-10 md:m-0 md:place-items-end">
            <div className="w-1/2 h-full flex flex-col items-center justify-start text-center gap-2">
              <div className="w-fit h-fit rounded-full bg-stone-800 p-4">
                <FaTruckFast size={32} className="bg-stone-800 text-white" />
              </div>
              <p className="text-sm">Multiple Delivery Options.</p>
            </div>
            <div className="w-1/2 h-full flex flex-col items-center justify-start text-center gap-2">
              <div className="w-fit h-fit rounded-full bg-stone-800 p-4">
                <RiHandHeartFill
                  size={32}
                  className="bg-stone-800 text-white"
                />
              </div>
              <p className="text-sm">
                Curated with love by our J Needle artisans.
              </p>
            </div>
            <div className="w-1/2 h-full flex flex-col items-center justify-start text-center gap-2">
              <div className="w-fit h-fit rounded-full bg-stone-800 p-4">
                <GiEcology size={32} className="bg-stone-800 text-white" />
              </div>
              <p className="text-sm">
                Committed to sustainability and ethical sourcing.
              </p>
            </div>
            <div className="w-1/2 h-full flex flex-col items-center justify-start text-center gap-2">
              <div className="w-fit h-fit rounded-full bg-stone-800 p-4">
                <RiMedalFill size={32} className="bg-stone-800 text-white" />
              </div>
              <p className="text-sm">Marked for excellence.</p>
            </div>
          </div>

          <div className="w-full h-full py-10 md:hidden flex items-center justify-center">
            <a
              href={`${conf.baseURL}/products?category=all`}
              className="w-fit"
            >
              <button className="hover:before:bg-white relative h-[50px] w-full overflow-hidden border border-stone-800 bg-stone-800 px-8 text-white shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-white before:transition-all before:duration-500 hover:text-stone-800 hover:before:left-0 hover:before:w-full">
                <span className="relative z-10 w-full text-sm tracking-widest flex items-center justify-center">
                  MORE ABOUT US
                </span>
              </button>
            </a>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default AboutUs;
