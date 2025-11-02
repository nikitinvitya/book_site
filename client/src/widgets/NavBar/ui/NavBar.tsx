'use client'

import classes from './NavBar.module.scss'
import {BookSearch} from "@/widgets/BookSearch";
import {NAV_ITEMS} from "@/shared/constants/routes";
import Link from "next/link";
import {useState} from "react";


interface NavBarProps {
  className?: string;
}

export const NavBar = (props: NavBarProps) => {
  const [activePath, setActivePath] = useState('/')

  return (
    <div className={classes.navBar}>
      <BookSearch />

      <div className={classes.links}>
        {NAV_ITEMS.map((item) => (
          <Link href={item.path}
                key={item.path}
                className={`${classes.link} ${activePath === item.path ? classes.active : ''}`}
                onClick={() => setActivePath(item.path)}>
            {item.text}
          </Link>
        ))}
      </div>
    </div>
  );
};

