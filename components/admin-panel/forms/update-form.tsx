"use client";

import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  ProductFormData,
  UpdateProductFormData,
  productSchema,
  updateProductSchema,
} from "@/types/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import service from "@/appwrite/config";
import { Button } from "@/components/ui/button";
import { IndianRupee } from "lucide-react";
import { Toaster, toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";

const UpdateForm = ({ productDetails }: { productDetails: any }) => {
  const images = productDetails.imgurl;
  console.log("PRODUCT DETAILS", productDetails);
  console.log("IMGURL", images);

  const form = useForm<UpdateProductFormData>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      product_name: productDetails?.name || "",
      product_desc: productDetails?.desc || "",
      product_color: productDetails?.color || "",
      product_length: productDetails?.length || 0,
      product_breadth: productDetails?.width || 0,
      product_height: productDetails?.height || 0,
      product_price: productDetails?.price || 0,
      product_quantity: productDetails?.productInventory?.quantity || 0,
      product_inventory_sku: productDetails.productInventory.sku || "",
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async (data: UpdateProductFormData) => {
      const res = await service.updateProduct({
        productId: productDetails.$id,
        productInventoryId: productDetails.productInventory.$id,
        updatedData: data,
      });
    },
    onSuccess: () => {
      toast.success("Product updated successfully!");
    },
    onError: () => {
      toast.error("Error updating product");
    },
  });

  const onSubmit = (data: UpdateProductFormData) => {
    updateProductMutation.mutate(data);
  };

  return (
    <>
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
                            disabled={updateProductMutation.isPending}
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
                          <Input
                            disabled={updateProductMutation.isPending}
                            type="text"
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
                      name="product_color"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Color</FormLabel>
                          <FormControl>
                            <Input
                              disabled={updateProductMutation.isPending}
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
                                disabled={updateProductMutation.isPending}
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
                                disabled={updateProductMutation.isPending}
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
                                disabled={updateProductMutation.isPending}
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
                <div className="border-2 rounded-lg mt-2 p-5 space-y-3 ">
                  <FormField
                    control={form.control}
                    name="product_quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock</FormLabel>
                        <FormControl>
                          <Input
                            disabled={updateProductMutation.isPending}
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
                            disabled={updateProductMutation.isPending}
                            type="text"
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
                <div className="border-2 rounded-lg mt-2 p-5">
                  <FormField
                    control={form.control}
                    name="product_price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <div className="flex justify-center items-center border border-input p-[2px] rounded-xl shadow-sm">
                            <div className="p-3 bg-gray-100 rounded-l-lg">
                              <IndianRupee size={15} />
                            </div>
                            <Input
                              disabled={updateProductMutation.isPending}
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
                <div className="border-2 rounded-lg mt-2 p-2 space-y-2">
                  {images &&
                    Object.keys(images).map((key) => {
                      const image = images[key];
                      return (
                        <img
                          key={key}
                          src={image.previewUrl}
                          alt={productDetails.name}
                          className="rounded-md"
                        />
                      );
                    })}
                </div>
              </div>
              <Button
                disabled={updateProductMutation.isPending}
                type="submit"
                className="mt-10 px-10 py-8 bg-stone-800"
              >
                {updateProductMutation.isPending ? (
                  <>
                    <p>Updating</p>
                    <Spinner size="small" className="text-white ml-2" />
                  </>
                ) : (
                  "Update Product"
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

export default UpdateForm;
