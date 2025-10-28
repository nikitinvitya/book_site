package handler

import (
	"net/http"
)

func (h *Handler) searchBookHandler(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query().Get("q")

	if query == "" {
		ClientErrorResponse(w, http.StatusBadRequest, "query parameter 'q' is required")
		return
	}

	resp, err := h.service.SearchBooks(r.Context(), query)
	if err != nil {
		ServerErrorResponse(w, http.StatusInternalServerError, "failed to fetch data", err)
		return
	}

	SuccessResponse(w, http.StatusOK, resp)
}
