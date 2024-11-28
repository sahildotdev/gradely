import React, { useState } from "react";
import { motion } from "framer-motion";
import useEssayEvaluationStore from "@/store/essayEvaluationStore";
import CourseworkItem from "./CourseworkItem";

const CourseworkList: React.FC = () => {
  const { courseworkList } = useEssayEvaluationStore();
  const [showAll, setShowAll] = useState(false);

  const handleCardClick = (courseworkTitle: string) => {
    const storedFiles = JSON.parse(
      localStorage.getItem("fileMetadata") || "[]"
    );
    const fileData = storedFiles.find(
      (file: any) => file.name === courseworkTitle
    );

    if (fileData && fileData.base64) {
      const newTab = window.open();
      if (newTab) {
        newTab.document.write(
          `<iframe src="${fileData.base64}" width="100%" height="100%"></iframe>`
        );
      }
    } else {
      alert("File not found.");
    }
  };

  const cardsToShow = showAll ? courseworkList : courseworkList.slice(0, 3);

  if (courseworkList.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No coursework uploaded yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start">
      <div className="flex flex-col md:flex-row md:flex-wrap gap-6">
        {cardsToShow.map((coursework, index) => (
          <motion.div
            key={coursework.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
              scale: 1.05,
              rotate: 1,
              translateZ: 10,
            }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            onClick={() => handleCardClick(coursework.title)} // Handle card click
            className="cursor-pointer"
          >
            <CourseworkItem
              title={coursework.title}
              subject={coursework.subject}
              readTime={`${Math.ceil(coursework.wordCount / 200)} min read`}
              wordCount={coursework.wordCount}
              rating={coursework.rating}
              language={coursework.language}
              thumbnailUrl={coursework.thumbnailUrl}
              file={coursework.file}
            />
          </motion.div>
        ))}
      </div>

      {courseworkList.length > 3 && (
        <motion.div
          className="flex justify-center mt-4 w-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAll(!showAll)}
            className="px-4 py-2 text-[#98A1BB] rounded"
          >
            {showAll ? "Show Less" : "View All"}
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default CourseworkList;
