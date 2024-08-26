import { formatPrice } from "@/helpers";
import Link from "next/link";
import React from "react";

const ProductCard = (product: any) => {
  console.log("PRODUCT", product);
  return (
    <div
      key={product.product.$id}
      className="w-full h-full flex justify-center mb-5 cursor-pointer group"
    >
      <Link href={`/products/${product.product.$id}`} className="w-full h-full">
        <div className="overflow-hidden">
          <img
            key={product.product.imgurl[0]["$id"]}
            src={product.product.imgurl[0]["previewUrl"]}
            loading="lazy"
            alt={product.product.name}
            className={`w-full h-full object-cover group-hover:scale-105 transition-all ease-in-out duration-300`}
          />
        </div>
        <div className="text-center w-full">
          <p className="text-lg mt-4 group-hover:underline">
            {product.product.name}
          </p>
          <p className="text-md text-black/50 mt-2">
            {formatPrice(product.product.price)}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
