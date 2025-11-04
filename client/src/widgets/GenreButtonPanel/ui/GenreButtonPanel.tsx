import classes from './GenreButtonPanel.module.scss'
import {useBookStore} from "@/app/providers/storeProvider";
import {Button} from "@/shared/ui/Button/Button";
import {BookGenre} from "@/shared/constants/bookGenre";
import {useState} from "react";

const GENRES = Object.values(BookGenre)

export const GenreButtonPanel = () => {

  const [isOpen, setIsOpen] = useState(false)
  const {genre: selectedGenre, setGenre} = useBookStore()

  const normalizeGenreName = (genre: string) => {
    return genre[0].toUpperCase() + genre.slice(1).toLowerCase()
  }

  const onHandleClick = (genre: string) => {
    setIsOpen(false)
    setGenre(genre)
  }

  return (
    <div className={classes.buttonWrapper}>
      <div className={classes.buttonPanelLarge}>
        {GENRES.map((genre) => (
          <Button
            key={genre}
            className={selectedGenre === genre ? classes.active : ''}
            onClick={() => setGenre(genre)}>{normalizeGenreName(genre)}</Button>
        ))}
      </div>
      <div className={classes.buttonPanelSmall}>
        <button
          className={classes.dropdownToggle}
          onClick={() => setIsOpen(!isOpen)}
        >
          {normalizeGenreName(selectedGenre)}
          <span className={`${classes.arrow} ${isOpen ? classes.arrowOpen : ''}`}>▼</span>
        </button>

        {isOpen && (
          <div className={classes.dropdownMenu}>
            {GENRES.map((genre) => (
              <div
                key={genre}
                className={`${classes.dropdownItem} ${selectedGenre === genre ? classes.active : ''}`}
                onClick={() => onHandleClick(genre)}>
                {normalizeGenreName(genre)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

