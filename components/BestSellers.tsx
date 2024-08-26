"use client";

import React, { Suspense, useEffect, useState } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";

import { Skeleton } from "./ui/skeleton";
import ProductCard from "./ProductCard";
import conf from "@/conf/conf";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/app/admin/products/columns";

const BestSellers = () => {
  const productsQuery = useQuery({
    queryKey: ["bestSellers"],
    queryFn: async () => {
      const res = await fetch(`${conf.baseURL}/api/fetch-all-products`);
      const data = await res.json();
      const selectedProducts = getRandomProducts(data, 4);
      console.log("QUERY WORKING!!!");
      return selectedProducts;
    },
    staleTime: 1000 * 60 * 60,
  });

  const getRandomProducts = (products: Product[], count: number): Product[] => {
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  return (
    <MaxWidthWrapper>
      <section className="py-20 lg:pb-20">
        <div className="flex justify-between items-center cursor-pointer">
          <h2 className="text-5xl w-full font-extrabold text-center text-stone-800 tracking-wider">
            OUR BEST SELLERS
          </h2>
        </div>

        <div className="flex justify-center mt-10">
          <div className="w-full h-full grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {productsQuery.isLoading && (
              <>
                <Skeleton className="w-[100%] h-80" />
                <Skeleton className="w-[100%] h-80" />
                <Skeleton className="w-[100%] h-80" />
                <Skeleton className="w-[100%] h-80" />
              </>
            )}
            {productsQuery.isSuccess &&
              productsQuery.data.map((product, index) => (
                <ProductCard product={product} key={index} />
              ))}
          </div>
        </div>
        <div className="flex justify-center items-center w-full my-10">
          <a href={`${conf.baseURL}/products?category=all`}>
            <button className="hover:before:bg-white relative h-[50px] w-full overflow-hidden border border-stone-800 bg-stone-800 px-8 text-white shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-white before:transition-all before:duration-500 hover:text-stone-800 hover:before:left-0 hover:before:w-full">
              <span className="relative z-10 w-full text-sm tracking-widest flex items-center justify-center">
                SHOP ALL PRODUCTS
              </span>
            </button>
          </a>
        </div>
      </section>
    </MaxWidthWrapper>
  );
};

export default BestSellers;
