package handler

import (
	"errors"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/gorm"

	_ "go.api/docs"
	"go.api/internal/app/model"
	"go.api/internal/app/repository"
	"go.api/internal/app/service"
	"go.api/internal/config"
)

type APIServer struct {
	store  repository.DatabaseRepository
	config config.ServerConfig
}

func NewAPIServer(config config.ServerConfig, store repository.DatabaseRepository) *APIServer {
	return &APIServer{
		store:  store,
		config: config,
	}
}

func (s *APIServer) Run() error {
	router := gin.Default()
	router.Use() // TODO: Might Be useful To Remove
	s.SetupRoutes(router)

	return router.Run(fmt.Sprintf(":%d", s.config.Port))
}

// @Summary Root endpoint
// @Description Responds with a simple Hello, world message
// @ID get-root
// @Produce json
// @Success 200 {object} APIMessage
// @Router / [get]
func (s *APIServer) HandleRoot(c *gin.Context) {
	c.JSON(http.StatusOK, APIMessage{"Hello, world"})
}

// @Summary Signup
// @Description Signs up a new user
// @ID post-signup
// @Accept json
// @Produce json
// @Param createUserReq body service.CreateUserRequest true "Create User Request"
// @Success 200 {object} APIMessage
// @Failure 400 {object} APIError
// @Failure 403 {object} APIError
// @Failure 500 {object} APIError
// @Router /signup [post]
func (s *APIServer) HandleSignUp(c *gin.Context) {
	if _, err := c.Cookie("session"); err == nil {
		c.JSON(http.StatusForbidden, APIError{"Access token already being supplied."})
		return
	}

	createUserReq := &service.CreateUserRequest{}
	if err := c.ShouldBindJSON(createUserReq); err != nil {
		c.JSON(http.StatusBadRequest, APIError{"Incorrect body " + err.Error()})
		return
	}
	log.Printf("Creating user: %v", createUserReq.Username)

	org, err := s.store.GetOrganizationByInviteCode(createUserReq.InviteCode)
	if err != nil {
		c.JSON(http.StatusNotFound, APIError{"Invalid invite code"})
		return
	}

	isFirstUser, err := s.store.IsFirstUserInOrganization(org.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, APIError{"Failed to determine user role."})
		return
	}

	var role *model.Role
	if isFirstUser {
		role, err = s.store.GetRoleByName("Admin")
		if err != nil {
			c.JSON(http.StatusInternalServerError, APIError{"Registration Failed"})
			return
		}
	} else {
		role, err = s.store.GetRoleByName("User")
		if err != nil {
			c.JSON(http.StatusInternalServerError, APIError{"Registration Failed"})
			return
		}
	}

	user := &model.User{
		Username:       createUserReq.Username,
		Email:          createUserReq.Email,
		Phone:          createUserReq.Phone,
		Password:       createUserReq.Password,
		OrganizationID: org.ID,
		RoleID:         role.ID,
	}

	user.IsDisabled = true

	if err != nil {
		c.JSON(http.StatusInternalServerError, APIError{"Registration Failed"})
		return
	}

	err = s.store.CreateUser(user)

	if errors.Is(err, gorm.ErrDuplicatedKey) {
		c.JSON(http.StatusForbidden, APIError{"Can not register: user is already in record."})
		return
	}

	if err != nil {
		fmt.Printf("kqk %T:%v", err, err)
		c.JSON(http.StatusInternalServerError, APIError{"Registration Failed"})
		return
	}

	c.JSON(200, APIMessage{"Sign up successful"})
}

