'use client'

import {BookList} from "@/widgets/ui";
import {useEffect, useState} from "react";
import {Book} from "@/entities/Book";
import {getBookListByGenre} from "@/shared/api/getBookListByGenre";
import classes from './Homepage.module.scss'

export function Homepage() {

  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    const fetchBooks = async () => {
      const fetchedBooks = await getBookListByGenre('history')
      setBooks(fetchedBooks)
    }

    fetchBooks()
      .catch(console.error);
  }, []);

  return (
    <main className={classes.homepage}>
      <BookList books={books} />
    </main>
  );
}
