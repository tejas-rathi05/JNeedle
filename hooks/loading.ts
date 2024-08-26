"use client"

import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export const useNavigationLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500); // Simulate a short loading time

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return isLoading;
};
