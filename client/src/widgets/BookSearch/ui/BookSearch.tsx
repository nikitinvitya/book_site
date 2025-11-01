import classes from "./BookSearch.module.scss"
import {Input} from "@/shared/ui/Input/Input";

export const BookSearch = () => {
  return (
    <div className={classes.bookSearchWrapper}>
      <Input className={classes.bookSearch} placeholder={"Search book"}/>
    </div>
  );
};
