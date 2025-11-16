import {BASE_URL} from "@/shared/constants/api";
import {BookDescription} from "@/entities/Book/model/book";

export const getBookDescription = async (bookKey: string):Promise<BookDescription> => {
  try {
    const clearBookKey = bookKey.replace("/works/", '')
    const resp = await fetch(`${BASE_URL}/description/${clearBookKey}`, {
      next: {revalidate: 3600},
    })

    if(!resp.ok) {
      console.error(`Failed to fetch book description, ${resp.status} ${resp.statusText}`)
      return {description: ""}
    }

    return await resp.json()
  } catch (error) {
    console.error("Network or other fetch error:", error);
    return {description: ""}
  }
}