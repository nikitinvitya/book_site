export interface HomepageApiResponse {
  works: Book[];
}

export interface SearchBookApiResponse {
  numFound: number;
  docs: Book[];
}

export interface Author {
  key: string;
  name: string;
}

export interface Book {
  key: string;

  authors?: Author[];
  author_name?: string[];

  cover_id?: number;
  cover_i?: number;

  title: string;
  first_publish_year: number;
}

export interface BookDescription {
  description: string;
}