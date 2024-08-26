"use client";

import { FaCircleCheck } from "react-icons/fa6";
import authService from "@/appwrite/auth";
import service from "@/appwrite/config";
import AuthLayout from "@/components/AuthLayout";
import LoginForm from "@/components/LoginForm";
import { login, logout } from "@/lib/features/authSlice";
import { AppDispatch, useAppSelector } from "@/lib/store";
import { current } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import conf from "@/conf/conf";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const authStatus = useAppSelector((state) => state.auth.status);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
          router.push("/login");
        }
      })
      .finally(() => setLoading(false));

    // console.log(service.getCartItems(currentUser.userData.$id))
  }, []);

  return (
    <AuthLayout authentication={true}>
      {authStatus ? (
        <div className="mx-auto max-w-xl min-h-screen flex flex-col py-16 relative items-center justify-center px-4 ">
          <div className="flex flex-col justify-center items-center gap-3">
            <FaCircleCheck size={32} className="text-gray-500" />
            <p className="text-gray-700 tracking-wider">
              Logged in successfully!
            </p>
          </div>

          <div className="w-fit my-20">
            <a href={`${conf.baseURL}/products?category=all`}>
              <button className="hover:before:bg-white relative h-[50px] w-full overflow-hidden border border-stone-800 bg-stone-800 px-8 text-white shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-white before:transition-all before:duration-500 hover:text-stone-800 hover:before:left-0 hover:before:w-full">
                <span className="relative z-10 w-full text-sm tracking-widest flex items-center justify-center">
                  SHOP ALL PRODUCTS
                </span>
              </button>
            </a>
          </div>
        </div>
      ) : (
        <LoginForm />
      )}
    </AuthLayout>
  );
};

export default page;