// @Summary Login
// @Description Logs in a user and returns an access token.
// @ID login
// @Accept json
// @Produce json
// @Param loginUserReq body service.LoginUserRequest true "Login User Request"
// @Success 200 {object} APIMessage
// @Failure 400 {object} APIError
// @Failure 403 {object} APIError
// @Router /login [post]
func (s *APIServer) HandleLogin(c *gin.Context) {
	if _, err := c.Cookie("session"); err == nil {
		c.JSON(http.StatusForbidden, APIError{"Access token already supplied"})
		return
	}

	loginUserReq := &service.LoginUserRequest{}
	if err := c.ShouldBindJSON(loginUserReq); err != nil {
		c.JSON(http.StatusBadRequest, APIError{"This is the error on binding: " + err.Error()})
		return
	}

	userAgent := c.Request.UserAgent()

	user, session, err := s.store.LoginUser(loginUserReq, userAgent, s.config.SessionDuration)
	if err != nil {
		// Handle the error based on its type
		c.JSON(http.StatusBadRequest, APIError{"Incorrect credentials"})
		return
	}

	if user.IsDisabled {
		c.JSON(http.StatusBadRequest, APIError{"User Disabled."})
		return
	}

	l := int(s.config.SessionDuration.Seconds())
	if l == 0 {
		l = -1
	}
	c.SetCookie("session", session.Token, l, "/", "", false, true)
	c.JSON(http.StatusOK, APIMessage{"Logged in successfully"})
}

// @Summary Logout
// @Description Logs out a user and clears the access token.
// @ID logout
// @Param Token header string true "session"
// @Produce json
// @Success 200 {object} APIMessage
// @Failure 400 {object} APIError
// @Failure 404 {object} APIError
// @Failure 500 {object} APIError
// @Router /logout [get]
func (s *APIServer) HandleLogout(c *gin.Context) {
	token, err := c.Cookie("session")
	if err != nil {
		c.JSON(http.StatusNotFound, APIError{"Refresh token is required"})
		return
	}

	if err := s.store.LogoutUser(token); err != nil {
		c.JSON(http.StatusInternalServerError, APIError{"Failed to logout user"})
		return
	}
	c.SetCookie("refreshToken", "", -1, "/", "", false, true)
	c.JSON(http.StatusOK, APIMessage{"Logged out successfully"})
}

// @Summary Update Profile
// @Description Updates the profile of the logged-in user.
// @ID update-profile
// @Accept json
// @Produce json
// @Param Token header string true "session"
// @Param updatedUser body model.User true "Updated User"
// @Success 200 {object} APIMessage
// @Failure 400 {object} APIError
// @Failure 403 {object} APIError
// @Failure 500 {object} APIError
// @Router /update-profile [post]
func (s *APIServer) HandleUpdateOwnProfile(c *gin.Context) {
	userID, _ := c.Get("userID") // Extracted from TokenAuthMiddleware
	uID, err := uuid.Parse(userID.(string))

	if err != nil {
		c.JSON(http.StatusBadRequest, APIError{"Invalid user data"})
		return
	}

	var updatedUser model.User
	err = c.ShouldBindJSON(&updatedUser)
	if err != nil {
		c.JSON(http.StatusBadRequest, APIError{"Invalid user data"})
		return
	}

	updatedUser.ID = uID // Safeguard. needs feedback.
	if err := s.store.UpdateUser(&updatedUser); err != nil {
		c.JSON(http.StatusInternalServerError, APIError{"Failed to update user"})
		return
	}

	c.JSON(http.StatusOK, APIMessage{"User profile updated successfully"})
}

// @Summary Admin Update User Profile
// @Description Allows admin to update a user's profile.
// @ID admin-update-user-profile
// @Accept json
// @Produce json
// @Param Token header string true "session"
// @Param user_id path string true "Target User ID"
// @Param updatedUser body model.User true "Updated User Data"
// @Success 200 {object} APIMessage
// @Failure 400 {object} APIError
// @Failure 500 {object} APIError
// @Router /update-user-profile [post]
func (s *APIServer) HandleAdminUpdateUserProfile(c *gin.Context) {
	var updatedUser model.User
	if err := c.ShouldBindJSON(&updatedUser); err != nil {
		c.JSON(http.StatusBadRequest, APIError{"Invalid user data"})
		return
	}

	if err := s.store.UpdateUser(&updatedUser); err != nil {
		c.JSON(http.StatusInternalServerError, APIError{"Failed to update user"})
		return
	}

	c.JSON(http.StatusOK, APIMessage{"User profile updated by admin successfully"})
}

