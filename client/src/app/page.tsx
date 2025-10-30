import {Homepage} from "@/pages/Homepage";
import {getBookListByGenre} from "@/shared/api/getBookListByGenre";

export default async function Home() {
  const initialBooks = await getBookListByGenre('history', 10, 0)
  return <Homepage initialBooks={initialBooks}/>
}