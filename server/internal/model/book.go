package model

type BookSearchResult struct {
	NumFound int        `json:"numFound"`
	Docs     []BookDocs `json:"docs"`
}

type BookDocs struct {
	Key              string   `json:"key"`
	AuthorName       []string `json:"author_name"`
	CoverID          int      `json:"cover_i"`
	Title            string   `json:"title"`
	FirstPublishYear int      `json:"first_publish_year"`
}