// @Summary Update Password
// @Description Allows a user to reset their own password.
// @ID update-password
// @Accept json
// @Produce json
// @Param Token header string true "session"
// @Success 200 {object} APIMessage
// @Failure 400 {object} APIError
// @Failure 500 {object} APIError
// @Router /reset-password [post]
func (s *APIServer) HandleUpdatePassword(c *gin.Context) {
	userID, _ := c.Get("userID") // Extracted from JWT Middleware
	uID, err := uuid.Parse(userID.(string))
	if err != nil {
		c.JSON(http.StatusBadRequest, APIError{"Invalid ID"})
		return
	}

	passReset := new(service.ChangePasswordRequest)
	if err := c.ShouldBindJSON(passReset); err != nil {
		c.JSON(http.StatusBadRequest, APIError{"Invalid request"})
		return
	}

	user, err := s.store.GetUserByID(uID)
	if err != nil {
		c.JSON(http.StatusBadRequest, APIError{"Invalid request"})
		return
	}

	if !service.VerifyPassword([]byte(user.Password), passReset.CurrentPassword) {
		c.JSON(http.StatusBadRequest, APIError{"current password is incorrect"})
		return
	}

	if s.store.UpdatePassword(uID, passReset.NewPassword) != nil {
		c.JSON(http.StatusInternalServerError, APIError{"Failed to reset password"})
		return
	}
	c.JSON(http.StatusOK, APIMessage{"Password reset successfully"})
}

// @Summary Admin Reset User Password
// @Description Allows an admin to reset a user's password.
// @ID admin-reset-user-password
// @Accept json
// @Produce json
// @Param Token header string true "session"
// @Param user_id path string true "Target User ID"
// @Param passwordResetRequest body service.AdminPasswordUpdateRequest true "Password Reset Request"
// @Success 200 {object} APIMessage
// @Failure 400 {object} APIError
// @Failure 500 {object} APIError
// @Router /reset-user-password [post]
func (s *APIServer) HandleAdminPasswordUpdate(c *gin.Context) {
	var adminPassUpdate = new(service.AdminPasswordUpdateRequest)
	if err := c.ShouldBindJSON(adminPassUpdate); err != nil {
		c.JSON(http.StatusBadRequest, APIError{"Invalid request data"})
		return
	}

	if err := s.store.UpdatePassword(adminPassUpdate.UserID, adminPassUpdate.NewPassword); err != nil {
		c.JSON(http.StatusInternalServerError, APIError{"Failed to reset password"})
		return
	}

	c.JSON(http.StatusOK, APIMessage{"Password reset by admin successfully"})
}

// @Summary Change User Role
// @Description Changes the role of a user.
// @ID change-user-role
// @Accept json
// @Produce json
// @Param Token header string true "session"
// @Param roleChange body service.RoleChangeRequest true "Role Change Request"
// @Success 200 {object} APIMessage
// @Failure 400 {object} APIError
// @Failure 500 {object} APIError
// @Router /change-user-role [post]
func (s *APIServer) HandleChangeUserRole(c *gin.Context) {
	roleChange := service.RoleChangeRequest{}
	if err := c.ShouldBindJSON(&roleChange); err != nil {
		c.JSON(http.StatusBadRequest, APIError{"Invalid request"})
		return
	}

	uID, err := uuid.Parse(roleChange.UserID)
	if err != nil {
		c.JSON(http.StatusBadRequest, APIError{"Invalid user ID"})
		return
	}

	if err := s.store.ChangeUserRole(uID, roleChange.NewRoleID); err != nil {
		c.JSON(http.StatusInternalServerError, APIError{"Failed to change user role"})
		return
	}

	c.JSON(http.StatusOK, APIMessage{"User role changed successfully"})
}

