"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { LayoutDashboard, Files, Book, FileQuestion, Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

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
      <div className="flex flex-col space-y-4 w-full px-2">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>
              <SidebarButton href="">
                <LayoutDashboard className="h-6 w-6" />
                <span className="ml-2 block md:hidden">Home</span>
              </SidebarButton>
            </TooltipTrigger>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <SidebarButton href="">
                <Book className="h-6 w-6" />
                <span className="ml-2 block md:hidden">Book</span>
              </SidebarButton>
            </TooltipTrigger>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <SidebarButton href="">
                <Files className="h-6 w-6" />
                <span className="ml-2 block md:hidden">copy</span>
              </SidebarButton>
            </TooltipTrigger>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <SidebarButton href="">
                <FileQuestion className="h-6 w-6" />
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
      <div className="md:hidden fixed top-0 left-0 w-full flex items-center justify-between px-4 py-2 bg-white border-b border-slate-200 z-40">
        <div className="flex items-center">
          <Image
            src="/ZUAILogo.png"
            width={48}
            height={48}
            alt="zuai"
            className="w-12 h-auto rounded-md"
          />
        </div>
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
      <div className="hidden md:flex md:justify-between rounded-lg bg-white w-16 h-[97vh] flex-col items-center pb-4 transition-all duration-300 border-r border-slate-200 fixed z-10">
        <div className="flex flex-col items-center pt-4">
          <Image
            src="/ZUAILogo.png"
            width={48}
            height={48}
            alt="zuai"
            className="w-12 h-auto rounded-md mb-4"
          />
          <SidebarContent />
        </div>
        <div className="flex flex-col space-y-4 w-full px-2">
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
