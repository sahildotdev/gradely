import React from "react";
import {
  Card as BaseCard,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Chip, { ChipProps } from "./Chip";

interface CardProps {
  title: string;
  description: string;
  image?: string;
  chips?: ChipProps[];
  className?: string;
}

export default function Card({
  title,
  description,
  image,
  chips,
  className = "",
}: CardProps) {
  return (
    <BaseCard
      className={cn("flex border-none shadow-none flex-row ", className)}
    >
      {image && (
        <img src={image} alt={title} className="w-48 h-auto object-cover" />
      )}
      <div className="flex flex-col p-4 flex-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold truncate">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {description}
          </p>

          {/* Render Chips */}
          {chips && (
            <div className="mt-2 flex flex-wrap gap-2">
              {chips.map((chip, index) => (
                <Chip key={index} {...chip} />
              ))}
            </div>
          )}
        </CardContent>
      </div>
    </BaseCard>
  );
}
