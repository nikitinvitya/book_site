export interface BookStorestate {
  genre: string;
  setGenre: (genre: string) => void;

  searchQuery: string;
  setSearchQuery: (query: string) => void;
}