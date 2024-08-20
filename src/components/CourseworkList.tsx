"use client";

import { Card, CardContent } from "./ui/card";

export default function CourseworkList() {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        My Coursework
      </h2>
      <div className="grid grid-cols-3 gap-4">
        <Card className="shadow-md">
          <CardContent>
            <p className="font-bold">How does the temperature of a Copper...</p>
            <p className="text-sm text-gray-600">Physics | EE | 1200 words</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardContent>
            <p className="font-bold">How does the temperature of a Copper...</p>
            <p className="text-sm text-gray-600">Physics | EE | 1200 words</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardContent>
            <p className="font-bold">How does the temperature of a Copper...</p>
            <p className="text-sm text-gray-600">Physics | EE | 1200 words</p>
          </CardContent>
        </Card>
        {/* Repeat Card for each coursework item */}
      </div>
    </div>
  );
}
