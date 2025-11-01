import classes from './GenreButtonPanel.module.scss'
import {useGenreStore} from "@/app/providers/storeProvider";
import {Button} from "@/shared/ui/Button/Button";
import {BookGenre} from "@/shared/constants/constants";

const GENRES = Object.values(BookGenre)

export const GenreButtonPanel = () => {

  const {genre: selectedGenre, setGenre} = useGenreStore()

  const normalizeGenreName = (genre: string) => {
    return genre[0].toUpperCase() + genre.slice(1).toLowerCase()
  }

  return (
    <div className={classes.buttonPanel}>
      {GENRES.map((genre) => (
        <Button key={genre} className={selectedGenre === genre ? classes.active: ''} onClick={() => setGenre(genre)}>{normalizeGenreName(genre)}</Button>
      ))}
    </div>
  );
};

