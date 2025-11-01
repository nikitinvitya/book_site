import classes from './Input.module.scss'
import {InputHTMLAttributes} from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  className?: string;
}

export const Input = (props: InputProps) => {
  const {className, onChange, placeholder} = props

  return (
    <input className={className} onChange={onChange} placeholder={placeholder}/>
  );
};

