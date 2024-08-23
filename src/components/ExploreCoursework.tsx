import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseworkList from "./CourseworkList";

const ExploreCoursework: React.FC = () => {
  return (
    <div className="container">
      <h2 className="text-2xl font-semibold mb-3">Explore Coursework</h2>
      <Tabs className="flex flex-col justify-start gap-5">
        <TabsList className="flex justify-start">
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
