import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define your interfaces
interface FileMetadata {
  name: string;
  size: number;
  type: string;
  file: File; // Store the actual file
}

interface EvaluationResult {
  overallScore: number;
  criteriaScores: {
    A: number;
    B: number;
    C: number;
  };
  evaluationDate: string;
}

interface Coursework {
  id: string;
  title: string;
  subject: string;
  wordCount: number;
  uploadDate: string;
  type: string;
  fileMetadata: FileMetadata;
  rating: number;
  language: string;
  thumbnailUrl: string;
}

interface EssayEvaluationState {
  courseworkType: string;
  subject: string;
  essayTitle: string;
  pdfFileMetadata: FileMetadata | null; // Single file metadata instead of an array
  evaluationResult: EvaluationResult | null;
  isLoading: boolean;
  isEvaluationRequested: boolean;
  courseworkList: Coursework[];
  setCourseworkType: (type: string) => void;
  setSubject: (subject: string) => void;
  setEssayTitle: (title: string) => void;
  setPdfFileMetadata: (metadata: FileMetadata) => void;
  setEvaluationResult: (result: EvaluationResult) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsEvaluationRequested: (isRequested: boolean) => void;
  addCoursework: (
    coursework: Omit<Coursework, "id" | "uploadDate" | "rating">
  ) => void;
  resetEvaluation: () => void;
}

// Function to generate a thumbnail from a PDF file
const generateThumbnail = async (pdfFile: File): Promise<string> => {
  try {
    // Replace this with your actual thumbnail generation logic
    const thumbnailUrl = "/path/to/generated/thumbnail.png"; // Example placeholder
    return thumbnailUrl;
  } catch (error) {
    console.error("Failed to generate thumbnail:", error);
    return ""; // Return an empty string if thumbnail generation fails
  }
};

const useEssayEvaluationStore = create<EssayEvaluationState>()(
  persist(
    (set) => ({
      courseworkType: "",
      subject: "",
      essayTitle: "",
      pdfFileMetadata: null,
      evaluationResult: null,
      isLoading: false,
      isEvaluationRequested: false,
      courseworkList: [],
      setCourseworkType: (type) => set({ courseworkType: type }),
      setSubject: (subject) => set({ subject }),
      setEssayTitle: (title) => set({ essayTitle: title }),
      setPdfFileMetadata: (metadata) => set({ pdfFileMetadata: metadata }),
      setEvaluationResult: (result) => set({ evaluationResult: result }),
      setIsLoading: (isLoading) => set({ isLoading }),
      setIsEvaluationRequested: (isRequested) =>
        set({ isEvaluationRequested: isRequested }),

      addCoursework: async (coursework) => {
        const pdfFileMetadata =
          useEssayEvaluationStore.getState().pdfFileMetadata;

        if (!pdfFileMetadata) {
          console.error("No PDF file metadata available.");
          return;
        }

        const thumbnailUrl = await generateThumbnail(pdfFileMetadata.file);

        set((state) => ({
          courseworkList: [
            ...state.courseworkList,
            {
              ...coursework,
              id: Date.now().toString(),
              uploadDate: new Date().toISOString(),
              rating: Math.floor(Math.random() * 5) + 1,
              thumbnailUrl,
            },
          ],
        }));
      },

      resetEvaluation: () =>
        set({
          evaluationResult: null,
          isLoading: false,
          isEvaluationRequested: false,
        }),
    }),
    {
      name: "essay-evaluation-storage",
    }
  )
);

export default useEssayEvaluationStore;
