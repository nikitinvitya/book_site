package client

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/nikitinvitya/book_site/internal/model"
	"net/http"
	"strings"
)

func (c *Client) GetBookDescription(ctx context.Context, workID string) (string, error) {
	cleanWorkID := strings.Replace(workID, "/works/", "", 1)
	fullURL := fmt.Sprintf("%s/works/%s.json", c.baseUrl, cleanWorkID)

	req, err := http.NewRequestWithContext(ctx, http.MethodGet, fullURL, nil)
	if err != nil {
		return "", err
	}

	resp, err := c.client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	var details model.BookDetails
	if err = json.NewDecoder(resp.Body).Decode(&details); err != nil {
		return "", fmt.Errorf("failed to get response from  %w", err)
	}

	if descriptionStr, ok := details.Description.(string); ok {
		return descriptionStr, nil
	}
	if descMap, ok := details.Description.(map[string]interface{}); ok {
		if value, ok := descMap["value"].(string); ok {
			return value, nil
		}
	}

	return "", nil
}
