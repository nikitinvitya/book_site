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

type SubjectResult struct {
	Works []SubjectWork `json:"works"`
}

type SubjectWork struct {
	Key              string   `json:"key"`
	Authors          []Author `json:"authors"`
	CoverID          int      `json:"cover_id"`
	Title            string   `json:"title"`
	FirstPublishYear int      `json:"first_publish_year"`
	Description      string   `json:"description,omitempty"`
}
type Author struct {
	Key  string `json:"key"`
	Name string `json:"name"`
}

type BookKeys struct {
	Keys []string `json:"keys"`
}

type BookDetails struct {
	Description interface{} `json:"description"`
}

type DescriptionValue struct {
	Value string `json:"value"`
}
