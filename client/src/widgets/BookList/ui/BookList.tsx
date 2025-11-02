import classes from './BookList.module.scss'
import {Book, BookCard} from "@/entities/Book";
import {useDebounce, useFavorite} from "@/features/lib";
import {usePathname} from "next/navigation";
import {AppRoutes} from "@/shared/constants/routes";
import {useBookStore} from "@/app/providers/storeProvider";
import {DEBOUNCE_DELAY} from "@/shared/constants/constants";

interface BookListProps {
  books: Book[];
}

export const BookList = ({books}: BookListProps) => {

  const {isFavorite, toggleFavorite} = useFavorite()
  const pathName = usePathname()
  const {searchQuery} = useBookStore()
  const debouncedSearchQuery = useDebounce(searchQuery, DEBOUNCE_DELAY)

  let booksToDisplay = books

  const isFiltered = (book : Book, search: string) => {
    const lowerCaseSearch = search.toLowerCase()

    const titleMatch = book.title.toLowerCase().includes(lowerCaseSearch)

    const authorMatch = book.author_name?.some(name =>
    name.toLowerCase().includes(lowerCaseSearch))

    return titleMatch || authorMatch
  }

  if(pathName === AppRoutes.FAVORITES && debouncedSearchQuery) {
    booksToDisplay = books.filter((book) => isFiltered(book, debouncedSearchQuery))
  }

  return (
    <div className={classes.bookList}>
      {booksToDisplay.length
        ? booksToDisplay.map((book) => (
        <BookCard
          book={book}
          key={book.key}
          onToggleFavorite={() => toggleFavorite(book.key)}
          isFavorite={isFavorite(book.key)} />
      ))
      : <h1>No books found</h1>}
    </div>
  );
};

