"use client";

import { useAppSelector } from "@/lib/store";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";

const AuthLayout = ({
  children,
  authentication = true,
}: {
  children: ReactNode;
  authentication: boolean;
}) => {
  const router = useRouter();
  const [loader, setLoader] = useState(true);
  const authStatus = useAppSelector((state) => state.auth.status);

  useEffect(() => {
    // TODO: Make it more easy to understand
    if (authentication && authStatus !== authentication) {
      router.push("/login");
    } else if (!authentication && authStatus !== authentication) {
      router.replace("/");
    }
    setLoader(false);
  }, [authStatus, router, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
};

export default AuthLayout;
