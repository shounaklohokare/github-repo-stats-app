package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

type Response events.APIGatewayProxyResponse

type RepoStat struct {
	MetaData  string `json:"metadata"`
	Languages string `json:"languages"`
}

func main() {
	lambda.Start(HandleRequest)
}

func HandleRequest(ctx context.Context, request events.APIGatewayProxyRequest) (Response, error) {

	ownerName := request.PathParameters["owner-name"]
	repoName := request.PathParameters["repo-name"]

	repoPath := ownerName + "/" + repoName

	log.Printf("repoPath :- %s", repoPath)

	metadata, err := fetchFromGitAPI(fmt.Sprintf("https://api.github.com/repos/%s", repoPath))

	log.Println(metadata)

	if err != nil {
		return Response{StatusCode: 404}, err
	}

	languages, err := fetchFromGitAPI(fmt.Sprintf("https://api.github.com/repos/%s/languages", repoPath))

	log.Println(languages)

	if err != nil {
		return Response{StatusCode: 404}, err
	}

	resBody := RepoStat{MetaData: metadata, Languages: languages}
	log.Println(resBody)
	jsonData, err := json.Marshal(resBody)
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

func fetchFromGitAPI(url string) (string, error) {

	log.Printf("URL in fetchFromGitAPI:- %s", url)

	req, err := http.NewRequest("GET", url, nil)

	if err != nil {
		return "", err
	}

	req.Header.Add("Accept", "application/vnd.github+json")
	req.Header.Add("Authorization", "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")

	client := &http.Client{}

	resp, err := client.Do(req)

	if err != nil {
		return "", err
	}

	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil || resp.StatusCode != http.StatusOK {
		return "", err
	}

	return string(body), nil

}
