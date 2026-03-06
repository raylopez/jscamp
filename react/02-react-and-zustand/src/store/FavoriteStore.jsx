import { create } from "zustand";

export const useFavorite = create((set, get, store) => ({
  favorites: [],
  addFavorite: (jobId) => {
    set((state) => ({
      favorites: state.favorites.includes(jobId)
        ? jobId
        : [...state.favorites, jobId],
    }));
  },
  removeFavorite: (jobId) => {
    set((state) => ({
      favorites: state.favorites.filter((j) => j !== jobId),
    }));
  },
  clearFavorites: () => {
    //set({ favorites: [] })
    set(store.getInitialState());
  },
  isFavorite: (jobId) => {
    return get().favorites.includes(jobId);
  },
  toggleFavorite: (jobId) => {
    const { addFavorite, removeFavorite, isFavorite } = get();
    const isFav = isFavorite(jobId);
    isFav ? removeFavorite(jobId) : addFavorite(jobId);
  },
  countFavorites: () => get().favorites.length,
}));
