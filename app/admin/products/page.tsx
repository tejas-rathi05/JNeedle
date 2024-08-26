"use client";

import React from "react";
import { Product, columns } from "./columns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import conf from "@/conf/conf";
import DataTable from "./data-table";
import { Skeleton } from "@/components/ui/skeleton";


const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${conf.baseURL}/api/fetch-all-products`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

const page = () => {
  const { data, isLoading, isError, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-3xl">Products</h1>
        <Link href={"/admin/products/add-product"}>
          <Button>Add Product</Button>
        </Link>
      </div>
      <div className="container px-0 mx-auto py-5 md:py-10">
        {isLoading ? (
          <div className="space-y-5">
            <Skeleton className="lg:w-[100%] h-10" />
            <Skeleton className="lg:w-[100%] h-10" />
            <Skeleton className="lg:w-[100%] h-10" />
            <Skeleton className="lg:w-[100%] h-10" />
          </div>
        ) : isError ? (
          <p>Error: {error.message}</p>
        ) : (
          data && <DataTable columns={columns} data={data} />
        )}
      </div>
    </>
  );
};

export default page;
