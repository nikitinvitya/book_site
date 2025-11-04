'use client'

import classes from './FavoriteBooksPage.module.scss'
import {useCallback, useEffect, useRef, useState} from "react";
import {getFavoriteBookByKeys} from "@/shared/api/getFavoriteBookByKeys";
import {Book} from "@/entities/Book";
import {BookList} from "@/widgets/BookList";
import { Loader } from '@/shared/ui/Loader/Loader';
import {useDebounce, useFavorite} from "@/features/lib";
import {BOOKS_ON_FAVORITE_PAGE, DEBOUNCE_DELAY} from "@/shared/constants/constants";
import {useBookStore} from "@/app/providers/storeProvider";
import {ScrollToTopButton} from "@/features/ScrollToTopButton";

export function FavoriteBooksPage() {
  const {favorites} = useFavorite();
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const loaderRef = useRef(null);
  const {searchQuery} = useBookStore();
  const debouncedSearchQuery = useDebounce(searchQuery, DEBOUNCE_DELAY)

  useEffect(() => {
    if (favorites === null) return;

    setIsLoading(true);

    if (favorites.length === 0) {
      setBooks([]);
      setHasMore(false);
      setIsLoading(false);
      return;
    }

    const keysForFirstPage = favorites.slice(0, BOOKS_ON_FAVORITE_PAGE);

    getFavoriteBookByKeys(keysForFirstPage).then(initialBooks => {
      setBooks(initialBooks);
      setHasMore(favorites.length > BOOKS_ON_FAVORITE_PAGE);
      setIsLoading(false);
    });

  }, [favorites]);

  const loadMoreFavBooks = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    const start = page * BOOKS_ON_FAVORITE_PAGE;
    const end = start + BOOKS_ON_FAVORITE_PAGE;
    const keysForNextPage = favorites!.slice(start, end);

    if (keysForNextPage.length > 0) {
      const newBooks = await getFavoriteBookByKeys(keysForNextPage);
      setBooks(prev => [...prev, ...newBooks]);
      setPage(prev => prev + 1);
      if (end >= favorites!.length) {
        setHasMore(false);
      }
    } else {
      setHasMore(false);
    }

    setIsLoading(false);
  }, [isLoading, hasMore, page, favorites]);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLoading) {
        loadMoreFavBooks().catch(console.error);
      }
    });

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);
    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [isLoading, hasMore, loadMoreFavBooks]);


  if (isLoading && books.length === 0) {
    return (
      <div className={classes.wrapper}>
        <Loader />
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className={classes.wrapper}>
        <h1>No favorite books yet</h1>
      </div>
    );
  }

  const sectionTitle = debouncedSearchQuery
    ? `Search favorite books for "${debouncedSearchQuery}"`
    : `Favorite Books`;

  return (
    <main className={classes.page}>
      <h2>{sectionTitle}</h2>
      <BookList books={books}/>
      {hasMore && <Loader ref={loaderRef}/>}
      <ScrollToTopButton />
    </main>
  );
}