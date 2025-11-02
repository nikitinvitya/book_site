import classes from './NavBar.module.scss'
import {BookSearch} from "@/widgets/BookSearch";
import {navItems} from "@/shared/constants/routes";
import Link from "next/link";

interface NavBarProps {
  className?: string;
}

export const NavBar = (props: NavBarProps) => {
  return (
    <div className={classes.navBar}>
      <BookSearch />

      <div className={classes.links}>
        {navItems.map((item) => (
          <Link href={item.path} key={item.path}>
            {item.text}
          </Link>
        ))}
      </div>
    </div>
  );
};

