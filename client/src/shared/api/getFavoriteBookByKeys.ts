import {Book} from "@/entities/Book";
import {BASE_URL} from "@/shared/constants/api";

export const getFavoriteBookByKeys = async (keys: string[]):Promise<Book[]> => {
  try {
    if(!keys.length) {
      return []
    }

    const resp = await fetch(`${BASE_URL}/favBooks`, {
      method: "Post",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({keys}),
      cache: "no-store",
    })

    if(!resp.ok) {
      console.error(`Failed to fetch books: ${resp.status} ${resp.statusText}`);
      return []
    }

    return await resp.json()

  } catch (error) {
    console.log(error)
    return []
  }
}