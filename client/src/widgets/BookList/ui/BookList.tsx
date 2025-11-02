import classes from './BookList.module.scss'
import {Book, BookCard} from "@/entities/Book";
import {useFavorite} from "@/features/lib";

interface BookListProps {
  books: Book[];
}

export const BookList = ({books}: BookListProps) => {

  const {isFavorite, toggleFavorite} = useFavorite()

  return (
    <div className={classes.bookList}>
      {books.length
        ? books.map((book) => (
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

