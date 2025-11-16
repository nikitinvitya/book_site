import {Book} from '@/entities/Book';
import classes from './Book.module.scss'
import Image from 'next/image'
import React, {useEffect, useState} from "react";
import {Button} from "@/shared/ui/Button/Button";
import NotFavoriteIcon from "@/shared/assets/favorite.svg"
import FavoriteIcon from "@/shared/assets/favoriteFill.svg"
import NotFoundIcon from "@/shared/assets/notFound.svg"
import {useBookStore} from "@/app/providers/storeProvider";
import {BookDescription} from "@/entities/Book/model/book";
import {getBookDescription} from "@/shared/api/getBookDescription";

interface BookCardProps {
  book: Book;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function BookCard({book, onToggleFavorite, isFavorite}: BookCardProps) {
  const authorNames = book.authors?.map((author) => author.name).join(', ')
    || book.author_name?.join(', ')
    || 'Unknown author';
  const coverId = book.cover_id || book.cover_i
  const coverURL = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : NotFoundIcon.src
  const {openedBooksKeys, setOpenedBooks} = useBookStore()
  const [description, setDescription] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const isOpen = openedBooksKeys.includes(book.key)

  useEffect(() => {

    if (isOpen || description == null) {
      const fetchDescription = async () => {
        setIsLoading(true)
        const data: BookDescription = await getBookDescription(book.key)
        setDescription(data.description || "Description not found")
        setIsLoading(false)
      }
      fetchDescription().catch(() => console.error())
    }

  }, [isOpen, description]);

  return (
    <div className={classes.bookCard}>
      <div className={classes.collapsedBookInfo}>
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
        <span>Year: {book.first_publish_year}</span>
      </div>

      <div className={classes.cardButtons}>
        <Button onClick={() => setOpenedBooks(book.key)} className={classes.showMoreBtn}>{isOpen ? "Close" : "Show more"}</Button>
        <Button onClick={onToggleFavorite} className={classes.favoriteBtn}>
          {isFavorite
            ? <Image src={FavoriteIcon.src} fill alt="Favorite"/>
            : <Image src={NotFavoriteIcon.src} fill alt="Not favorite"/>}
        </Button>
      </div>

      {isOpen && (
        <div className={classes.fullBookInfo}>
          <p>Title: {book.title}</p>
          <span>Author: {authorNames}</span>
          <span>Year: {book.first_publish_year}</span>
          {
            isLoading
              ? <p>Loading description...</p>
              : <p className={classes.descriptionText}>{description}</p>
          }
        </div>
      )}
    </div>
  )
}