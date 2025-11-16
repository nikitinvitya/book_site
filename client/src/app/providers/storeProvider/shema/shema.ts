export interface BookStoreState {
  genre: string;
  setGenre: (genre: string) => void;

  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  openedBooksKeys: string[];
  setOpenedBooks: (bookKey: string) => void;
}