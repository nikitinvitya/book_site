import classes from './BookList.module.scss'
import {Book, BookCard} from "@/entities/Book";
import {useFavorite} from "@/features/lib/useFavorite";

interface BookListProps {
  books: Book[];
}

export const BookList = ({books}: BookListProps) => {

  const {isFavorite, toggleFavorite} = useFavorite()


  if (!books.length) {
    return <h1>No books found</h1>
  }

  return (
    <div className={classes.bookList}>
      {books.map((book) => (
        <BookCard
          book={book}
          key={book.key}
          onToggleFavorite={() => toggleFavorite(book.key)}
          isFavorite={isFavorite(book.key)} />
      ))}
    </div>
  );
};

