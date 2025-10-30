import {Book} from '@/entities/Book';
import classes from './Book.module.scss'
import Image from 'next/image'

interface BookCardProps {
  book: Book;
}

export function BookCard({book}: BookCardProps) {
  const authorNames = book.authors?.map((author) => author.name).join(', ') || 'Unknown authors'
  const coverURL = book.cover_id
    ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
    : ''

  return (
    <div className={classes.bookCard}>
      <div className={classes.coverWrapper}>
        <Image
          src={coverURL}
          alt={`Cover of ${book.title}`}
          fill
          className={classes.cover}
        />
      </div>
      <p>Title: {book.title}</p>
      <span>Author: {authorNames}</span>
    </div>
  )
}