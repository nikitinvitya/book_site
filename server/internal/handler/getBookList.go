package handler

import (
	"net/http"
	"strconv"
)

func (h *Handler) GetBooksBySubjectHandler(w http.ResponseWriter, r *http.Request) {
	subject := r.URL.Query().Get("subject")
	if subject == "" {
		ClientErrorResponse(w, http.StatusBadRequest, "query parameter 'subject' is required")
		return
	}

	limitStr := r.URL.Query().Get("limit")
	offsetStr := r.URL.Query().Get("offset")

	limit, err := strconv.Atoi(limitStr)
	if err != nil || limit <= 0 {
		limit = 12
	}

	offset, err := strconv.Atoi(offsetStr)
	if err != nil || offset <= 0 {
		offset = 0
	}

	resp, err := h.service.GetBooksBySubject(r.Context(), subject, limit, offset)
	if err != nil {
		ServerErrorResponse(w, http.StatusInternalServerError, "failed to fetch data", err)
		return
	}

	SuccessResponse(w, http.StatusOK, resp)
}
