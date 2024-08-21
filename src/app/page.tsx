"use client";

import React, { useState } from "react";
import Header from "@/components/section/Header";
import Coursework from "@/components/section/CourseWork";
import ExploreCoursework from "@/components/section/ExploreCoursework";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center bg-blue-50">
      <div className="p-10">
        <Header />
        <Coursework />
        <ExploreCoursework />
      </div>
    </main>
  );
}
