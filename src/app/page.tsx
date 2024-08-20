import Header from "@/components/Header";
import CourseworkList from "@/components/CourseworkList";
import ExploreCoursework from "@/components/ExploreCoursework";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center bg-blue-50">
      <div className="p-10">
        <Header />

        <div className="mt-10 grid grid-cols-1 gap-10">
          <CourseworkList />
          <ExploreCoursework />
        </div>
      </div>
    </main>
  );
}
