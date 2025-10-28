package handler

import (
	"context"
	"github.com/nikitinvitya/book_site/internal/model"
)

type BookSearcher interface {
	SearchBooks(ctx context.Context, query string) (*model.BookSearchResult, error)
}

type BookBySubjectGetter interface {
	GetBookList(ctx context.Context, subject string) (*model.SubjectResult, error)
}

type BookService interface {
	BookSearcher
	BookBySubjectGetter
}

type Handler struct {
	service BookService
}

func NewHandler(service BookService) *Handler {
	return &Handler{
		service: service,
	}
}
