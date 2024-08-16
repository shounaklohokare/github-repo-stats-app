package main

import (
	"fmt"
	"io"
	"net/http"
)

func main() {

	req, err := http.NewRequest("GET", "https://api.github.com/repos/RocketChat/Rocket.Chat/languages", nil)

	if err != nil {
		fmt.Println("Error creating request", err)
	}

	req.Header.Add("Accept", "application/vnd.github+json")
	req.Header.Add("Authorization", "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")

	client := &http.Client{}

	resp, err := client.Do(req)

	if err != nil {
		fmt.Println("Error Sending request", err)
		return
	}

	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Error reading response", err)
		return
	}

	if resp.StatusCode != http.StatusOK {
		fmt.Printf("Unexpected status code: Got %v\n", resp.StatusCode)
		return
	}

	fmt.Println(string(body))

}
