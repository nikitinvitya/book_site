package client

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/nikitinvitya/book_site/internal/model"
	"net/http"
	"net/url"
)

func (c *Client) SearchBooks(ctx context.Context, query string) (*model.BookSearchResult, error) {
	endpoint, err := url.Parse(c.baseUrl)
	if err != nil {
		return nil, fmt.Errorf("failed to parse base url %w", err)
	}
	endpoint.Path = "/search.json"
	params := url.Values{}
	params.Add("q", query)
	params.Add("limit", "10")
	endpoint.RawQuery = params.Encode()

	fullURL := endpoint.String()

	req, err := http.NewRequestWithContext(ctx, http.MethodGet, fullURL, nil)
	if err != nil {
		return nil, err
	}

	resp, err := c.client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("invalid status code: %d", resp.StatusCode)
	}

	var result model.BookSearchResult
	if err = json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}

	return &result, nil
}
