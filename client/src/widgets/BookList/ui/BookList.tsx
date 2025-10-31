import classes from './BookList.module.scss'
import {Book, BookCard} from "@/entities/Book";

interface BookListProps {
  books: Book[];
}

export const BookList = ({books}: BookListProps) => {

  if (!books.length) {
    return <h1>No books found</h1>
  }

  return (
    <div className={classes.bookList}>
      {books.map((book) => (
        <BookCard book={book} key={book.key} />
      ))}
    </div>
  );
};

