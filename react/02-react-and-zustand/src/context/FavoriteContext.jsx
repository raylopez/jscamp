import { use, useState, createContext } from "react";

export const FavoriteContext = createContext();

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (job) => {
    setFavorites([...favorites, job]);
  };

  const removeFavorite = (jobId) => {
    setFavorites((jobs) => jobs.filter((j) => j.id !== jobId));
  };

  const isFavorite = (jobId) => {
    return favorites.some((j) => j.id === jobId);
  };

  const values = { addFavorite, removeFavorite, isFavorite };

  return <FavoriteContext value={values}>{children}</FavoriteContext>;
}

export const useFavorite = () => {
  const context = use(FavoriteContext);
  return context;
};
