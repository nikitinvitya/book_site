import {create} from "zustand";
import {BookStoreState} from "../shema/shema";
import {BookGenre} from "@/shared/constants/bookGenre";


export const useBookStore = create<BookStoreState>((set) => ({
  genre: BookGenre.CLASSIC,
  setGenre: (genre) => set({genre: genre, searchQuery: ''}),

  searchQuery: '',
  setSearchQuery: (query) => set({searchQuery: query}),

  openedBooksKeys: [],
  setOpenedBooks: (bookKey) => set((state) => {
    const isAlreadyOpen = state.openedBooksKeys.includes(bookKey)

    if(isAlreadyOpen) {
      return {
        openedBooksKeys : state.openedBooksKeys.filter(key => key != bookKey)
      }
    } else {
      return {
        openedBooksKeys: [...state.openedBooksKeys, bookKey]
      }
    }
  })
}))
