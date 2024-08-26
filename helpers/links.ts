import conf from "@/conf/conf"

export const sideNavLinks = [
  {
    name: "HOME",
    href: "/",
  },
  {
    name: "VINTAGE",
    href: `${conf.baseURL}/products?category=vintage&sort=featured`,
  },
  {
    name: "CLUTCH",
    href: `${conf.baseURL}/products?category=clutch&sort=featured`,
  },
  {
    name: "SALE",
    href: "/",
  },
  {
    name: "ABOUT US",
    href: "/#about-us",
  },
];
