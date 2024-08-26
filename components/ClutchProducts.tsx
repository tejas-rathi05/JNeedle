"use client";

import React, { useEffect, useState } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import ProductCard from "./ProductCard";
import conf from "@/conf/conf";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/app/admin/products/columns";

const ClutchProducts = () => {
  const clutchProductsQuery = useQuery({
    queryKey: ["clutchProducts"],
    queryFn: async () => {
      const res = await fetch(`${conf.baseURL}/api/fetch-all-products`, {
        method: "POST",
        body: JSON.stringify({ category: "clutch" }),
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // Ensures no caching
      });
      const data = await res.json();
      const selectedProducts = getRandomProducts(data, 4);

      return selectedProducts;
    },
    staleTime: 1000 * 60 * 60,
  });

  const getRandomProducts = (products: Product[], count: number): Product[] => {
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  return (
    <section className={cn(`w-full h-full py-20 bg-stone-50`)}>
      <MaxWidthWrapper>
        <div className="w-full h-full flex flex-col xl:flex-row items-center xl:items-start justify-center gap-6">
          <div className="flex xl:hidden flex-col justify-between items-center w-full xl:w-fit h-full gap-y-3">
            <div className="bg-gradient-to-b from-stone-800 from-20% to-stone-900 to-90%  text-white w-full xl:h-80 text-4xl lg:text-5xl capitalize flex flex-col items-center p-5 justify-center">
              <p className="text-center">PETIT POINT CLUTCH</p>
            </div>
            <Button className="bg-stone-800 w-full py-8 rounded-none hidden xl:flex">
              Explore Clutch
            </Button>
          </div>

          <div className="w-full h-full grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {clutchProductsQuery.isLoading && (
              <>
                <Skeleton className="w-[100%] h-80" />
                <Skeleton className="w-[100%] h-80" />
                <Skeleton className="w-[100%] h-80" />
                <Skeleton className="w-[100%] h-80" />
              </>
            )}
            {clutchProductsQuery.isSuccess &&
              clutchProductsQuery.data.map((product, index) => (
                <ProductCard product={product} key={index} />
              ))}
          </div>

          <div className="hidden justify-between items-center xl:flex xl:flex-col xl:w-fit h-full gap-y-3">
            <div className="w-full h-full bg-gradient-to-b from-stone-800 from-20% to-stone-900 to-90%  text-white flex flex-col items-center p-5 justify-center text-4xl lg:text-5xl capitalize">
              <p className="hidden xl:flex xl:items-center h-full text-right py-10">
                PETIT <br /> POINT <br /> CLUTCH
              </p>
            </div>
            <a
              href={`${conf.baseURL}/products?category=clutch`}
              className="w-full"
            >
              <button className="hover:before:bg-stone-50 relative h-[50px] w-full overflow-hidden border border-stone-800 bg-stone-800 px-8 text-white shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-stone-50 before:transition-all before:duration-500 hover:text-stone-800 hover:before:left-0 hover:before:w-full">
                <span className="relative z-10 w-full text-sm tracking-wider flex items-center justify-center">
                  EXPLORE CLUTCH
                </span>
              </button>
            </a>
          </div>

          <a href={`${conf.baseURL}/products?category=clutch`}>
            <button className="xl:hidden hover:before:bg-stone-50 relative h-[50px] w-full overflow-hidden border border-stone-800 bg-stone-800 px-8 text-white shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-stone-50 before:transition-all before:duration-500 hover:text-stone-800 hover:before:left-0 hover:before:w-full">
              <span className="relative z-10 w-full text-sm tracking-wider flex items-center justify-center">
                EXPLORE CLUTCH
              </span>
            </button>
          </a>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default ClutchProducts;
