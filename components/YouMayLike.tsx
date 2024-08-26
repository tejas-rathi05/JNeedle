"use client";

import conf from "@/conf/conf";
import { getRandomProducts } from "@/helpers";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import ProductCard from "./ProductCard";
import { Skeleton } from "./ui/skeleton";
import { Product } from "@/app/admin/products/columns";

const YouMayLike = ({ productCategory }: { productCategory: string }) => {
  console.log("productCategory", productCategory);

  const silimarProductsQuery = useQuery({
    queryKey: ["similarProducts", productCategory],
    queryFn: async () => {
      const res = await fetch(
        `${conf.baseURL}/api/products?category=${productCategory}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data) {
        const randomProducts = getRandomProducts(data, 4);
        return randomProducts;
      }
      return [];
    },
    staleTime: 1000 * 60 * 60 * 24,
  });

  if (silimarProductsQuery.isSuccess) {
    console.log("similarProducts", silimarProductsQuery.data);
  }

  return (
    <div className="mt-32 mb-10">
      <p className="text-2xl font-semibold tracking-wider text-center mb-10">
        YOU MAY ALSO LIKE
      </p>

      <div className="w-full h-full grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {silimarProductsQuery.isLoading && (
          <>
            <Skeleton className="w-80 h-80" />
            <Skeleton className="w-80 h-80" />
            <Skeleton className="w-80 h-80" />
            <Skeleton className="w-80 h-80" />
          </>
        )}
        {silimarProductsQuery.isSuccess &&
          silimarProductsQuery.data.map((product: Product, index: number) => (
            <ProductCard product={product} key={index} />
          ))}
      </div>
    </div>
  );
};

export default YouMayLike;
