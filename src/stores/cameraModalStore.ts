import { create } from "zustand";

interface CameraModalStore {
  isOpen: boolean;
  target: "pose" | "item";
  openModal: (target: "pose" | "item") => void;
  closeModal: () => void;
}

export const useCameraModalStore = create<CameraModalStore>((set) => ({
  isOpen: false,
  target: "pose", // Default target, can be changed to "item" when needed
  openModal: (target: "pose" | "item") => set({ isOpen: true, target }),
  closeModal: () => set({ isOpen: false, target: "pose" }), // Reset target when closing
}));
