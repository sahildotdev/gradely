"use client";
import FeatureCard from "./FeatureCard";

export default function CourseworkList() {
  return (
    <div className="flex flex-col content-center">
      <div className="mt-10 flex flex-row justify-around content-center">
        <FeatureCard
          imageSrc="./paper.png"
          imageAlt="Document preview"
          title="How does the temperature of a Copp..."
          description="How does the temperature of a Copper pipe affect the time it takes a magnet t..."
          chips={[
            {
              label: "Avatar Chip",
              avatar: {
                src: "./avatar.svg",
                fallback: "A",
                alt: "Physics HL",
              },
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
        />
      </div>
    </div>
  );
}
