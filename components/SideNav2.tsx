"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronRight, Menu } from "lucide-react";
import FacebookIcon from "./icons/FacebookIcon";
import InstagramIcon from "./icons/InstagramIcon";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { useAppSelector } from "@/lib/store";
import LogoutBtn from "./LogoutBtn";
import conf from "@/conf/conf";
import { current } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { sideNavLinks } from "@/helpers/links";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    x: -30,
  },
  animate: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      delay: 0.1 * index,
    },
  }),
};

export function SideNav2() {
  const authStatus = useAppSelector((state) => state.auth.status);
  const currentUser = useAppSelector((state) => state.auth.userData);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  console.log("currentUser", currentUser);

  useEffect(() => {
    if (
      currentUser?.userData?.labels?.length > 0 ||
      currentUser?.labels?.length > 0
    ) {
      if (
        currentUser?.userData?.labels[0] === "admin" ||
        currentUser?.labels[0] === "admin"
      ) {
        setIsAdmin(true);
      }
    }
  }, [currentUser]);

  console.log("isAdmin", isAdmin);

  // useGSAP(() => {
  //   gsap.fromTo(
  //     ".side_tabs",
  //     {
  //       opacity: 0,
  //       x: -100,
  //     },
  //     {
  //       opacity: 1,
  //       x: 0,
  //       ease: "power5.in",
  //       stagger: 0.2,
  //     }
  //   );
  // }, []);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Menu className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <div className="w-full h-full p-5 opacity-1 ">
          {sideNavLinks.map((link, index) => {
            return (
              <motion.div
                variants={fadeInAnimationVariants}
                initial="initial"
                whileInView="animate"
                viewport={{
                  once: true,
                }}
                custom={index}
                key={index}
              >
                <a href={link.href}>
                  <p className="w-full p-2 border-b-[2px] side_tabs">
                    {link.name}
                  </p>
                </a>
              </motion.div>
            );
          })}

          {authStatus ? (
            <a href={`${conf.baseURL}/my-account`}>
              <div className="w-full p-2 mt-5 font-bold  side-tabs flex justify-between items-center cursor-pointer hover:bg-gray-100/50 rounded-xl">
                Account <ChevronRight />
              </div>
            </a>
          ) : (
            <div className="flex justify-center items-center w-full my-10">
              <a href={`${conf.baseURL}/login`} className="w-full">
                <button className="hover:before:bg-white relative h-[50px] w-full overflow-hidden border border-stone-800 bg-stone-800 px-8 text-white shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-white before:transition-all before:duration-500 hover:text-stone-800 hover:before:left-0 hover:before:w-full">
                  <span className="relative z-10 w-full text-sm tracking-widest flex items-center justify-center">
                    Login
                  </span>
                </button>
              </a>
            </div>
          )}
          {isAdmin && (
            <a href={`${conf.baseURL}/admin/products`}>
              <div className="w-full p-2 mt-5 font-bold  side-tabs flex justify-between items-center cursor-pointer hover:bg-gray-100/50 rounded-xl">
                Dashboard <ChevronRight />
              </div>
            </a>
          )}
        </div>

        <SheetFooter className="w-full absolute bottom-0 left-0">
          <div className="w-full h-full">
            {authStatus && (
              <div className="mb-5 px-5">
                <LogoutBtn />
              </div>
            )}
            <div className="w-full border-t-[2px] p-2 flex gap-2">
              <FacebookIcon />
              <InstagramIcon />
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
