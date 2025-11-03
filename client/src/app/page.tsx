import {Homepage} from "@/views/Homepage";
import {getBookListByGenre} from "@/shared/api/getBookListByGenre";
import {BookGenre} from "@/shared/constants/bookGenre";
import {BOOKS_ON_HOME_PAGE} from "@/shared/constants/constants";

export default async function Home() {
  const initialBooks = await getBookListByGenre(BookGenre.CLASSIC, BOOKS_ON_HOME_PAGE, 0)
  return <Homepage initialBooks={initialBooks}/>
}