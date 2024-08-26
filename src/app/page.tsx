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
    <main className="flex flex-col min-h-screen items-center justify-between mx-auto p-4 md:p-8 lg:p-24">
      <div className="hidden md:fixed top-3 right-4 flex-row md:flex-col items-end gap-4 md:space-y-8 space-x-4 md:space-x-0">
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
              <Calendar className="h-6 w-6 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>Calendar</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Files className="h-6 w-6 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>Files</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="container max-w-7xl mx-auto flex flex-col gap-5">
        <Header />
        <div className="flex flex-col">
          <h2 className="text-xl md:text-2xl font-semibold py-5 text-center md:text-left">
            My Coursework
          </h2>
          <CourseworkList />
        </div>
        <ExploreCoursework />
      </div>
    </main>
  );
}
