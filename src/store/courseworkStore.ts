// app/store/courseworkStore.ts
import { createStore } from "zustand/vanilla";
import { useStore } from "zustand";

interface CourseworkState {
  courseworkType: string;
  subject: string;
  essayTitle: string;
  file: File | null;
  setCourseworkType: (type: string) => void;
  setSubject: (subject: string) => void;
  setEssayTitle: (title: string) => void;
  setFile: (file: File | null) => void;
}

// Vanilla store
const courseworkStore = createStore<CourseworkState>((set) => ({
  courseworkType: "",
  subject: "",
  essayTitle: "",
  file: null,
  setCourseworkType: (type) => set({ courseworkType: type }),
  setSubject: (subject) => set({ subject }),
  setEssayTitle: (title) => set({ essayTitle: title }),
  setFile: (file) => set({ file }),
}));

// Hook to use the store in components
const useCourseworkStore = () => useStore(courseworkStore);

export default useCourseworkStore;
