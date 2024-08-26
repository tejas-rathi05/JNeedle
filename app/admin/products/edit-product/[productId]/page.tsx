"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, IndianRupee } from "lucide-react";
import UpdateForm from "@/components/admin-panel/forms/update-form";
import conf from "@/conf/conf";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

const EditProductPage = ({ params }: { params: any }) => {
  // const [productDetails, setProductDetails] = useState<UpdateProductProps | null>(null);
  const router = useRouter();

  console.log("params", params.productId);

  const productDetails = useQuery({
    queryKey: ["productDetails", params.productId],
    queryFn: async () => {
      const res = await fetch(
        `${conf.baseURL}/api/fetch-product?productId=${params.productId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });

  return (
    <div>
      <div className="flex items-center justify-start gap-3">
        <button
          type="button"
          className="hover:bg-gray-100 rounded-xl p-3"
          onClick={() => router.replace("/admin/products")}
        >
          <ArrowLeft />
        </button>
        <div className="flex flex-col items-start justify-center">
          <p className="text-sm text-black/50">Back to product list</p>
          <h3 className="text-lg font-semibold md:text-3xl">Update Product</h3>
        </div>
      </div>
      {productDetails.data != null ? (
        <UpdateForm productDetails={productDetails.data} />
      ) : (
        <div className="flex flex-col lg:flex-row gap-5 mt-10">
          <div className="flex flex-col gap-5">
            <Skeleton className="lg:w-80 h-10" />
            <Skeleton className="lg:w-80 h-10" />
            <Skeleton className="lg:w-80 h-10" />
          </div>
          <div>
            <Skeleton className="w-80 h-80" />
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProductPage;
