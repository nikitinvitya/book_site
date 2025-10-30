export interface HomepageApiResponse {
  works: Book[];
}

export interface Author {
  key: string;
  name: string;
}

export interface Book {
  key: string;
  authors: Author[];
  cover_id: number;
  title: string;
  first_published_year: number;
}