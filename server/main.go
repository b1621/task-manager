package main

import (
	"log"
	"time"

	http "go.api/internal/app/handler"
	"go.api/internal/app/repository"
	"go.api/internal/config"
)

func main() {
	config, err := config.LoadConfig(".")
	if err != nil {
		log.Fatalf("Error loading config: %v", err)
	}
	repo, err := repository.NewPostgresRepository(config.Postgres)
	if err != nil {
		panic(err)
	}

	// Regular token cleaning
	//TODO: Remove
	go func() {
		for range time.Tick(config.Server.SessionDuration / 8) {
			err := repo.DeleteExpiredTokens()
			if err != nil {
				log.Printf("Error deleting expired refresh tokens: %v", err)
			}
		}
	}()

	httpServer := http.NewAPIServer(config.Server, repo)
	err = httpServer.Run()
	if err != nil {
		panic(err)
	}
}
