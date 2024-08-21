import Header from "@/components/Header";
import CourseworkList from "@/components/CourseworkList";
import ExploreCoursework from "@/components/ExploreCoursework";
import FeatureCard from "@/components/FeatureCard";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center bg-blue-50">
      <div className="p-10  ">
        <Header />
        <div className="mt-10 flex flex-row justify-around content-center ">
          <FeatureCard
            imageSrc="./paper.png"
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
        <ExploreCoursework />
      </div>
    </main>
  );
}
