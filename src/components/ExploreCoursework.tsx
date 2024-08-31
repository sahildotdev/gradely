import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseworkList from "./CourseworkList";

const ExploreCoursework: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-col justify-start gap-5">
      <h1 className="text-xl md:text-2xl font-semibold">Explore Coursework</h1>
      <Tabs className="flex flex-col justify-start gap-5">
        <TabsList className="flex justify-start overflow-x-auto whitespace-nowrap scrollbar-hide">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="example">EE Example</TabsTrigger>
          <TabsTrigger value="io-example">IO Example</TabsTrigger>
          <TabsTrigger value="tok-example">ToK Example</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div>
            <CourseworkList />
          </div>
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
