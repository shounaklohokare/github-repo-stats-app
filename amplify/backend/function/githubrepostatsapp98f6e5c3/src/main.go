package main

import (
	"context"
	"fmt"
	"io"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

type Response events.APIGatewayProxyResponse

func HandleRequest(ctx context.Context) (Response, error) {

	req, err := http.NewRequest("GET", "https://api.github.com/repos/RocketChat/Rocket.Chat/languages", nil)

	if err != nil {
		return Response{StatusCode: 404}, err
	}

	req.Header.Add("Accept", "application/vnd.github+json")
	req.Header.Add("Authorization", "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")

	client := &http.Client{}

	resp, err := client.Do(req)

	if err != nil {
		return Response{StatusCode: 404}, err
	}

	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return Response{StatusCode: 404}, err
	}

	if resp.StatusCode != http.StatusOK {
		return Response{StatusCode: 404}, err
	}

	fmt.Println(string(body))

	out := Response{
		StatusCode:      200,
		IsBase64Encoded: false,
		Body:            string(body),
		Headers: map[string]string{
			"Content-Type":                 "application/json",
			"Access-Control-Allow-Origin":  "*",
			"Access-Control-Allow-Methods": "GET",
			"Access-Control-Allow-Headers": "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization",
		},
	}

	return out, nil
}

func main() {
	lambda.Start(HandleRequest)
}
