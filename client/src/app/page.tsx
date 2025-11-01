import {Homepage} from "@/pages/Homepage";
import {getBookListByGenre} from "@/shared/api/getBookListByGenre";
import {BookGenre} from "@/shared/constants/constants";

export default async function Home() {
  const initialBooks = await getBookListByGenre(BookGenre.CLASSIC, 10, 0)
  return <Homepage initialBooks={initialBooks}/>
}