package testing

import (
	"bytes"
	"io"
	"log"
	"net/http"
	"net/http/httptest"
	"os"
	"strings"
	"testing"

	api "go.api/internal/app/handler"
	"go.api/internal/app/repository"
	"go.api/internal/config"

	"github.com/gin-gonic/gin"
)

type tests struct {
	name             string
	payload          string
	cookie           *http.Cookie
	expectedStatus   int
	expectedResponse string
}

var (
	testServer *api.APIServer
	testRepo   repository.DatabaseRepository
)

func setup() {
	config, err := config.LoadConfig("../")
	if err != nil {
		log.Fatalf("Error loading config: %v", err)
	}

	db, err := repository.NewPostgresRepository(config.Postgres)
	if err != nil {
		panic("Database error " + err.Error())
	}

	testRepo = db

	testServer = api.NewAPIServer(config.Server, testRepo)
}

func TestMain(m *testing.M) {
	setup()
	code := m.Run()

	os.Exit(code)
}

func TestRootHandler(t *testing.T) {
	gin.SetMode(gin.TestMode)
	router := gin.Default()
	router.GET("/", testServer.HandleRoot)

	req, _ := http.NewRequest("GET", "/", nil)
	w := httptest.NewRecorder()

	// Perform the Request
	router.ServeHTTP(w, req)

	// ASSERTION ONE
	if w.Code != http.StatusOK {
		t.Fatalf("Expected status code %d, but got %d", http.StatusOK, w.Code)
	}

	// Get the response body
	responseBody, err := io.ReadAll(w.Body)
	if err != nil {
		t.Fatal(err)
	}

	// Convert the body to a string
	bodyAsString := string(responseBody)

	// ASSERTION TWO
	if !strings.Contains(bodyAsString, "Hello") {
		t.Fatalf("Expected body to contain 'hello', got %s", bodyAsString)
	}
}

func TestSignUpHandler(t *testing.T) {
	gin.SetMode(gin.TestMode)
	router := gin.Default()
	router.POST("/signup", testServer.HandleSignUp)

	payloadsuccess := `{"first_name": "john",
					"last_name": "doe",
					"email": "john@delta.com",
					"username": "john",
					"password": "testpass"
					}`

	payloadFail := `{"first_name": "john",
					"last_name": "doe",
					"username":"jane",
					"email":"jane@example.com",
					"password":"password123"
					}`
	payloadBadBody := `{"username":"alice"}`

	// TEST CASES
	tests := []tests{
		{
			name:             "Successful SignUp",
			payload:          payloadsuccess,
			expectedStatus:   http.StatusOK,
			expectedResponse: "Sign up successful",
		},
		{
			name:             "Signup with Existing Authorization Cookie",
			payload:          payloadFail,
			cookie:           &http.Cookie{Name: "Authorization", Value: "some-token"},
			expectedStatus:   http.StatusForbidden,
			expectedResponse: "Access token already being supplied",
		},
		{
			name:             "Incorrect Request Body",
			payload:          payloadBadBody,
			expectedStatus:   http.StatusBadRequest,
			expectedResponse: "Incorrect body.",
		},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			// Create a request with the payload
			req, _ := http.NewRequest("POST", "/signup", bytes.NewBufferString(tc.payload))
			req.Header.Set("Content-Type", "application/json")
			if tc.cookie != nil {
				req.AddCookie(tc.cookie)
			}

			w := httptest.NewRecorder()
			router.ServeHTTP(w, req)

			// Check status code
			if w.Code != tc.expectedStatus {
				t.Errorf("Expected status %d, got %d", tc.expectedStatus, w.Code)
			}

			responseBody, err := io.ReadAll(w.Body)
			if err != nil {
				t.Fatal(err)
			}
			bodyAsString := string(responseBody)

			if !strings.Contains(bodyAsString, tc.expectedResponse) {
				t.Fatalf("Expected body to contain '%s', got %s", tc.expectedResponse, bodyAsString)
			}
		})
	}
}

