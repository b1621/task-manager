package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"go.api/internal/app/model"
	"go.api/internal/app/repository"
)

type APIError struct {
	Error string `json:"error"`
}

type APIMessage struct {
	Message string `json:"message"`
}

func TokenAuthMiddleware(s repository.DatabaseRepository, allowedRoles []*model.Role, allowedAccessTypes []*model.AccessType) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Get Session UUID
		tokenString, err := c.Cookie("session")
		if err != nil {
			// Session not found in request
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			c.Abort()
			return
		}

		session, err := s.GetSessionToken(tokenString)
		if err != nil {
			// Session expired or not valid
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			c.Abort()
			return
		}

		uID := session.UserID

		// Check if user is disabled
		user, err := s.GetUserByID(uID)
		if err != nil || user.IsDisabled {
			c.JSON(http.StatusForbidden, APIError{"Account is disabled"})
			c.Abort()
			return
		}

		// Check if the user has the appropriate role to access a resource
		// Allow Access as permitted
		var roleAllowed bool
		for _, role := range allowedRoles {
			if role != nil && role.ID == user.RoleID {
				roleAllowed = true
				break
			}
		}

		org, err := s.GetOrganizationByID(user.OrganizationID)
		if err != nil {
			c.JSON(http.StatusForbidden, APIError{"Organization not found"})
			c.Abort()
			return
		}

		// Check if the organization has the appropriate access type
		var accessTypeAllowed bool
		for _, accessType := range allowedAccessTypes {
			if accessType != nil && accessType.ID == org.AccessTypeId {
				accessTypeAllowed = true
				break
			}
		}

		if roleAllowed && accessTypeAllowed {
			// Set the user ID as a context value for Handlers to use
			c.Set("userID", session.UserID)
			c.Set("organizationID", user.OrganizationID)
			c.Next()
			return
		}

		// The User Role is not allowed to access this resource, Deny
		c.JSON(http.StatusForbidden, APIError{"Access denied"})
		c.Abort()
	}
}
