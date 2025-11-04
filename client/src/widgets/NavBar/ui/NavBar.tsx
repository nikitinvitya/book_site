'use client'

import classes from './NavBar.module.scss'
import {BookSearch} from "@/widgets/BookSearch";
import {NAV_ITEMS} from "@/shared/constants/routes";
import Link from "next/link";
import {useState} from "react";
import {usePathname} from "next/navigation";


interface NavBarProps {
  className?: string;
}

export const NavBar = (props: NavBarProps) => {
  const pathname = usePathname()

  return (
    <header className={classes.navBar}>
      <BookSearch />

      <div className={classes.links}>
        {NAV_ITEMS.map((item) => (
          <Link href={item.path}
                key={item.path}
                className={`${classes.link} ${pathname === item.path ? classes.active : ''}`}>
            {item.text}
          </Link>
        ))}
      </div>
    </header>
  );
};

