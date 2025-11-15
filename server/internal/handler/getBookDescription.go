package handler

import (
	"github.com/go-chi/chi/v5"
	"net/http"
)

func (h *Handler) GetBookDescription(w http.ResponseWriter, r *http.Request) {
	workID := chi.URLParam(r, "workID")
	if workID == "" {
		ClientErrorResponse(w, http.StatusBadRequest, "Invalid workID")
		return
	}
	description, err := h.service.GetBookDescription(r.Context(), workID)

	if err != nil {
		ServerErrorResponse(w, http.StatusInternalServerError, "Failed to get book description", err)
		return
	}

	SuccessResponse(w, http.StatusOK, map[string]string{"description": description})

}
