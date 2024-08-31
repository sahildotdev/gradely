import React, { useState } from "react";
import useEssayEvaluationStore from "@/store/essayEvaluationStore";
import CourseworkItem from "./CourseworkItem";

const CourseworkList: React.FC = () => {
  const { courseworkList } = useEssayEvaluationStore();
  const [showAll, setShowAll] = useState(false);

  // Determine which cards to show
  const cardsToShow = showAll ? courseworkList : courseworkList.slice(0, 2);

  if (courseworkList.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No coursework uploaded yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row md:flex-wrap gap-5">
      {cardsToShow.map((coursework) => (
        <CourseworkItem
          key={coursework.id}
          title={coursework.title}
          subject={coursework.subject}
          readTime={`${Math.ceil(coursework.wordCount / 200)} min read`}
          wordCount={coursework.wordCount}
          rating={coursework.rating}
          language={coursework.language}
          thumbnailUrl={coursework.thumbnailUrl}
        />
      ))}

      {courseworkList.length > 2 && (
        <div className="flex justify-center mt-4 w-full">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-4 py-2 text-[#98A1BB] rounded"
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseworkList;
