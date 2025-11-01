import {create} from "zustand";
import {BookStoreGenre} from "../shema/shema";
import {BookGenre} from "@/shared/constants/constants";

export const useGenreStore = create<BookStoreGenre>((set) => ({
  genre: BookGenre.CLASSIC,
  setGenre: (genre: string) => set({genre: genre})
}))
