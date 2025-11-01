import classes from './NavBar.module.scss'
import {BookSearch} from "@/widgets/BookSearch";

interface NavBarProps {
  className?: string;
}

export const NavBar = (props: NavBarProps) => {
  return (
    <div className={classes.navBar}>
      <BookSearch />
    </div>
  );
};

