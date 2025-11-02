'use client'

import classes from "./BookSearch.module.scss"
import {Input} from "@/shared/ui/Input/Input";
import {useBookStore} from "@/app/providers/storeProvider";


export const BookSearch = () => {

  const {searchQuery, setSearchQuery} = useBookStore()
  return (
      <Input
        className={classes.bookSearch}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={"Search book"} value={searchQuery}/>
  );
};
