import { create } from "zustand";

interface MainFeatureStore {
  multiplePoses: boolean;
  multipleItems: boolean;
  poseImages: File[];
  itemImages: File[];
  prevPoseImages: File[];
  prevItemImages: File[];
  generatedResults: string[];

  currentPoseIndex: number;
  currentItemIndex: number;

  // Actions for toggling the booleans
  toggleMultiplePoses: () => void;
  toggleMultipleItems: () => void;

  // Actions for adding images to the arrays
  addPoseImage: (image: File) => void;
  addItemImage: (image: File) => void;
  addPrevPoseImage: (image: File) => void;
  addPrevItemImage: (image: File) => void;

  addGeneratedResult: (result: string) => void;
  setGeneratedResults: (results: string[]) => void;

  // Actions for deleting images from the arrays
  deleteItemImage: () => void;
  deletePrevPoseImage: (index: number) => void;
  deletePrevItemImage: (index: number) => void;

  // Actions for clearing the arrays
  clearPoseImages: () => void;
  clearItemImages: () => void;
  clearPrevPoseImages: () => void;
  clearPrevItemImages: () => void;

  // Actions for setting the current index
  // of the images in the arrays
  increaseCurrentPoseIndex: () => void;
  decreaseCurrentPoseIndex: () => void;
  increaseCurrentItemIndex: () => void;
  decreaseCurrentItemIndex: () => void;
}

export const useMainFeatureStore = create<MainFeatureStore>((set) => ({
  multiplePoses: false,
  multipleItems: false,
  poseImages: [],
  itemImages: [],
  prevPoseImages: [],
  prevItemImages: [],
  generatedResults: [],
  currentPoseIndex: -1,
  currentItemIndex: -1,
  currentResultIndex: -1,

  // Toggle functions
  toggleMultiplePoses: () =>
    set((state) => {
      if (state.multiplePoses == true) {
        if (state.poseImages.length > 1) {
          return {
            multiplePoses: !state.multiplePoses,
            poseImages: [state.poseImages[0]],
          };
        }
      }
      return { multiplePoses: !state.multiplePoses };
    }),
  toggleMultipleItems: () =>
    set((state) => {
      if (state.multipleItems == true) {
        if (state.itemImages.length > 1) {
          return {
            multipleItems: !state.multipleItems,
            itemImages: [state.itemImages[0]],
          };
        }
      }
      return { multipleItems: !state.multipleItems };
    }),

  // Add image functions with conditions
  addPoseImage: (image: File) =>
    set((state) => {
      if (
        state.multiplePoses &&
        !state.poseImages.some((img) => img.name === image.name)
      ) {
        return {
          poseImages: [...state.poseImages, image],
          currentPoseIndex: state.poseImages.length,
        };
      }
      return { poseImages: [image], currentPoseIndex: 0 };
    }),

  addItemImage: (image: File) =>
    set((state) => {
      if (
        state.multipleItems &&
        !state.itemImages.some((img) => img.name === image.name)
      ) {
        if (state.itemImages.length >= 3) {
          alert("You can only upload up to 3 items at a time.");
          return { itemImages: state.itemImages };
        }
        return {
          itemImages: [...state.itemImages, image],
          currentItemIndex: state.itemImages.length,
        };
      }
      return { itemImages: [image], currentItemIndex: 0 };
    }),

  addPrevPoseImage: (image: File) =>
    set((state) => {
      if (!state.prevPoseImages.some((img) => img.name === image.name)) {
        if (state.prevPoseImages.length >= 9) {
          const newPrevPoseImages = structuredClone(state.prevPoseImages);
          newPrevPoseImages.shift(); // Remove the first image
          newPrevPoseImages.push(image); // Add the new image to the end
          return { prevPoseImages: newPrevPoseImages };
        }
        return { prevPoseImages: [...state.prevPoseImages, image] };
      }
      return state;
    }),

  addPrevItemImage: (image: File) =>
    set((state) => {
      if (!state.prevItemImages.some((img) => img.name === image.name)) {
        if (state.prevItemImages.length >= 9) {
          const newPrevItemImages = structuredClone(state.prevItemImages);
          newPrevItemImages.shift(); // Remove the first image
          newPrevItemImages.push(image); // Add the new image to the end
          return { prevItemImages: newPrevItemImages };
        }
        return { prevItemImages: [...state.prevItemImages, image] };
      }
      return state;
    }),

  addGeneratedResult: (result: string) =>
    set((state) => {
      return {
        generatedResults: [...state.generatedResults, result],
        currentResultIndex: state.generatedResults.length - 1,
      };
    }),

  setGeneratedResults: (results: string[]) =>
    set((_) => {
      return { generatedResults: results };
    }),

  deleteItemImage: () =>
    set((state) => {
      const newImages = [...state.itemImages];
      newImages.splice(state.currentItemIndex, 1);
      return { itemImages: newImages };
    }),

  deletePrevPoseImage: (index: number) =>
    set((state) => {
      const newImages = [...state.prevPoseImages];
      newImages.splice(index, 1);
      return { prevPoseImages: newImages };
    }),

  deletePrevItemImage: (index: number) =>
    set((state) => {
      const newImages = [...state.prevItemImages];
      newImages.splice(index, 1);
      return { prevItemImages: newImages };
    }),
  // Clear functions
  clearPoseImages: () => set({ poseImages: [], currentPoseIndex: -1 }),
  clearItemImages: () => set({ itemImages: [], currentItemIndex: -1 }),
  clearPrevPoseImages: () => set({ prevPoseImages: [] }),
  clearPrevItemImages: () => set({ prevItemImages: [] }),

  // Set index functions
  decreaseCurrentPoseIndex: () =>
    set((state) => {
      if (state.currentPoseIndex > 0) {
        return { currentPoseIndex: state.currentPoseIndex - 1 };
      }
      return state;
    }),
  increaseCurrentPoseIndex: () =>
    set((state) => {
      if (state.currentPoseIndex < state.poseImages.length - 1) {
        return { currentPoseIndex: state.currentPoseIndex + 1 };
      }
      return state;
    }),
  decreaseCurrentItemIndex: () =>
    set((state) => {
      if (state.currentItemIndex > 0) {
        return { currentItemIndex: state.currentItemIndex - 1 };
      }
      return state;
    }),
  increaseCurrentItemIndex: () =>
    set((state) => {
      if (state.currentItemIndex < state.itemImages.length - 1) {
        return { currentItemIndex: state.currentItemIndex + 1 };
      }
      return state;
    }),
}));
