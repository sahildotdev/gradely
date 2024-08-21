"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import CourseworkList from "../CourseworkList";

export default function ExploreCoursework() {
  return (
    <section className="flex flex-col mt-8">
      <h2 className="font-Mont font-bold text-xl leading-7 text-gray-800 mb-4">
        Explore Coursework
      </h2>
      <Tabs>
        <TabsList>
          <TabsTrigger className="rounded-lg" value="all">
            All
          </TabsTrigger>
          <TabsTrigger value="example">EE Example</TabsTrigger>
          <TabsTrigger value="io-example">IO Example</TabsTrigger>
          <TabsTrigger value="tok-example">ToK Example</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-2 gap-2">
            <CourseworkList />
            <CourseworkList />
            <CourseworkList />
            <CourseworkList />
          </div>
        </TabsContent>
        <TabsContent value="example">
          <div className="grid grid-cols-2 gap-2">
            <CourseworkList />
            <CourseworkList />
            <CourseworkList />
            <CourseworkList />
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
