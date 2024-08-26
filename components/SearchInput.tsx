"use client";

import { Search, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import namer from "color-namer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { Client, Databases, Query } from "appwrite";
import conf from "@/conf/conf";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";


const SearchInput = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [query, setQuery] = useState("");

  const fetchSuggestionsQuery = useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      const res = await fetch(`${conf.baseURL}/api/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query }),
      });

      return res.json();
    },
    enabled: query.length > 0,
  });

  console.log(query.length > 0)

  useGSAP(() => {
    if (isOpen) {
      gsap.to("#search-nav", {
        y: 0, // Move to original position
        opacity: 1, // Make visible
        duration: 0.3,
      });
      gsap.to("#search-overlay", {
        opacity: 1, // Make visible
        duration: 0.3,
      });
    } else {
      gsap.to("#search-nav", {
        y: -150, // Move upward to hide
        opacity: 0, // Hide
        duration: 0.3,
      });
      gsap.to("#search-overlay", {
        opacity: 0, // Hide
        duration: 0.3,
      });
    }
  }, [isOpen]);
  return (
    <div
      id="search-overlay"
      className={`inset-0 ${
        isOpen ? "absolute top-0 left-0 z-10" : "z-0"
      }  bg-black/70 opacity-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0`}
    >
      <div
        id="search-nav"
        className="bg-white z-50 absolute top-[80px] lg:top-[100px] left-0 w-full flex flex-col justify-center items-center mx-auto px-5 py-3 md:px-10 lg:px-20 lg:py-5"
      >
        <div className="w-full flex justify-between items-center ">
          <Search size={25} className="text-gray-400 ml-1 lg:ml-2" />

          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH..."
            className="border-none shadow-none focus-visible:ring-0"
            autoFocus
          />

          <button
            className="text-gray-400 hover:text-black transition-all ease-in-out duration-200 p-1 lg:mr-4"
            onClick={onClose}
          >
            <X size={25} />
          </button>
        </div>

        {query.length > 0 && fetchSuggestionsQuery.isSuccess &&
          fetchSuggestionsQuery.data.length > 0 ? (
            <>
              <div className="w-full h-full mt-5 flex justify-between items-center py-2">
                <p className="text-xs">
                  {fetchSuggestionsQuery?.data?.length} RESULTS
                </p>
                <a href={`/search?q=${query}`}>
                  <Button variant={"ghost"} className="text-xs">
                    VIEW RESULTS
                  </Button>
                </a>
              </div>
              <Separator className="mb-5" />
              <ScrollArea className="h-[500px] w-full pb-5">
                <div className="grid grid-cols-3 md:grid-cols-4 gap-x-10 gap-y-10">
                  {fetchSuggestionsQuery.data.map(
                    (suggestion: any) => (
                      <div key={suggestion.$id} className="w-full h-full">
                        <a
                          href={`/products/${suggestion.$id}`}
                          className="w-full h-full"
                        >
                          <div className="group overflow-hidden">
                            {suggestion.imgurl?.[0] && (
                              <img
                                key={suggestion.imgurl[0]["$id"]}
                                src={suggestion.imgurl[0]["previewUrl"]}
                                loading="lazy"
                                alt={suggestion.name}
                                className={`w-full h-full object-cover group-hover:scale-105 transition-all ease-in-out duration-300`}
                              />
                            )}
                          </div>
                          <div className="text-center w-full">
                            <p className="text-sm md:text-base mt-2 group-hover:underline capitalize">
                              {suggestion.name}
                            </p>
                          </div>
                        </a>
                      </div>
                    )
                  )}
                </div>
              </ScrollArea>
            </>
          ):(<p className="text-xs my-10">
            {fetchSuggestionsQuery?.data?.length} RESULTS
          </p>)}
      </div>
    </div>
  );
};

export default SearchInput;
