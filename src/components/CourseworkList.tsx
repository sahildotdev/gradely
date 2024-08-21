"use client";

import Card from "./Card";
import FeatureCard from "./FeatureCard";

export default function CourseworkList() {
  return (
    <div>
      {/*<Card
        title="How does the temperature of a Copper pipe affect the time it takes a magnet to fall thought "
        description="How does the temperature of a Copper pipe affect the time it takes a magnet to fall thought "
        image="./A4.svg"
        chips={[
          {
            label: "Avatar Chip",
            avatar: { src: "./avatar.svg", fallback: "A", alt: "Physics HL" },
          },
          {
            label: "18 min read",
            avatar: {
              src: "./clock.png",
              alt: "Physics HL",
              fallback: "HL",
            },
          },
          {
            label: "2388 words",
            avatar: {
              src: "./paper3d.png",
              alt: "Physics HL",
              fallback: "HL",
            },
          },
          {
            label: "7/7",
            avatar: {
              src: "./star.png",
              alt: "Physics HL",
              fallback: "HL",
            },
          },
          {
            label: "English",
            avatar: {
              src: "./HandGesture.png",
              alt: "Physics HL",
              fallback: "HL",
            },
          },
        ]}
      />*/}

      <FeatureCard
        imageSrc="./A4.svg"
        imageAlt="Document preview"
        title="How does the temperature of a Copp..."
        description="How does the temperature of a Copper pipe affect the time it takes a magnet t..."
        subject="Physics HL"
        readTime="18 min read"
        wordCount="2388"
        rating="7/7"
        language="English"
      />
    </div>
  );
}
