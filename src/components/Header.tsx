"use client";

import FileUploadAndForm from "./FileUploadAndForm";
import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <section className="">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="font-[mont] font-extrabold text-[32px] text-gray-800">
            Hey IB Folks ! Unsure about the quality of your answers? We get you.
          </h1>
          <FileUploadAndForm />
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <Image src="/robot.png" alt="Robot" width="344" height="626" />
        </div>
      </div>
    </section>
  );
}
