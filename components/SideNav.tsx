import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ChevronRight, Facebook, X } from "lucide-react";
import React from "react";
import FacebookIcon from "./icons/FacebookIcon";
import InstagramIcon from "./icons/InstagramIcon";

const SideNav = ({
  isSideNavOpen,
  onSideNavClose,
}: {
  isSideNavOpen: boolean;
  onSideNavClose: () => void;
}) => {
  useGSAP(() => {
    if (isSideNavOpen) {
      gsap.to("#side-nav", {
        x: 0, // Move to original position
        opacity: 1, // Make visible
        duration: 0.3,
      });
      gsap.to("#side-overlay", {
        opacity: 1, // Make visible
        duration: 0.3,
      });
      gsap.fromTo(
        ".side-tabs",
        {
          opacity: 0,
          x: -100,
        },
        {
          opacity: 1,
          x: 0,
          ease: "power5.in",
          stagger: 0.2,
        }
      );
    } else {
      gsap.to("#side-nav", {
        x: -250, // Move upward to hide
        opacity: 0, // Hide
        duration: 0.3,
      });
      gsap.to("#side-overlay", {
        opacity: 0, // Hide
        duration: 0.3,
      });
    }
  }, [isSideNavOpen]);
  return (
    <div
      id="side-overlay"
      className={`inset-0 ${
        isSideNavOpen ? "z-50 absolute" : "z-0"
      }  bg-black/20 opacity-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0`}
    >
      <div
        id="side-nav"
        className="absolute top-0 left-0 bg-white z-20 min-h-screen opacity-0 w-3/4 sm:w-1/2 md:w-2/5 flex flex-col justify-start items-start"
      >
        <div className="p-5">
          <button
            className="text-gray-400 hover:text-black transition-all ease-in-out duration-200 p-1 lg:mr-4"
            onClick={onSideNavClose}
          >
            <X size={25} />
          </button>
        </div>

        <div className="w-full h-full p-5 opacity-0">
          <p className="w-full h-full p-2 border-b-[2px] side-tabs">Vintage</p>
          <p className="w-full h-full p-2 border-b-[2px] side-tabs">Clutch</p>
          <div className="w-full h-full p-2 mt-5 font-bold  side-tabs flex justify-between items-center cursor-pointer hover:bg-gray-100/50 rounded-xl">
            Account <ChevronRight />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full border-t-[2px] p-2 flex gap-2">
          <FacebookIcon/>
          <InstagramIcon/>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
