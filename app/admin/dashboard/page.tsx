import authService from "@/appwrite/auth";
import { GetServerSideProps } from "next";
import React from "react";

const page = () => {
  return (
    <div className="flex items-center">
      <h1 className="text-lg font-semibold md:text-3xl">Dashboard</h1>
    </div>
  );
};


export default page;