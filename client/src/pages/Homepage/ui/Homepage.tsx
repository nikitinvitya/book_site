'use client'

import {BookList} from "@/widgets/BookList";
import {useCallback, useEffect, useRef, useState} from "react";
import {Book} from "@/entities/Book";
import {getBookListByGenre} from "@/shared/api/getBookListByGenre";
import {getBooksByName} from "@/shared/api/getBooksByName"
import classes from './Homepage.module.scss'
import {Loader} from "@/shared/ui/Loader/Loader";
import {useBookStore} from "@/app/providers/storeProvider";
import {GenreButtonPanel} from "@/widgets/GenreButtonPanel";
import {useDebounce} from "@/features/lib";

interface HomepageProps {
  initialBooks: Book[];
}

export function Homepage({initialBooks}:HomepageProps) {

  const [books, setBooks] = useState<Book[]>(initialBooks)
  const [offset, setOffset] = useState<number>(initialBooks.length)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isMoreLoading, setIsMoreLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true)
  const {genre, searchQuery} = useBookStore()
  const loaderRef = useRef(null)
  const isInitialMount = useRef(true);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    if(isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    const fetchNewBooks = async () => {
      setIsLoading(true)

      let newBooks: Book[]
      if(debouncedSearchQuery) {
        newBooks = await getBooksByName(debouncedSearchQuery)
        console.log(newBooks)
      }
      else {
        newBooks = await getBookListByGenre(genre, 10, 0)
      }

      setBooks(newBooks)
      setIsLoading(false);
      setHasMore(newBooks.length > 0);

      setOffset(newBooks.length);
    }

    fetchNewBooks().catch(console.error)
  }, [genre, debouncedSearchQuery]);

  const loadMoreBooks = useCallback( async () => {
    if(isLoading || !hasMore || isMoreLoading) return

    setIsMoreLoading(true)

    const newBooks = await getBookListByGenre(genre, 10, offset)

    if(newBooks.length) {
      setBooks(prev => [...prev, ...newBooks])
      setOffset(prev => prev + newBooks.length)
    } else {
      setHasMore(false)
    }

    setIsMoreLoading(false)
  }, [offset, hasMore, isLoading, genre, isMoreLoading])


  useEffect(() => {
    if (isLoading || !hasMore || isMoreLoading) return

    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        loadMoreBooks().catch(console.error)
      }
    })

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader)
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    }

  }, [loadMoreBooks, isLoading, isMoreLoading, hasMore]);

  return (
    <main className={classes.homepage}>
      {!debouncedSearchQuery && <GenreButtonPanel/>}

      {isLoading
        ? <div className={classes.loaderWrapper}><Loader/></div>
        : <BookList books={books}/>
      }

      {!isLoading && !debouncedSearchQuery && hasMore && <Loader ref={loaderRef}/>}
    </main>
  );
}
