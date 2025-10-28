package client

import (
	"net/http"
	"time"
)

type Client struct {
	baseUrl string
	client  *http.Client
}

func NewClient(BaseUrl string) *Client {
	return &Client{
		baseUrl: BaseUrl,
		client: &http.Client{
			Timeout: 10 * time.Second,
		},
	}
}
