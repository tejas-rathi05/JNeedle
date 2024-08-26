"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { AppDispatch, useAppSelector } from "@/lib/store";
import React from "react";
import LocalCart from "@/components/cart/LocalCart";
import UserCart from "@/components/cart/UserCart";

const CartPage = () => {
  const authStatus = useAppSelector((state) => state.auth.status);

  return (
    <MaxWidthWrapper className="flex flex-col items-center justify-start pb-32 min-h-screen">
      {authStatus ? <UserCart /> : <LocalCart />}
    </MaxWidthWrapper>
  );
};

export default CartPage;
