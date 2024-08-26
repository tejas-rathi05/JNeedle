"use client";

import { FC, Suspense, useEffect, useState } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductCarousel from "@/components/ProductCarousel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/helpers";
import { addToCart } from "@/lib/features/cartSlice";
import { Dot, Minus, Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/lib/store";
import service from "@/appwrite/config";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster, toast } from "sonner";
import conf from "@/conf/conf";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import YouMayLike from "@/components/YouMayLike";

interface PageProps {
  params: {
    productId: string;
  };
}

interface ProductImagesProps {
  $id: string;
  previewUrl: string;
  name: string;
}

const Page: FC<PageProps> = ({ params }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const authStatus = useAppSelector((state) => state.auth.status);
  const userData = useAppSelector((state) => state.auth.userData);
  const cartItems = useAppSelector((state) => state.cart.items);
  const [quantity, setQuantity] = useState<number>(1);
  const [productImages, setProductImages] = useState<ProductImagesProps[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const productQuery = useQuery({
    queryKey: ["product", { id: params.productId }],
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
      setProductImages(data.imgurl);
      setSelectedImage(data.imgurl[0]);

      return data;
    },
  });

  const handleAddToCart = async () => {
    try {
      if (authStatus && userData) {
        const userId = userData?.userData?.$id ?? userData?.$id;

        if (productQuery.isSuccess) {
          const payload = {
            userId,
            productId: productQuery.data.$id,
            product: productQuery.data.$id,
            quantity,
          };
          await service.addCartItem(payload);
          await queryClient.invalidateQueries({
            queryKey: ["cartItems", userData?.userData?.$id ?? userData?.$id],
            refetchType: "all",
          });
          toast.success("Added to cart!");
          router.push("/cart");
        }
      } else {
        if (productQuery.isSuccess) {
          const cartItem = {
            id: productQuery.data.$id,
            name: productQuery.data.name,
            price: productQuery.data.price,
            quantity,
            imgurl: productQuery.data.imgurl,
          };
          dispatch(addToCart(cartItem));
          toast.success("Added to cart!");
          router.push("/cart");
        }
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
    console.log("cartItems", cartItems);
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  return (
    <MaxWidthWrapper className="py-10">
      {productQuery.isSuccess && (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/products/${params.productId}`}>
                {productQuery.data.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )}

      <div className="flex flex-col items-center lg:flex-row lg:items-start justify-center gap-5">
        <div className="h-full w-full lg:w-3/5">
          <div className="">
            {productQuery.isLoading ? (
              <Skeleton className="h-[90vh] w-full rounded-lg" />
            ) : (
              <ProductCarousel gallery={productImages} />
            )}
          </div>
          <div className="hidden lg:block mt-10 text-xs px-10">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-2" className="border-t-[1px]">
                <AccordionTrigger className="text-xs">MANUFACTURER INFO</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-1">
                <AccordionTrigger>PACKAGING</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div className="w-full sm:w-1/2 lg:w-2/5 h-full flex flex-col items-center justify-center mt-10 lg:mt-0 lg:items-start lg:justify-start">
          {productQuery.isSuccess && (
            <>
              <div>
                <h2 className="text-3xl font-semibold">
                  {productQuery.data.name}
                </h2>
                <p className="text-sm text-gray-600 text-center lg:text-left">
                  Petit Point{" "}
                  <span className="capitalize">
                    {productQuery.data.productCategory?.name}
                  </span>
                </p>
              </div>

              <div className="py-10 text-gray-500 text-center lg:text-left">
                <p className="text-2xl">
                  {formatPrice(productQuery.data.price)}
                </p>
                <p className="my-3 text-sm">MRP inclusive of all taxes.</p>
              </div>

              <div className="flex border">
                <Button
                  variant={"ghost"}
                  className="w-full h-12"
                  onClick={decreaseQuantity}
                >
                  <Minus size={15} />
                </Button>
                <Input
                  type="number"
                  value={quantity}
                  readOnly
                  className="w-12 h-12 text-center border-none ml-2 shadow-none"
                />
                <Button
                  variant={"ghost"}
                  className="w-full h-12"
                  onClick={increaseQuantity}
                >
                  <Plus size={15} />
                </Button>
              </div>

              <div className="w-full h-full my-10">
                <button
                  className="hover:before:bg-white relative h-[50px] w-full overflow-hidden border border-stone-800 bg-stone-800 px-3 text-white shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-white before:transition-all before:duration-500 hover:text-stone-800 hover:before:left-0 hover:before:w-full"
                  onClick={handleAddToCart}
                >
                  <span className="relative w-full text-sm tracking-widest flex items-center justify-center">
                    ADD TO CART <Dot size={20} className="mx-2" />{" "}
                    <span className="tracking-widest">
                      {formatPrice(productQuery.data.price)}
                    </span>
                  </span>
                </button>
              </div>

              <div className="text-sm text-gray-700 mb-10">
                <p>{productQuery.data.desc}</p>
                <p className="mt-10">*No Returns & No Exchange.</p>
              </div>

              <div className="text-sm py-5 flex flex-col items-start justify-center w-full">
                <p className="font-semibold">Dimension: </p>
                <div className="text-gray-700 leading-relaxed">
                  <p>
                    Height - {productQuery.data.length} inches{" "}
                    <span>
                      ({(productQuery.data.length * 2.54).toFixed(2)} cm)
                    </span>
                  </p>
                  <p>
                    Width - {productQuery.data.width} inches{" "}
                    <span>
                      ({(productQuery.data.width * 2.54).toFixed(2)} cm)
                    </span>
                  </p>
                  <p>
                    Depth - {productQuery.data.height} inches{" "}
                    <span>
                      ({(productQuery.data.height * 2.54).toFixed(2)} cm)
                    </span>
                  </p>
                </div>
              </div>

              <div className="text-sm py-5 w-full">
                <p className="font-semibold">Care Instructions: </p>
                <div className="text-gray-700 leading-relaxed">
                  <ul style={{ listStyleType: "disc" }} className="ml-5">
                    <li>Dry clean only. </li>
                    <li>Do not wash. </li>
                    <li>Do not bleach. </li>
                    <li>Do not tumble dry. </li>
                  </ul>
                </div>
              </div>

              <div className="text-sm py-5 border-b w-full">
                <p className="text-gray-700 leading-relaxed">
                  Country of Origin: India
                </p>
              </div>
              <div className="text-sm py-5 border-b w-full">
                <p className="text-gray-700 leading-relaxed">
                  Estimated Dispatch Time : 9 Days
                </p>
              </div>
            </>
          )}

          {productQuery.isLoading && (
            <div className="w-full h-full space-y-5">
              <Skeleton className="w-full h-20" />
              <Skeleton className="w-full h-10" />
              <Skeleton className="w-full h-10" />
            </div>
          )}
        </div>
      </div>

      {productQuery.isSuccess && (
        <YouMayLike productCategory={productQuery.data.productCategory.name} />
      )}
      <Toaster richColors />
    </MaxWidthWrapper>
  );
};

export default Page;
