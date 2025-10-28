package handler

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"net/http"
)

func InitRoutes(h *Handler) http.Handler {
	router := chi.NewRouter()

	router.Use(middleware.Logger)
	router.Use(middleware.Recoverer)
	router.Use(middleware.RequestID)

	router.Route("/api", func(r chi.Router) {
		r.Get("/searchBook", h.SearchBookHandler)
		r.Get("/homepage", h.GetBooksBySubjectHandler)
	})

	return router
}
