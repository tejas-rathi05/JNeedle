"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { TfiLayoutGrid2Alt, TfiLayoutGrid3Alt } from "react-icons/tfi";

import FilterComponent from "@/components/FilterComponent";
import SortComponent from "@/components/SortComponent";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductCard from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import conf from "@/conf/conf";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

const ProductsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [grid, setGrid] = useState("lg");

  const fadeInAnimationVariants = {
    initial: {
      opacity: 0,
      y: 30,
    },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.1 * index,
      },
    }),
  };

  const category = searchParams.get("category");
  const sort = searchParams.get("sort");

  console.log("PATHNAME", pathname);

  const productsQuery = useQuery({
    queryKey: ["products", category, sort],
    queryFn: async () => {
      const res = await fetch(
        `${conf.baseURL}/api/products?category=${category || ""}&sort=${
          sort || ""
        }`
      );
      const data = await res.json();
      return data;
    },
    staleTime: 1000 * 60 * 60,
  });

  const handleFilterChange = (filters: Record<string, string>) => {
    const newSearchParams = new URLSearchParams(searchParams);
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        newSearchParams.set(key, filters[key]);
      } else {
        newSearchParams.delete(key);
      }
    });
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const handleSortChange = (sort: string | null) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (sort) {
      newSearchParams.set("sort", sort);
    } else {
      newSearchParams.delete("sort");
    }
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const handleProductGrid = (size: string) => {
    setGrid(size);
  };

  // console.log("Products", products);

  return (
    <section className="py-10">
      <h2 className="text-4xl font-light tracking-wider text-center mb-10">
        PETIT POINT COLLECTIONS
      </h2>
      <div className="flex flex-col items-center justify-center w-full gap-6">
        <div className="w-full h-full flex justify-between  border-y">
          <div className="hidden md:flex items-center justify-center py-3 gap-5 px-10 border-r ">
            <button
              className={`${grid === "sm" ? "text-black" : "text-black/40"}`}
              onClick={() => handleProductGrid("sm")}
            >
              <TfiLayoutGrid2Alt size={17} />
            </button>

            <button
              className={`${grid === "lg" ? "text-black" : "text-black/40"}`}
              onClick={() => handleProductGrid("lg")}
            >
              <TfiLayoutGrid3Alt size={17} />
            </button>
          </div>
          <div className="flex w-fit">
            <FilterComponent
              filters={Object.fromEntries(searchParams.entries())}
              onFilterChange={handleFilterChange}
            />
            <SortComponent
              sortOption={searchParams.get("sort")}
              onSortChange={handleSortChange}
            />
          </div>
        </div>
        <MaxWidthWrapper className="flex items-center justify-center">
          <div className="w-full h-full">
            {productsQuery.isLoading ? (
              <div
                className={`grid ${
                  grid === "lg"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center items-center"
                    : "grid-cols-1 lg:grid-cols-2 gap-x-2 gap-y-6 justify-items-center items-center"
                } mx-auto`}
              >
                <Skeleton className="w-80 h-80 sm:w-96 sm:h-96 lg:w-80 lg:h-80" />
                <Skeleton className="w-80 h-80 sm:w-96 sm:h-96 lg:w-80 lg:h-80" />
                <Skeleton className="w-80 h-80 sm:w-96 sm:h-96 lg:w-80 lg:h-80" />
                <Skeleton className="w-80 h-80 sm:w-96 sm:h-96 lg:w-80 lg:h-80" />
                <Skeleton className="w-80 h-80 sm:w-96 sm:h-96 lg:w-80 lg:h-80" />
                <Skeleton className="w-80 h-80 sm:w-96 sm:h-96 lg:w-80 lg:h-80" />
              </div>
            ) : (
              <div
                className={`grid ${
                  grid === "lg"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "grid-cols-1 lg:grid-cols-2 gap-x-2 gap-y-6"
                }`}
              >
                {productsQuery.data.map(
                  (product: ProductDetails, index: number) => (
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
                      <ProductCard product={product} key={product?.$id} />
                    </motion.div>
                  )
                )}
              </div>
            )}
          </div>
          
        </MaxWidthWrapper>
      </div>
    </section>
  );
};

export default ProductsPage;
