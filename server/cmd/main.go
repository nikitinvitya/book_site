package main

import (
	server "github.com/nikitinvitya/book_site"
	"log/slog"
)

func main() {
	s := new(server.Server)

	if err := s.Run(":8080", nil); err != nil {
		slog.Error("Server is not running")
	}
}
