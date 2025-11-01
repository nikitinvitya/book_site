import {Book} from '@/entities/Book';
import classes from './Book.module.scss'
import Image from 'next/image'
import React from "react";
import {Button} from "@/shared/ui/Button/Button";
import NotFavoriteIcon from "@/shared/assets/favorite.svg"
import FavoriteIcon from "@/shared/assets/favorite-fill.svg"

interface BookCardProps {
  book: Book;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function BookCard({book, onToggleFavorite, isFavorite}: BookCardProps) {
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
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className={classes.cover}
        />
      </div>
      <p>Title: {book.title}</p>
      <span>Author: {authorNames}</span>
      <Button onClick={onToggleFavorite}>
        {isFavorite
          ? <Image
            src={FavoriteIcon.src}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            alt="Favorite" />
          : <Image
            src={NotFavoriteIcon.src}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            alt="Not favorite"/>}
      </Button>
    </div>
  )
}