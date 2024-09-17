import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as pdfjsLib from "pdfjs-dist";
/*import { PDFDocumentProxy } from "pdfjs-dist/types/display/api";*/
import { PDFDocumentProxy } from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface FileMetadata {
  name: string;
  size: number;
  type: string;
  file: File | null;
  base64: string;
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
  file: File | undefined;
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

const generateThumbnail = async (pdfFile: File): Promise<string> => {
  try {
    const fileReader = new FileReader();

    // Return a promise that resolves once the FileReader reads the file
    return new Promise((resolve, reject) => {
      fileReader.onload = async function (e) {
        const typedArray = new Uint8Array(e.target?.result as ArrayBuffer);
        const pdfDocument: PDFDocumentProxy = await pdfjsLib.getDocument(
          typedArray
        ).promise;

        // Render the first page
        const page = await pdfDocument.getPage(1);
        const scale = 1.5; // Adjust the scale if needed
        const viewport = page.getViewport({ scale });

        // Create a canvas to render the thumbnail
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
          canvasContext: context!,
          viewport: viewport,
        };

        await page.render(renderContext).promise;

        // Convert the canvas to an image URL (base64)
        const thumbnailUrl = canvas.toDataURL("image/png");

        resolve(thumbnailUrl); // Resolve with the generated thumbnail URL
      };

      fileReader.onerror = () => {
        reject("Error reading the PDF file");
      };

      fileReader.readAsArrayBuffer(pdfFile);
    });
  } catch (error) {
    console.error("Failed to generate thumbnail:", error);
    return "/images/thumbnail.png"; // Provide a fallback thumbnail if generation fails
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

        // Generate the thumbnail from the PDF file
        const thumbnailUrl = await generateThumbnail(pdfFileMetadata.file);

        set((state) => ({
          courseworkList: [
            ...state.courseworkList,
            {
              ...coursework,
              id: Date.now().toString(),
              uploadDate: new Date().toISOString(),
              rating: 0,
              thumbnailUrl, // Use the generated thumbnail URL
              evaluationResult: null,
            },
          ],
        }));
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
          ? { ...state.pdfFileMetadata, file: null, base64: null }
          : null,
        courseworkList: state.courseworkList.map((item) => ({
          ...item,
          fileMetadata: { ...item.fileMetadata, file: null, base64: null },
        })),
      }),
    }
  )
);

export default useEssayEvaluationStore;
