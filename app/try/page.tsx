import React from "react";

const page = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80">
      <div className="transition-opacity duration-1000 w-full h-full flex justify-center items-center">
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

export default page;
