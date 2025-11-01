import {Book, SearchBookApiResponse} from "@/entities/Book";
import {BASE_URL} from "@/shared/constants/api";

export async function getBooksByName(bookName: string):Promise<Book[]> {
  if(!bookName.trim()) {
    return []
  }

  try {
    const resp = await fetch(`${BASE_URL}/searchBook?q=${bookName}`, {
       cache: 'no-store'
    });

    if(!resp.ok) {
      console.error(`Failed to fetch books: ${resp.status} ${resp.statusText}`);
      return []
    }

    const data: SearchBookApiResponse = await resp.json()
    return data.docs || []
  } catch (error) {
    console.error("Network or other fetch error:", error);
    return []
  }
}