"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent } from "./ui/card";

export default function ExploreCoursework() {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Explore Coursework
      </h2>
      <Tabs>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="example">EE Example</TabsTrigger>
          <TabsTrigger value="io-example">IO Example</TabsTrigger>
          <TabsTrigger value="tok-example">ToK Example</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-3 gap-4">
            <Card className="shadow-md">
              <CardContent>
                <p className="font-bold">
                  How does the temperature of a Copper...
                </p>
                <p className="text-sm text-gray-600">
                  Physics | EE | 1200 words
                </p>
              </CardContent>
            </Card>
            {/* Repeat Card for each coursework item */}
          </div>
        </TabsContent>

        {/* Repeat TabsContent for each tab */}
      </Tabs>
    </div>
  );
}
