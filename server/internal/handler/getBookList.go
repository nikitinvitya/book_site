package handler

import (
	"net/http"
)

func (h *Handler) GetBooksBySubjectHandler(w http.ResponseWriter, r *http.Request) {
	subject := r.URL.Query().Get("subject")
	if subject == "" {
		ClientErrorResponse(w, http.StatusBadRequest, "query parameter 'subject' is required")
		return
	}

	resp, err := h.service.GetBooksBySubject(r.Context(), subject)
	if err != nil {
		ServerErrorResponse(w, http.StatusInternalServerError, "failed to fetch data", err)
		return
	}

	SuccessResponse(w, http.StatusOK, resp)
}
