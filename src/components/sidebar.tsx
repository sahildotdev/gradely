"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

import {
  HomeIcon,
  BookIcon,
  FileIcon,
  QuizIcon,
  LogoIcon,
} from "@/components/icons";

/*import HomeIcon from "@/components/icons/HomeIcon";
import BookIcon from "@/components/icons/BookIcon";
import FileIcon from "@/components/icons/FileIcon";
import QuizIcon from "@/components/icons/QuizIcon";
import LogoIcon from "@/components/icons/LogoIcon";*/

function SidebarButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className="w-full cursor-pointer">
      <Button
        variant="ghost"
        className={cn(
          "flex w-full justify-center h-12 text-primary/70 hover:text-primary p-0",
          isActive && "bg-primary/10"
        )}
      >
        {children}
      </Button>
    </Link>
  );
}

const SidebarContent: React.FC = () => {
  return (
    <>
      <div className="flex flex-col gap-2 w-full p-5 md:p-0 items-start md:items-center ">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>
              <SidebarButton href="">
                <div className="flex justify-center items-center rounded-full size-[36px] bg-[#6947BF]">
                  <HomeIcon />
                </div>

                <span className="ml-2 block md:hidden">Home</span>
              </SidebarButton>
            </TooltipTrigger>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <SidebarButton href="">
                <div className="flex justify-center items-center rounded-full size-[36px] bg-[F8FAFC]">
                  <BookIcon />
                </div>

                <span className="ml-2 block md:hidden">Book</span>
              </SidebarButton>
            </TooltipTrigger>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <SidebarButton href="">
                <div className="flex justify-center items-center rounded-full size-[36px] bg-[F8FAFC]">
                  <FileIcon />
                </div>

                <span className="ml-2 block md:hidden">copy</span>
              </SidebarButton>
            </TooltipTrigger>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <SidebarButton href="">
                <div className="flex justify-center items-center rounded-full size-[36px] bg-[F8FAFC]">
                  <QuizIcon />
                </div>

                <span className="ml-2 block md:hidden">FileQuestion</span>
              </SidebarButton>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );
};

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:fixed left-3 top-3 z-50">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
          <div className="h-full flex flex-col md:justify-between content-center py-4">
            <SidebarContent />
          </div>
        </SheetContent>
      </Sheet>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 w-full flex content-center items-center justify-between px-4 py-2 bg-red-400 border-b border-slate-200 z-40">
        <LogoIcon width={36} height={36} />

        <Button
          variant="ghost"
          size="icon"
          className="z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:justify-between rounded-lg w-16 h-[97vh] flex-col items-center transition-all duration-300 shadow-md fixed pb-4 z-10">
        <div className="flex flex-col gap-8 items-center pt-8">
          <LogoIcon width={36} height={36} />
          <SidebarContent />
        </div>
        <div className="flex">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
