import classes from './Button.module.scss'
import React, {ButtonHTMLAttributes} from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  className?: string;
  children: React.ReactNode;
}

export const Button = (props: ButtonProps) => {
  const {children, className, onClick} = props
  return (
    <button className={`${classes.Button} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};