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
  remove: (key) => {
    return set((rootState) => {
      const state = rootState.state;
      delete state[key];
      return {
        state,
      };
    });
  },
}));

export const useSave = () => useStore((rootState) => rootState.save);
export const useGet = (key) => useStore((rootState) => rootState.state?.[key]);
export const useRemove = () => useStore((rootState) => rootState.remove);
export default useStore;
