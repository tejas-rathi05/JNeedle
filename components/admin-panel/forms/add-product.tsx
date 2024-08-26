"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, IndianRupee } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { productSchema, ProductFormData } from "@/types/zod";
import service from "@/appwrite/config";
import { useUploadFile } from "@/hooks/useUploadFile";
import { addNewProduct } from "@/hooks/addNewProduct";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FileUploader } from "../file-uploader";
import { Toaster, toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useMutation, useQuery } from "@tanstack/react-query";
import conf from "@/conf/conf";

export const AddProduct = () => {
  const router = useRouter();
  const [isFileUploading, setIsFileUploading] = useState(false);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      product_name: "",
      product_desc: "",
      product_category: "",
      product_color: "",
      product_length: 0,
      product_breadth: 0,
      product_height: 0,
      product_price: 0,
      product_quantity: 0,
      product_inventory_sku: "",
      images: [],
    },
  });
  const { uploadFiles, progresses, uploadedFiles, isUploading } =
    useUploadFile();

  const productCategories = useQuery({
    queryKey: ["productCategories"],
    queryFn: async () => {
      const res = await fetch(`${conf.baseURL}/api/admin/get-all-categories`);
      const data = await res.json();
      return data;
    },
    staleTime: 1000 * 60 * 60,
  });

  const createProductMutation = useMutation({
    mutationFn: async (data: ProductFormData) => {
      try {
        setIsFileUploading(true);
        const uploadedImages = await uploadFiles(data.images);
        const categoryId = await service.getProductCategoryId(
          data.product_category
        );
        console.log("Uploding status", isUploading);

        console.log("Uploaded files: ", uploadedImages);
        console.log("CategoryId: ", categoryId);

        if (uploadedImages) {
          setIsFileUploading(false);
          const newProductData: NewProductProps = {
            width: Number(data.product_breadth),
            category: categoryId,
            color: data.product_color,
            name: data.product_name,
            desc: data.product_desc,
            height: Number(data.product_height),
            length: Number(data.product_length),
            price: Number(data.product_price),
            quantity: Number(data.product_quantity),
            inventory_sku: data.product_inventory_sku,
            images: JSON.stringify(uploadedImages),
          };

          await addNewProduct(newProductData);
        }
      } catch (error) {
        toast.error("Error adding product");
      }
    },
    onSuccess: () => {
      toast.success("Product added successfully!");
      form.reset();
    },
    onError: () => {
      toast.error("Error adding product");
    },
  });

  const onSubmit = (data: ProductFormData) => {
    createProductMutation.mutate(data);
  };

  return (
    <>
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
          <h3 className="font-semibold text-3xl">Add New Product</h3>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col lg:flex-row justify-between items-start my-10 gap-5">
            <div className="w-full h-full flex flex-col justify-between items-center gap-5">
              <div className="w-full h-full">
                <h4 className="text-xl">Description</h4>
                <div className="border-2 rounded-lg mt-2 p-5 space-y-2">
                  <FormField
                    control={form.control}
                    name="product_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            disabled={createProductMutation.isPending}
                            type="text"
                            placeholder="Enter product name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="product_desc"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            disabled={createProductMutation.isPending}
                            placeholder="Enter product description"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-start gap-3">
                    <FormField
                      control={form.control}
                      name="product_category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select the product category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                {productCategories.isSuccess &&
                                  productCategories.data.map(
                                    (category: any) => (
                                      <SelectItem
                                        key={category?.$id}
                                        value={category.name}
                                        className="capitalize"
                                      >
                                        {category.name}
                                      </SelectItem>
                                    )
                                  )}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="product_color"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Color</FormLabel>
                          <FormControl>
                            <Input
                              disabled={createProductMutation.isPending}
                              type="text"
                              placeholder="Enter the HEX code"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-between gap-3 items-center pt-2">
                    <div className="flex justify-center items-center border border-input p-[2px] rounded-xl shadow-sm">
                      <FormField
                        control={form.control}
                        name="product_length"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                disabled={createProductMutation.isPending}
                                type="number"
                                placeholder="Length"
                                className="border-none rounded-lg shadow-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <p className="p-2 text-xs text-black/40">in</p>
                    </div>

                    <div className="flex justify-center items-center border border-input p-[2px] rounded-xl shadow-sm">
                      <FormField
                        control={form.control}
                        name="product_breadth"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                disabled={createProductMutation.isPending}
                                type="number"
                                placeholder="Breadth"
                                className="border-none rounded-lg shadow-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <p className="p-2 text-xs text-black/40">in</p>
                    </div>

                    <div className="flex justify-center items-center border border-input p-[2px] rounded-xl shadow-sm">
                      <FormField
                        control={form.control}
                        name="product_height"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                disabled={createProductMutation.isPending}
                                type="number"
                                placeholder="Height"
                                className="border-none rounded-lg shadow-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <p className="p-2 text-xs text-black/40">in</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-full">
                <h4 className="text-xl">Inventory</h4>
                <div className="border-2 rounded-lg mt-2 p-5 gap-3 flex flex-col sm:flex-row sm:items-center">
                  <FormField
                    control={form.control}
                    name="product_quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input
                            disabled={createProductMutation.isPending}
                            type="number"
                            placeholder="100"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="product_inventory_sku"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SKU</FormLabel>
                        <FormControl>
                          <Input
                            disabled={createProductMutation.isPending}
                            type="text"
                            placeholder="Enter the SKU code"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="w-full h-full">
                <h4 className="text-xl">Pricing</h4>
                <div className="border-2 rounded-lg mt-2 p-5 gap-x-3 flex">
                  <FormField
                    control={form.control}
                    name="product_price"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <div className="flex justify-center items-center border border-input p-[2px] rounded-xl shadow-sm">
                            <div className="p-3 bg-gray-100 rounded-l-lg">
                              <IndianRupee size={15} />
                            </div>
                            <Input
                              disabled={createProductMutation.isPending}
                              type="number"
                              id="product_price"
                              placeholder="10000"
                              className="border-none shadow-none"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="w-full h-full flex flex-col">
              <div className="w-full h-full">
                <h4 className="text-xl">Product Images</h4>
                <div className="border-2 rounded-lg mt-2 p-5 space-y-2">
                  <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                      <div className="space-y-6">
                        <FormItem className="w-full h-full">
                          <FormControl>
                            <FileUploader
                              value={field.value}
                              onValueChange={field.onChange}
                              maxFiles={4}
                              maxSize={4 * 1024 * 1024}
                              progresses={progresses}
                              // pass the onUpload function here for direct upload
                              // onUpload={uploadFiles}
                              disabled={isUploading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </div>
                    )}
                  />
                  {/* <UploadedFilesCard uploadedFiles={uploadedFiles} /> */}
                </div>
              </div>

              <Button
                disabled={createProductMutation.isPending}
                type="submit"
                className="mt-10 px-10 py-8 bg-stone-800"
              >
                {createProductMutation.isPending ? (
                  <>
                    <p>Adding Product</p>
                    <Spinner size="small" className="text-white ml-2" />
                  </>
                ) : (
                  "Add Product"
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>

      <Toaster richColors />
    </>
  );
};
