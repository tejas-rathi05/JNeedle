"use client";

import React, { useState } from "react";
import authService from "@/appwrite/auth";
import { useRouter } from "next/navigation";
import { login } from "@/lib/features/authSlice";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { FaGoogle } from "react-icons/fa";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const Signup = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit } = useForm();

  const signup = async (data: any) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        router.push("/");
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex py-16 relative items-center justify-center px-4 ">
      {/* <div className="absolute top-0 z-[-1] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(91,79,73,0.13)_0,rgba(91,79,73,0)_50%,rgba(91,79,73,0)_100%)]"></div> */}
      <div className="mx-auto z-10 text-gray-700 w-full max-w-[500px]">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-normal font-geist tracking-tighter">
            Sign up
          </h1>
          <p className="text-gray-800/90 dark:text-gray-400 font-geist font-normal">
            Create your account to continue
          </p>
        </div>
        <form onSubmit={handleSubmit(signup)} className="mt-8">
          <div className="space-y-5">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                placeholder="Enter your full name"
                type="text"
                {...register("name", {
                  required: true,
                  minLength: 3,
                })}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                placeholder="Enter your email"
                required
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Invalid email",
                  },
                })}
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>

              <Input
                placeholder="Enter your password"
                required
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                })}
              />
            </div>

            <button
              type="submit"
              className="relative flex justify-center items-center  h-12 w-full mx-auto text-center font-geist tracking-tighter  overflow-hidden rounded bg-neutral-950 px-5 py-2.5 text-white transition-all duration-300 hover:bg-neutral-800 hover:ring-2 hover:ring-neutral-800 hover:ring-offset-2"
            >
              Sign up
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-500 dark:text-gray-400">
            Already have an account?
            <Link
              className="font-medium text-gray-900 underline-offset-4 hover:underline dark:text-gray-500 ml-2"
              href="/login"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