// @Summary Disable Own Account
// @Description Allows a user to disable their own account.
// @ID disable-own-account
// @Param Token header string true "session"
// @Produce json
// @Success 200 {object} APIMessage
// @Failure 500 {object} APIError
// @Router /disable-account [post]
func (s *APIServer) HandleUserDisableOwnAccount(c *gin.Context) {
	userID, _ := c.Get("userID") // Extracted from TokenAuthMiddleware
	uID, _ := uuid.Parse(userID.(string))

	if err := s.store.ChangeAccountState(uID, true); err != nil {
		c.JSON(http.StatusInternalServerError, APIError{"Failed to disable account"})
		return
	}

	c.JSON(http.StatusOK, APIMessage{"Account disabled successfully"})
}

// @Summary Admin Disable User Account
// @Description Allows an admin to disable or enable a user account.
// @ID admin-disable-user-account
// @Accept json
// @Produce json
// @Param AccessToken header string true "Authorization"
// @Param RefreshToken header string true "refreshToken"
// @Param disableUserRequest body service.DisableUserRequest true "Disable User Request"
// @Success 200 {object} APIMessage
// @Failure 400 {object} APIError
// @Failure 500 {object} APIError
// @Router /disable-or-enable-user-account [post]
func (s *APIServer) HandleAdminDisableOrEnableUserAccount(c *gin.Context) {
	req := new(service.DisableUserRequest)

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, APIError{"Invalid request data"})
		return
	}

	if s.store.ChangeAccountState(req.UserID, req.Disable) != nil {
		c.JSON(http.StatusInternalServerError, APIError{"Failed to account status"})
		return
	}

	c.JSON(http.StatusOK, APIMessage{"Request Completed successfully"})
}

func (s *APIServer) HandleCreateOrganization(c *gin.Context) {
	createOrgReq := &service.CreateOrganizationRequest{}
	if err := c.ShouldBindJSON(createOrgReq); err != nil {
		c.JSON(http.StatusBadRequest, APIError{"Incorrect body."})
		return
	}

	log.Printf("Creating Organization: %v", createOrgReq.Name)

	isFirstOrg, err := s.store.IsFirstOrganization()
	if err != nil {
		c.JSON(http.StatusInternalServerError, APIError{"Failed to determine user role."})
		return
	}

	var accessType *model.AccessType
	if isFirstOrg {
		accessType, err = s.store.GetAccessTypeByName("SuperAdmin")
		if err != nil {
			c.JSON(http.StatusInternalServerError, APIError{"Registration Failed"})
			return
		}
	} else if createOrgReq.AccessType == "" { // If access type is not given, the default access type will be client.
		accessType, err = s.store.GetAccessTypeByName("Client")
		if err != nil {
			c.JSON(http.StatusInternalServerError, APIError{"Registration Failed"})
			return
		}
	} else {
		accessType, err = s.store.GetAccessTypeByName(createOrgReq.AccessType)
		if err != nil {
			c.JSON(http.StatusInternalServerError, APIError{"Registration Failed"})
			return
		}
	}

	organization := &model.Organizations{
		Name:         createOrgReq.Name,
		Description:  createOrgReq.Description,
		Email:        createOrgReq.Email,
		Phone:        createOrgReq.PhoneNumber,
		Address:      createOrgReq.Address,
		AccessTypeId: accessType.ID,
	}

	if err := s.store.CreateOrganization(organization); err != nil {
		if errors.Is(err, gorm.ErrDuplicatedKey) {
			c.JSON(http.StatusForbidden, APIError{"Can not register: organization is already in record."})
			return
		} else {
			fmt.Printf("kqk %T:%v", err, err)
			c.JSON(http.StatusInternalServerError, APIError{"Registration Failed"})
			return
		}
	}

	c.JSON(200, APIMessage{"Sign up successful"})
}
