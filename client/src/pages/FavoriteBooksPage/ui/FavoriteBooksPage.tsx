'use client'

import classes from './FavoriteBooksPage.module.scss'
import {useEffect, useState} from "react";
import {getFavoriteBookByKeys} from "@/shared/api/getFavoriteBookByKeys";
import {Book} from "@/entities/Book";
import {BookList} from "@/widgets/BookList";
import { Loader } from '@/shared/ui/Loader/Loader';
import {useFavorite} from "@/features/lib";

export function FavoriteBooksPage() {
  const {favorites} = useFavorite()
  const [books, setBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (favorites === null) {
      return;
    }

    const loadFavoriteBooks = async () => {
      setIsLoading(true);
      if (favorites.length > 0) {
        const favoriteBooksData = await getFavoriteBookByKeys(favorites);
        setBooks(favoriteBooksData);
      } else {
        setBooks([]);
      }
      setIsLoading(false);
    };

    loadFavoriteBooks().catch(console.error);
  }, [favorites]);

  return (
    <div className={classes.page}>
      {isLoading && <Loader />}
      {!isLoading && <BookList books={books}/>}
    </div>
  )
}