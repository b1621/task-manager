package service

import (
	"github.com/google/uuid"
)

type CreateUserRequest struct {
	Username   string `json:"username" binding:"required"`
	Email      string `json:"email" binding:"required"`
	Phone      string `json:"phone"`
	Password   string `json:"password" binding:"required"`
	InviteCode string `json:"invite_code" binding:"required"`
}

type LoginUserRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type ChangePasswordRequest struct {
	CurrentPassword string `json:"current_password"`
	NewPassword     string `json:"new_password"`
}

type AdminPasswordUpdateRequest struct {
	UserID      uuid.UUID `json:"user_id" binding:"required"`
	NewPassword string    `json:"new_password" binding:"required"`
}

type RoleChangeRequest struct {
	UserID    string `json:"userID"`
	NewRoleID int    `json:"new_role_id"`
}

type DisableUserRequest struct {
	UserID  uuid.UUID `json:"id" binding:"required"`
	Disable bool      `json:"disable_user" binding:"required"`
}

type CreateOrganizationRequest struct {
	Name        string `json:"name" binding:"required"`
	Description string `json:"description"`
	Email       string `json:"email" binding:"required"`
	PhoneNumber string `json:"phone" binding:"required"`
	Address     string `json:"address" binding:"required"`
	AccessType  string `json:"accesstype"`
}
