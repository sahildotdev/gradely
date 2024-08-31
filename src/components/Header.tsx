"use client";

import Image from "next/image";
import React from "react";
import EssayEvaluationForm from "./EssayEvaluationForm";
import EvaluationDisplay from "./EvaluationDisplay";
import { useEssayEvaluationStore } from "@/store";

export default function Header() {
  const { isEvaluationRequested } = useEssayEvaluationStore();
  return (
    <div className="flex flex-col md:flex-row content-center gap-5 pt-[4rem]">
      <div className="flex flex-col gap-5 justify-around md:w-[90%] ">
        <h1 className="font-Mont text-[24px] md:text-[28px] lg:text-[32px] leading-8 md:leading-10 font-extrabold text-[#2D264B]">
          Hey IB Folks! Unsure about the quality of your{" "}
          <br className=" hidden " /> answers?{" "}
          <span className="text-[#6947BF]">We get you.</span>
        </h1>
        <EssayEvaluationForm />
        {isEvaluationRequested && <EvaluationDisplay />}
      </div>
      <div className="hidden lg:flex ">
        <Image
          src="/robot.png"
          alt="Robot"
          width={344}
          height={624}
          className=""
        />
      </div>
    </div>
  );
}
