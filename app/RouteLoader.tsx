"use client";

import { useNavigationLoader } from "@/hooks/loading";
import React from "react";

const RouteLoader: React.FC = () => {
  const isLoading = useNavigationLoader();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80">
      <div className="animate-pulse w-full h-full flex justify-center items-center">
        <div className="bg-white rounded-full">
          <img
            src="/images/logo/logo-space.png"
            alt="JNEEDLE"
            className="object-contain rounded-full shadow-xl"
            width={140}
            height={140}
          />
        </div>
      </div>
    </div>
  );
};

export default RouteLoader;
