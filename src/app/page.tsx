"use client";

import React from "react";
import Header from "@/components/Header";
import ExploreCoursework from "@/components/ExploreCoursework";
import { Calendar, Files } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Chip from "@/components/Chip";
import CourseworkList from "@/components/CourseworkList";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-between md:p-24 bg-yellow-500">
      <div className="md:fixed top-3 right-4 flex flex-row md:flex-col items-end gap-4 space-y-8 md:space-y-0 ">
        <Chip
          label="120"
          avatar={{
            src: "/ZU.png",
            alt: "@shadcn",
            fallback: "CN",
          }}
          color="secondary"
          className="font-Mont font-extrabold text-base"
        />
        <Chip
          label="24"
          avatar={{
            src: "/flame.png",
            alt: "@shadcn",
            fallback: "CN",
          }}
          color="default"
          className="font-Mont font-extrabold text-base"
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Calendar className="h-6 w-6" />
            </TooltipTrigger>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Files className="h-6 w-6" />
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex flex-col gap-5 bg-red-500 justify-center content-center ">
        <Header />
        <div className="container flex flex-col">
          <h2 className="text-2xl font-semibold py-5">My Coursework</h2>
          <CourseworkList />
        </div>
        <ExploreCoursework />
      </div>
    </main>
  );
}
