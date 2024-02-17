package service

import (
	"crypto/rand"
	"encoding/base64"

	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	hashedPasswordStr := string(hashedPassword)

	return hashedPasswordStr, nil
}

func VerifyPassword(hash []byte, password string) bool {
	err := bcrypt.CompareHashAndPassword(hash, []byte(password))
	return err == nil
}

func GenerateRandomString() string {
	m := make([]byte, 16)
	_, err := rand.Read(m)
	if err != nil {
		panic(err)
	}
	return base64.RawURLEncoding.EncodeToString(m)
}
