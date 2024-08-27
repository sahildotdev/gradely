import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Define your interfaces
interface FileMetadata {
  name: string;
  size: number;
  type: string;
  file: File | null; // Store the actual file, but it will be null in persisted state
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
  evaluationResult: EvaluationResult | null;
}

interface EssayEvaluationState {
  courseworkType: string;
  subject: string;
  essayTitle: string;
  pdfFileMetadata: FileMetadata | null;
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
    coursework: Omit<
      Coursework,
      "id" | "uploadDate" | "rating" | "evaluationResult"
    >
  ) => void;
  evaluateCoursework: (courseworkId: string) => Promise<void>;
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
    (set, get) => ({
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
        const pdfFileMetadata = get().pdfFileMetadata;

        if (!pdfFileMetadata || !pdfFileMetadata.file) {
          console.error("No PDF file metadata available.");
          return;
        }

        generateThumbnail(pdfFileMetadata.file).then((thumbnailUrl) => {
          set((state) => ({
            courseworkList: [
              ...state.courseworkList,
              {
                ...coursework,
                id: Date.now().toString(),
                uploadDate: new Date().toISOString(),
                rating: 0,
                thumbnailUrl,
                evaluationResult: null,
              },
            ],
          }));
        });
      },

      evaluateCoursework: async (courseworkId: string) => {
        set({ isLoading: true });

        setTimeout(() => {
          const evaluationResult: EvaluationResult = {
            overallScore: Math.floor(Math.random() * 41) + 60,
            criteriaScores: {
              A: Math.floor(Math.random() * 41) + 60,
              B: Math.floor(Math.random() * 41) + 60,
              C: Math.floor(Math.random() * 41) + 60,
            },
            evaluationDate: new Date().toISOString(),
          };

          set((state) => ({
            courseworkList: state.courseworkList.map((item) =>
              item.id === courseworkId
                ? {
                    ...item,
                    evaluationResult,
                    rating: Math.floor(evaluationResult.overallScore / 20) + 1,
                  }
                : item
            ),
            isLoading: false,
          }));
        }, 1500);
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
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        ...state,
        pdfFileMetadata: state.pdfFileMetadata
          ? { ...state.pdfFileMetadata, file: null }
          : null,
        courseworkList: state.courseworkList.map((item) => ({
          ...item,
          fileMetadata: { ...item.fileMetadata, file: null },
        })),
      }),
    }
  )
);

export default useEssayEvaluationStore;
