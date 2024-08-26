"use client";

import service from "@/appwrite/config";
import AuthLayout from "@/components/AuthLayout";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAppSelector } from "@/lib/store";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { AiFillEdit } from "react-icons/ai";
import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import EditAddressForm from "@/components/UpdateAddressForm";
import UpdateAddressForm from "@/components/UpdateAddressForm";

const page = () => {
  const router = useRouter();
  const currentUser = useAppSelector((state) => state.auth.userData);
  const currentUserId = currentUser.$id;


  const userAddressQuery = useQuery({
    queryKey: ["userAddress", currentUser.$id],
    queryFn: async () => {
      return await service.getUserAddress(currentUser.$id);
    },
    staleTime: 1000 * 60 * 5,
  });

  const setPrimaryAddress = async (addressId: string) => {
    const res = await service.setPrimaryAddress(currentUserId, addressId);
    if (res) {
      await userAddressQuery.refetch();}
  }

  console.log(userAddressQuery.data);

  return (
    <AuthLayout authentication={true}>
      <MaxWidthWrapper className="min-h-screen">
        <div className="flex items-center justify-start py-10 gap-3 border-b-2 mb-10">
          <button
            type="button"
            className="hover:bg-gray-100 rounded-xl p-3"
            onClick={() => router.replace("/my-account")}
          >
            <ArrowLeft />
          </button>
          <div className="flex flex-col items-start justify-center">
            <p className="text-xs text-black/50">BACK TO MY ACCOUNT</p>
            <p className="text-3xl tracking-wider">MY ADDRESS</p>
          </div>
        </div>

        <div>
          {userAddressQuery.isLoading && (
            <div className="flex flex-col gap-5">
              <Skeleton className="h-10 w-[100%]" />
              <div className="flex">
                <Skeleton className="h-32 w-36" />
                <Skeleton className="h-32 w-36" />
              </div>
            </div>
          )}

          <div className="flex flex-wrap justify-center sm:justify-start w-full h-full gap-10 mb-20">
            {userAddressQuery.data &&
              userAddressQuery.data.length > 0 &&
              userAddressQuery.data.map((address, index) => (
                <div
                key={index}
                  className={`${
                    address.isDefault
                      ? "bg-stone-800 rounded-lg p-3 "
                      : "flex flex-col items-start"
                  }`}
                >
                  {address.isDefault ? (
                    <p className="text-white pb-2 text-sm text-center ">
                      PRIMARY ADDRESS
                    </p>
                  ) : (
                    <Button variant={"ghost"} className="text-xs" onClick={() => setPrimaryAddress(address.$id)}>
                      SET AS PRIMARY ADDRESS
                    </Button>
                  )}
                  <div
                    key={index}
                    className="p-5 h-56 w-60 rounded-md shadow-lg bg-gray-50 border border-stone-800"
                  >
                    <div className="w-full h-full flex flex-col items-end justify-between">
                      <div className="w-full h-full text-left">
                        <p className="text-lg font-semibold">
                          {address.firstName} {address.lastName}
                        </p>
                        <div className="truncate">
                          <p className="text-sm">{address.phone}</p>
                          <p className="text-sm">{address.address1}</p>
                          <p className="text-sm">{address.address2}</p>
                          <p className="text-sm">
                            {address.city}, {address.state} - {address.pincode}
                          </p>
                        </div>
                        <p className="text-sm">{address.country}</p>
                      </div>
                      <div className="w-full h-full flex items-center justify-end gap-3">
                          <Dialog>
                            <DialogTrigger className="p-3">
                                <AiFillEdit size={18} />
                            </DialogTrigger>
                            <DialogContent className="px-0">
                              <DialogHeader>
                                <DialogTitle className="text-2xl tracking-wider my-5 text-center">
                                  UPDATE ADDRESS
                                </DialogTitle>
                                <DialogDescription className="text-center">
                                  Please update your:
                                </DialogDescription>
                              </DialogHeader>
                              <UpdateAddressForm formData = {address} currentUserId={currentUserId} />
                            </DialogContent>
                          </Dialog>
                        <button
                          type="button"
                          className="hover:bg-gray-100 rounded-xl p-3"
                          onClick={() =>
                            router.replace(
                              `/my-account/my-address/${address.$id}`
                            )
                          }
                        >
                          <FaTrashAlt size={18} className="text-red-800" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            {!userAddressQuery.data && !userAddressQuery.isLoading && (
              <p className="py-10">Please add a new address</p>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </AuthLayout>
  );
};

export default page;
