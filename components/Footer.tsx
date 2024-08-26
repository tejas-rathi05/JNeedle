import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import FacebookIcon from "./icons/FacebookIcon";
import InstagramIcon from "./icons/InstagramIcon";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-stone-800 from-20% to-stone-900 to-90% rounded-t-2xl py-5">
      <MaxWidthWrapper className="py-10 text-white flex flex-col sm:flex-row justify-center sm:justify-between items-start gap-20 pb-20">
        <div className="flex flex-col gap-3 items-center justify-center w-full h-full sm:w-fit">
          <div className="size-[120px] lg:size-[100px]">
            <img
              src="/images/logo/logo-space.png"
              alt="JNEEDLE"
              className="w-full h-full object-contain rounded-full"
              width={100}
              height={100}
            />
          </div>
          {/* <p className="font-sans text-xs">
            Explore elegance and tradition at J Needle, an Indian luxury brand
            synonymous with meticulous handcrafting and intricate embroidery.
            Our timeless creations blend heritage with modernity, celebrating
            the beauty of Indian craftsmanship. Experience the art of hand
            embroidery with us.
          </p> */}
        </div>

        <div className="flex gap-3 w-full sm:flex-1 sm:ml-5 justify-between items-start flex-wrap">
          <div className="flex flex-col gap-3">
            <p className="font-bold">MENU</p>
            <ul className="space-y-2 font-light text-xs">
              <li>Vintage</li>
              <li>Clutch</li>
              <li>Shoulder Bag</li>
              <li>Satchel</li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-bold">REACH US</p>
            <ul className="flex flex-col gap-y-2 font-light text-xs">
              <li className="cursor-pointer hover:text-yellow-300 transition-all ease-in-out duration-500">
                Contact Us
              </li>
              <li className="cursor-pointer hover:text-yellow-300 transition-all ease-in-out duration-500">
                contact@jneedle.in
              </li>
              <li>+91 888888888</li>
              <li className="flex justify-start items-center gap-x-5">
                <div className="w-fit h-fit p-2 bg-gray-200 rounded-full cursor-pointer">
                  <FacebookIcon />
                </div>
                <div className="w-fit h-fit p-2 bg-gray-200 rounded-full cursor-pointer">
                  <InstagramIcon />
                </div>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-bold">JNEEDLE</p>
            <ul className="space-y-2 font-light text-xs">
              <li>About</li>
              <li>Testimonials</li>
              <li>Track Order</li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-bold">POLICIES</p>
            <ul className="space-y-2 font-light text-xs">
              <li>Terms & Conditions</li>
              <li>Return & Exchange</li>
              <li>Shipping Policy</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>

      </MaxWidthWrapper>
            <p className="text-white font-light text-sm text-center">JNEEDLE &copy; 2024</p>
    </footer>
  );
};

export default Footer;
