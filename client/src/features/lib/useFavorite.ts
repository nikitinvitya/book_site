import {useEffect, useState} from "react";
import {FAVORITES_BOOKS_KEY} from "@/shared/constants/localStorage";

export const useFavorite = () => {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_BOOKS_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Failed to parse favorites from localStorage", error);
    }
  }, []);

  const isFavorite = (bookKey: string) => {
    return favorites.includes(bookKey)
  }

  const toggleFavorite = (bookKey: string) => {
    const newFavorites = favorites.includes(bookKey)
      ? favorites.filter(key => key !== bookKey)
      : [...favorites, bookKey]

    setFavorites(newFavorites)

    try {
      localStorage.setItem(FAVORITES_BOOKS_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error("Failed to save favorites to localStorage", error);
    }
  }


  return {
    favorites, isFavorite, toggleFavorite
  }
}