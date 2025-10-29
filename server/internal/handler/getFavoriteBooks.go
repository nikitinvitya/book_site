package handler

import (
	"encoding/json"
	"github.com/nikitinvitya/book_site/internal/model"
	"log/slog"
	"net/http"
	"sync"
)

func (h *Handler) GetFavoriteBooks(w http.ResponseWriter, r *http.Request) {
	var req model.BookKeys

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		ClientErrorResponse(w, http.StatusBadRequest, "invalid keys format")
		return
	}

	var (
		result []model.BookDocs
		wg     sync.WaitGroup
		mu     sync.Mutex
	)
	for _, key := range req.Keys {
		wg.Add(1)

		go func(k string) {
			defer wg.Done()

			resp, err := h.service.SearchBooks(r.Context(), k)
			if err != nil {
				slog.Error("failed to fetch book by key", "key", k, "error", err)
				return
			}

			if resp.NumFound > 0 {
				mu.Lock()
				result = append(result, resp.Docs[0])
				mu.Unlock()
			}
		}(key)
	}

	wg.Wait()

	SuccessResponse(w, http.StatusOK, result)
}
