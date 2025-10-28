package client

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/nikitinvitya/book_site/internal/model"
	"net/http"
	"net/url"
)

func (c *Client) GetBooksBySubject(ctx context.Context, subject string) (*model.SubjectResult, error) {
	endpoint, err := url.Parse(c.baseUrl)
	if err != nil {
		return nil, fmt.Errorf("failed to parse base url %w", err)
	}
	endpoint.Path = fmt.Sprintf("/subjects/%s.json", subject)
	params := url.Values{}
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

	var result model.SubjectResult
	if err = json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, err
	}

	return &result, nil
}
