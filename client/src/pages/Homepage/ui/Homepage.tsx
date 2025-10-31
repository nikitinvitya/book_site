'use client'

import {BookList} from "@/widgets/ui";
import {useCallback, useEffect, useRef, useState} from "react";
import {Book} from "@/entities/Book";
import {getBookListByGenre} from "@/shared/api/getBookListByGenre";
import classes from './Homepage.module.scss'
import {Loader} from "@/shared/ui/Loader/Loader";

interface HomepageProps {
  initialBooks: Book[];
}

export function Homepage({initialBooks}:HomepageProps) {

  const [books, setBooks] = useState<Book[]>(initialBooks)
  const [offset, setOffset] = useState<number>(initialBooks.length)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)

  const loaderRef = useRef(null)


  const loadMoreBooks = useCallback( async () => {
    if(isLoading || !hasMore) return

    setIsLoading(true)

    const newBooks = await getBookListByGenre('history', 10, offset)

    if(newBooks.length) {
      setBooks(prev => [...prev, ...newBooks])
      setOffset(prev => prev + newBooks.length)
    } else {
      setHasMore(false)
    }

    setIsLoading(false)
  }, [offset, hasMore, isLoading])


  useEffect(() => {
    if (isLoading || !hasMore) return

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

  }, [loadMoreBooks, isLoading, hasMore]);

  return (
    <main className={classes.homepage}>
      <BookList books={books} />

      {hasMore && <Loader ref={loaderRef} />}
      {!hasMore && <p>The end of page</p>}
    </main>
  );
}
