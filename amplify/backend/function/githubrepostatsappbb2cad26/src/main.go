package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"strings"
	"sync"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

type Response events.APIGatewayProxyResponse

type RepoStat struct {
	MetaData     string `json:"metadata"`
	UserData     string `json:"userdata"`
	Languages    string `json:"languages"`
	Contributors string `json:"contributors"`
	Branches     string `json:"branches"`
}

func main() {
	lambda.Start(HandleRequest)
}

func HandleRequest(ctx context.Context, request events.APIGatewayProxyRequest) (Response, error) {

	ownerName := request.PathParameters["owner-name"]
	repoName := request.PathParameters["repo-name"]

	repoPath := ownerName + "/" + repoName

	log.Printf("repoPath :- %s", repoPath)

	urls := []string{
		fmt.Sprintf("repos/%s", repoPath),
		fmt.Sprintf("users/%s", ownerName),
		fmt.Sprintf("repos/%s/languages", repoPath),
		fmt.Sprintf("repos/%s/contributors", repoPath),
		fmt.Sprintf("repos/%s/branches", repoPath)}

	var wg sync.WaitGroup
	var mu sync.Mutex
	response := &RepoStat{}

	for _, url := range urls {
		wg.Add(1)
		go fetchFromGitAPI(url, &wg, response, &mu)
	}

	wg.Wait()

	jsonData, err := json.Marshal(response)
	if err != nil {
		fmt.Printf("Error fetching %v", err)
	}

	if err != nil {
		return Response{StatusCode: 404}, err
	}

	res := Response{
		StatusCode:      200,
		IsBase64Encoded: false,
		Body:            string(jsonData),
		Headers: map[string]string{
			"Content-Type":                 "application/json",
			"Access-Control-Allow-Origin":  "*",
			"Access-Control-Allow-Methods": "GET",
			"Access-Control-Allow-Headers": "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, X-Api-Key",
		},
	}

	return res, nil
}

func fetchFromGitAPI(url string, wg *sync.WaitGroup, response *RepoStat, mu *sync.Mutex) {

	defer wg.Done()

	req, err := http.NewRequest("GET", fmt.Sprintf("https://api.github.com/%s", url), nil)

	if err != nil {
		fmt.Printf("Error fetching %s: %v\n", url, err)
		return
	}

	req.Header.Add("Accept", "application/vnd.github+json")
	req.Header.Add("Authorization", "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")

	client := &http.Client{}

	resp, err := client.Do(req)

	if err != nil {
		fmt.Printf("Error fetching %s: %v\n", url, err)
		return
	}

	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil || resp.StatusCode != http.StatusOK {
		fmt.Printf("Error fetching %s: %v\n", url, err)
		return
	}

	out := string(body)

	mu.Lock()
	if strings.Contains(url, "languages") {
		response.Languages = out
	} else if strings.Contains(url, "users") {
		response.UserData = out
	} else if strings.Contains(url, "contributors") {
		response.Contributors = out
	} else if strings.Contains(url, "branches") {
		response.Branches = out
	} else {
		response.MetaData = out
	}
	mu.Unlock()

}
