import classes from './Loader.module.scss'
import {forwardRef} from "react";

interface LoaderProps {
  className?: string;
}

export const Loader =  forwardRef<HTMLDivElement, LoaderProps>(({className}, ref) => {
  return (
    <div ref={ref} className={`${classes.loader} ${className}`}></div>
  );
});

