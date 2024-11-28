"use client";

import React from "react";
import Image from "next/image";
import Chip from "./Chip";

interface CourseworkItemProps {
  title: string;
  subject: string;
  readTime: string;
  wordCount: number;
  rating: number;
  language: string;
  file?: File;
  thumbnailUrl?: string;
}

const CourseworkItem: React.FC<CourseworkItemProps> = ({
  title,
  subject,
  readTime,
  wordCount,
  rating,
  language,
  file,
  thumbnailUrl,
}) => {
  console.log("File in CourseworkItem:", file);

  console.log("Rendering thumbnailUrl in CourseworkItem:", thumbnailUrl);

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start p-4 md:p-6 bg-gradient-to-r from-purple-100 to-white rounded-3xl shadow-lg w-full md:w-[420px]">
      <div className="bg-white hidden md:flex relative w-full md:w-[120px] h-[200px] md:h-[160px] p-1 rounded-3xl border border-gray-300 overflow-hidden mb-4 md:mb-0">
        {thumbnailUrl && (
          <>
            <Image
              width={118}
              height={150}
              src={thumbnailUrl}
              alt="PDF Thumbnail"
              className="w-full rounded-3xl h-auto object-cover"
            />
          </>
        )}
      </div>

      <div className="flex-1 md:ml-4">
        <h2 className="text-lg font-Mont font-extrabold leading-6 text-gray-800">
          {title}
        </h2>
        <p className="text-xs font-Mont uppercase font-semibold leading-4 text-gray-600 mt-1 md:mt-2">
          {subject}
        </p>
        <div className="mt-2 flex flex-wrap gap-1">
          <Chip
            label={`${wordCount} words`}
            avatar={{
              src: "/paper3d.png",
              alt: "Physics HL",
              fallback: "HL",
            }}
          />
          <Chip
            label={readTime}
            avatar={{
              src: "/clock.png",
              fallback: "Clock",
            }}
          />
          <Chip
            label={`${rating}/7`}
            avatar={{
              src: "/star.png",
              fallback: "Star",
            }}
          />
          <Chip
            label={subject}
            avatar={{
              src: "/HandGesture.png",
              alt: "Physics HL",
              fallback: "HL",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseworkItem;
