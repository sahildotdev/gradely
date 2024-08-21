"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import CourseworkList from "@/components/CourseworkList";

function Coursework() {
  const [showAll, setShowAll] = useState(false);

  const totalCourseworks = 6;

  const visibleCourseworks = showAll ? totalCourseworks : 2;

  return (
    <section>
      <>
        <div className="flex mt-10 mx-auto">
          <h2 className="font-Mont font-bold text-xl leading-7 text-gray-800 justify-start  ">
            My coursework
          </h2>

          <div className="flex flex-col  items-center">
            <div className="grid grid-cols-2 gap-5 ">
              {Array.from({ length: visibleCourseworks }).map((_, index) => (
                <CourseworkList key={index} />
              ))}
            </div>
            <Button
              type="submit"
              variant="ghost"
              onClick={() => setShowAll(!showAll)}
              className="flex font-Mont font-bold mt-4 text-[#98A1BB] "
            >
              {showAll ? "Show Less" : "View All"}
            </Button>
          </div>
        </div>
      </>
    </section>
  );
}

export default Coursework;
