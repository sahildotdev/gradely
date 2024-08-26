import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseworkList from "./CourseworkList";

const ExploreCoursework: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl md:text-2xl font-semibold mb-3 text-center md:text-left">
        Explore Coursework
      </h2>
      <Tabs className="flex flex-col gap-3 md:gap-5">
        <TabsList className="overflow-x-auto flex-nowrap whitespace-nowrap scrollbar-hide justify-center md:justify-start gap-2 md:gap-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="example">EE Example</TabsTrigger>
          <TabsTrigger value="io-example">IO Example</TabsTrigger>
          <TabsTrigger value="tok-example">ToK Example</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <CourseworkList />
        </TabsContent>
        <TabsContent value="example">
          <div>
            <CourseworkList />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExploreCoursework;
