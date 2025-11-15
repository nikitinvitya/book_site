package handler

import (
	"context"
	"github.com/nikitinvitya/book_site/internal/model"
)

type BookSearcher interface {
	SearchBooks(ctx context.Context, query string) (*model.BookSearchResult, error)
}

type BookBySubjectGetter interface {
	GetBooksBySubject(ctx context.Context, subject string, limit int, offset int) (*model.SubjectResult, error)
}

type BookDescriptionSearcher interface {
	GetBookDescription(ctx context.Context, workID string) (string, error)
}

type BookService interface {
	BookSearcher
	BookBySubjectGetter
	BookDescriptionSearcher
}

type Handler struct {
	service BookService
}

func NewHandler(service BookService) *Handler {
	return &Handler{
		service: service,
	}
}
