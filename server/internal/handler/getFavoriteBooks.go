package handler

import (
	"encoding/json"
	"github.com/nikitinvitya/book_site/internal/model"
	"log/slog"
	"net/http"
)

func (h *Handler) GetFavoriteBooks(w http.ResponseWriter, r *http.Request) {
	var req model.BookKeys

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		ClientErrorResponse(w, http.StatusBadRequest, "invalid keys format")
		return
	}

	var result []model.BookDocs
	for _, key := range req.Keys {
		resp, err := h.service.SearchBooks(r.Context(), key)
		if err != nil {
			slog.Error("failed to fetch book by key", "key", key, "error", err)
			continue
		}

		if resp.NumFound > 0 {
			result = append(result, resp.Docs[0])
		}
	}

	SuccessResponse(w, http.StatusOK, result)
}
