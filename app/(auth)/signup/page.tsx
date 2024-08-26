import AuthLayout from "@/components/AuthLayout";
import Signup from "@/components/Signup";
import React from "react";

const page = () => {
  return (
    <AuthLayout authentication={false}>
      <Signup />
    </AuthLayout>
  );
};

export default page;
