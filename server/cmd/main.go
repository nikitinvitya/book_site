package main

import (
	server "github.com/nikitinvitya/book_site"
	"github.com/nikitinvitya/book_site/internal/client"
	"github.com/nikitinvitya/book_site/internal/handler"
	"log/slog"
)

func main() {

	libraryClient := client.NewClient("https://openlibrary.org")
	h := handler.NewHandler(libraryClient)
	router := handler.InitRoutes(h)

	s := new(server.Server)

	if err := s.Run(":8080", router); err != nil {
		slog.Error("Server is not running")
	}
}
