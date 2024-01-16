import { create } from "zustand";

const useStore = create((set) => ({
  state: {},
  save: (key, value, isFunction) => {
    if (isFunction) {
      return set((rootState) => ({
        state: {
          ...rootState.state,
          [key]: value(rootState.state?.[key]),
        },
      }));
    } else {
      return set((rootState) => ({
        state: {
          ...rootState.state,
          [key]: value,
        },
      }));
    }
  },
}));

export const useSave = () => useStore((rootState) => rootState.save);
export const useGet = (key) => useStore((rootState) => rootState.state?.[key]);
export const useSaveWithCallback = () =>
  useStore((rootState) => rootState.saveWithCallback);
export default useStore;
