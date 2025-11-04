import classes from './ScrollToTopButton.module.scss'
import {useEffect, useState} from "react";
import {Button} from "@/shared/ui/Button/Button";
import ArrowTopIcon from "@/shared/assets/arrowTopIcon.svg"
import Image from "next/image";

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 1000) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className={classes.scrollToTop}>
      {isVisible &&
          <Button
              onClick={scrollToTop}
              className={classes.scrollToTopButton}>
            <Image
                src={ArrowTopIcon.src}
                className={classes.icon}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                alt='top'></Image>
          </Button>}
    </div>
  );
};

