"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import conf from "@/conf/conf";
import { Client, Databases, Query } from "appwrite";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { TfiLayoutGrid2Alt, TfiLayoutGrid3Alt } from "react-icons/tfi";
import {motion} from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";

const client = new Client()
  .setEndpoint(conf.appwriteUrl)
  .setProject(conf.appwriteProjectId);

const databases = new Databases(client);

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

const page = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q");
  const [grid, setGrid] = useState("lg");

  const fetchSuggestionsQuery = useQuery({
    queryKey: ["search", searchQuery],
    queryFn: async () => {
      const res = await fetch(`${conf.baseURL}/api/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: searchQuery}),
      });

      return res.json();
    }
  })

  console.log(fetchSuggestionsQuery)

  const handleProductGrid = (size: string) => {
    setGrid(size);
  };

  return (
    <section className="py-10">
      <h2 className="text-4xl font-light tracking-wider text-center mb-5">
        SEARCH
      </h2>
      {
        fetchSuggestionsQuery.isSuccess && (
          <p className="text-center mb-10 text-sm text-gray-600">{fetchSuggestionsQuery.data.length} results from &quot;{searchQuery}&quot;</p>
        )
      }
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
          
        </div>
        <MaxWidthWrapper className="flex items-center justify-center">
          <div className="w-full h-full">
            {fetchSuggestionsQuery.isLoading ? (
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
                {fetchSuggestionsQuery.isSuccess && fetchSuggestionsQuery.data.map(
                  (product: ProductDetails, index: number) => (
                    <motion.div
                    key={index}
                      variants={fadeInAnimationVariants}
                      initial="initial"
                      whileInView="animate"
                      viewport={{
                        once: true,
                      }}
                      custom={index}
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
  )
};

export default page;
