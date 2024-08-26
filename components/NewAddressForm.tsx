"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newAddressSchema } from "@/types/zod";
import service from "@/appwrite/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";

const NewAddressForm = ({ currentUserId }: { currentUserId: string }) => {
  const queryClient = useQueryClient();
  const form = useForm<NewAddressProps>({
    resolver: zodResolver(newAddressSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      country: "India",
      pincode: "",
      isDefault: false,
    },
  });

  const createAddressMutation = useMutation({
    mutationFn: async (data: NewAddressProps) => {
      try {
        const payload = {
          userId: currentUserId,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: Number(data.phone),
          address1: data.address1,
          address2: data.address2,
          city: data.city,
          state: data.state,
          country: data.country,
          pincode: Number(data.pincode),
          isDefault: data.isDefault,
        };

        const res = await service.addNewAddress(payload);
        console.log(res);
        if (res) {
          await queryClient.invalidateQueries({
            queryKey: ["userAddress", currentUserId],
            refetchType: "all",
          });
        }
      } catch (error) {
        console.log(error);
        // toast.error("Error adding product");
      }
    },
    onSuccess: () => {
      // toast.success("Product added successfully!");

      console.log("DONE");
      form.reset();
    },
    onError: () => {
      console.log("Error adding product");
      // toast.error("Error adding product");
    },
  });

  const onSubmit = async (data: NewAddressProps) => {
    console.log("Form Data:", data);
    createAddressMutation.mutate(data);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <ScrollArea className="w-full h-[450px]">
            <div className="space-y-5 px-10 mt-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="text" placeholder="First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="text" placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="text" placeholder="Phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address1"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="text" placeholder="Address 1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address2"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="text" placeholder="Address 2" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-5">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input type="text" placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input type="text" placeholder="State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-5">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          readOnly
                          type="text"
                          placeholder="India"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pincode"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input type="text" placeholder="PIN Code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="isDefault"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-xs">
                        Set as primary address
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </ScrollArea>
          <div className="px-10">
            <Button
              className="hover:before:bg-white relative h-[50px] w-full rounded-md overflow-hidden border border-stone-800 bg-stone-800 px-3 text-white shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-white before:transition-all before:duration-500 hover:text-stone-800 hover:before:left-0 hover:before:w-full"
              type="submit"
            >
              <span className="relative w-full text-xs tracking-widest flex items-center justify-center">
                ADD A NEW ADDRESS
              </span>
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default NewAddressForm;
