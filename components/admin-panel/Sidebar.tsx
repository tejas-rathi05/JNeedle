"use client";

import {
  Badge,
  ChevronLeft,
  Home,
  Package,
  Package2,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

const Sidebar = ({
  isSidebarOpen,
  toggleSideBar,
  pathname,
}: {
  isSidebarOpen: boolean;
  toggleSideBar: () => void;
  pathname: string;
}) => {
  const [currentPath, setCurrentPath] = useState("dashboard");

  useEffect(() => {
    if (pathname.startsWith("/admin/dashboard")) {
      setCurrentPath("dashboard");
    } else if (pathname.startsWith("/admin/orders")) {
      setCurrentPath("orders");
    } else if (pathname.startsWith("/admin/products")) {
      setCurrentPath("products");
    }
  }, [pathname]);
  return (
    <div
      className={`hidden border-r bg-muted/40 md:block transition-[width] ease-in-out duration-300 ${
        isSidebarOpen ? "w-72" : "w-[80px]"
      }`}
    >
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div
          className={`flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 relative ${
            isSidebarOpen ? "justify-between" : "justify-center"
          }`}
        >
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            {isSidebarOpen ? <span className="">JNeedle</span> : null}
          </Link>
          <Button
            variant="outline"
            size="icon"
            className={`ml-auto absolute top-4 -right-3 w-6 h-6`}
            onClick={toggleSideBar}
          >
            <ChevronLeft
              className={`h-4 w-4 transition-transform ease-in-out duration-600 ${
                isSidebarOpen ? "rotate-0" : "rotate-180"
              }`}
            />
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="/admin/dashboard"
              className={`flex items-center gap-3 rounded-lg  px-3 py-2 text-primary transition-all hover:text-primary ${
                isSidebarOpen ? "justify-start" : "justify-center"
              } ${
                currentPath === "dashboard"
                  ? "bg-muted"
                  : "text-muted-background"
              }`}
            >
              <Home
                className={` transition-all ease-in-out duration-200 ${
                  isSidebarOpen ? "h-4 w-4" : "h-5 w-5"
                }`}
              />
              {isSidebarOpen ? "Dashboard" : null}
            </Link>
            <Link
              href="/admin/orders"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary ${
                isSidebarOpen ? "justify-start" : "justify-center"
              } ${
                currentPath === "orders" ? "bg-muted" : "text-muted-background"
              }`}
            >
              <ShoppingCart
                className={` transition-all ease-in-out duration-200 ${
                  isSidebarOpen ? "h-4 w-4" : "h-5 w-5"
                }`}
              />
              {isSidebarOpen ? "Orders" : null}
              {/* {isSidebarOpen && (
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  6
                </Badge>
              )} */}
            </Link>
            <Link
              href="/admin/products"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary ${
                isSidebarOpen ? "justify-start" : "justify-center"
              } ${
                currentPath === "products"
                  ? "bg-muted"
                  : "text-muted-background"
              }`}
            >
              <Package
                className={` transition-all ease-in-out duration-200 ${
                  isSidebarOpen ? "h-4 w-4" : "h-5 w-5"
                }`}
              />
              {isSidebarOpen ? "Products" : null}
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
