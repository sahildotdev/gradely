"use client";

import FileUploadAndForm from "./FileUploadAndForm";
import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <section className="py-10">
      <div className="flex justify-between mx-auto px-6">
        <div className="flex flex-col space-y-8 justify-center">
          <h1 className="font-Mont text-[2.5rem] font-bold text-[#2D264B]">
            Hey IB Folks! Unsure about the quality of your <br /> answers?{" "}
            <span className="text-[#6947BF]">We get you.</span>
          </h1>
          <FileUploadAndForm />
        </div>
        <div className="">
          <Image
            src="/robot.png"
            alt="Robot"
            width={344}
            height={626}
            className="object-contain object-bottom "
          />
        </div>
      </div>
    </section>
  );
}