func TestLoginHandler(t *testing.T) {
	gin.SetMode(gin.TestMode)
	router := gin.Default()
	router.POST("/login", testServer.HandleLogin)

	// TEST CASES: successful login, incorrect credentials, incorrect body, login with existing cookie,
	payloadSuccess := `{
		"username": "john",
		"password": "testpass"
	}`
	payloadIncorrrectCreds := `{
		"username": "someone",
		"password": "password"
	}`
	payloadIncorrectBody := `{
		"user": "someone",
		"pass": "password"
	}`

	tests := []tests{
		{
			name:             "Successful Login",
			payload:          payloadSuccess,
			expectedStatus:   http.StatusOK,
			expectedResponse: "Logged in successfully",
		},
		{
			name:             "Incorrect Credentials",
			payload:          payloadIncorrrectCreds,
			expectedStatus:   http.StatusBadRequest,
			expectedResponse: "Incorrect credentials",
		},
		{
			name:             "Incorrect Body",
			payload:          payloadIncorrectBody,
			expectedStatus:   http.StatusBadRequest,
			expectedResponse: "Incorrect body",
		},
		{
			name:           "Login with Existing Credentials",
			payload:        payloadIncorrectBody,
			cookie:         &http.Cookie{Name: "Authorization", Value: `some-creds`},
			expectedStatus: http.StatusForbidden,
		},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			// Create a request with the payload
			req, _ := http.NewRequest("POST", "/login", bytes.NewBufferString(tc.payload))
			req.Header.Set("Content-Type", "application/json")
			if tc.cookie != nil {
				req.AddCookie(tc.cookie)
			}

			w := httptest.NewRecorder()
			router.ServeHTTP(w, req)

			// Check status code
			if w.Code != tc.expectedStatus {
				t.Errorf("Expected status %d, got %d", tc.expectedStatus, w.Code)
			}

			responseBody, err := io.ReadAll(w.Body)
			if err != nil {
				t.Fatal(err)
			}
			bodyAsString := string(responseBody)

			if !strings.Contains(bodyAsString, tc.expectedResponse) {
				t.Fatalf("Expected body to contain '%s', got %s", tc.expectedResponse, bodyAsString)
			}
		})
	}
}

func TestHandleLogout(t *testing.T) {
	gin.SetMode(gin.TestMode)
	router := gin.Default()
	router.GET("/logout", testServer.HandleLogout)

	// TEST CASES - Invaild Cookie, Valid Cookie, Empty Cookie
}

// func TestGetUserByID(t *testing.T) {
// 	gin.SetMode(gin.TestMode)
// 	router := gin.Default()
// 	router.GET("/profile/:id", testServer.HandleGetUserByID)

// 	// Test Cases: Valid UserID, Invalid UserID, Empty UserID
// 	tests := []tests{
// 		{
// 			name:             "Valid ID",
// 			cookie:           &http.Cookie{Name: "Authorization", Value: "Valid-Cookie"},
// 			payload:          "Valid User ID",
// 			expectedStatus:   http.StatusOK,
// 			expectedResponse: "username",
// 		},
// 		{
// 			name:             "Invalid ID",
// 			cookie:           &http.Cookie{Name: "Authorization", Value: "Valid-Cookie"},
// 			payload:          "Invalid User ID",
// 			expectedStatus:   http.StatusOK,
// 			expectedResponse: "User not found",
// 		},
// 		{
// 			name:             "Empty ID",
// 			cookie:           &http.Cookie{Name: "Authorization", Value: "Valid-Cookie"},
// 			expectedStatus:   http.StatusBadRequest,
// 			expectedResponse: "Invalid UUID format",
// 		},
// 	}

// 	for _, tc := range tests {
// 		t.Run(tc.name, func(t *testing.T) {
// 			req, _ := http.NewRequest("GET", "/profile/"+tc.payload, nil)
// 			w := httptest.NewRecorder()
// 			router.ServeHTTP(w, req)

// 			if w.Code != tc.expectedStatus {
// 				t.Errorf("Expected status %d, got %d", tc.expectedStatus, w.Code)
// 			}

// 			responseBody, err := io.ReadAll(w.Body)
// 			if err != nil {
// 				t.Fatal(err)
// 			}
// 			bodyAsString := string(responseBody)

// 			if !strings.Contains(bodyAsString, tc.expectedResponse) {
// 				t.Fatalf("Expected body to contain '%s', got %s", tc.expectedResponse, bodyAsString)
// 			}
// 		})
// 	}
// }
