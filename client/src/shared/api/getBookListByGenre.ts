import {Book, HomepageApiResponse} from "@/entities/Book";
import {BASE_URL} from "@/shared/constants/api";

export async function getBookListByGenre(genre: string, limit: number = 10, offset: number = 0): Promise<Book[]> {
  try {
    const resp = await fetch(`${BASE_URL}/homepage?subject=${genre}&limit=${limit}&offset=${offset}`, {
      next: {revalidate: 3600},
      cache: "no-store",
    })

    if(!resp.ok) {
      console.error(`Failed to fetch books: ${resp.status} ${resp.statusText}`);
      return []
    }

    const data: HomepageApiResponse = await resp.json()
    return data.works || []
  } catch (error) {
    console.error("Network or other fetch error:", error);
    return []
  }
}