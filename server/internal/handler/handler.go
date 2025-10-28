package handler

import (
	"context"
	"github.com/nikitinvitya/book_site/internal/model"
)

type DefiniteBookSearcher interface {
	SearchBooks(ctx context.Context, query string) (*model.BookSearchResult, error)
}

type BookService interface {
	DefiniteBookSearcher
}

type Handler struct {
	service BookService
}

func NewHandler(service BookService) *Handler {
	return &Handler{
		service: service,
	}
}
