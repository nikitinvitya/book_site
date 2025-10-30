import {Book, HomepageApiResponse} from "@/entities/Book";

export async function getBookListByGenre(genre: string): Promise<Book[]> {
  try {
    const resp = await fetch(`http://localhost:8080/api/homepage?subject=${genre}`, {
      next: {revalidate: 3600}
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