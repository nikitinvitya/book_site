import {create} from "zustand";
import {BookStorestate} from "../shema/shema";
import {BookGenre} from "@/shared/constants/bookGenre";


export const useBookStore = create<BookStorestate>((set) => ({
  genre: BookGenre.CLASSIC,
  setGenre: (genre) => set({genre: genre, searchQuery: ''}),

  searchQuery: '',
  setSearchQuery: (query) => set({searchQuery: query}),
}))
