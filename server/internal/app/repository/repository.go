package repository

import (
	"time"

	"github.com/google/uuid"
	"go.api/internal/app/model"
	"go.api/internal/app/service"
)

type DatabaseRepository interface {
	CreateUser(*model.User) error
	GetUserByID(uuid.UUID) (*model.User, error)
	GetRoleByName(string) (*model.Role, error)
	LoginUser(*service.LoginUserRequest, string, time.Duration) (*model.User, *model.Session, error)
	LogoutUser(sessionID string) error
	UpdateUser(*model.User) error
	CheckDisabledStatus(uuid.UUID) (bool, error)
	GetSessionToken(string) (*model.Session, error)
	UpdatePassword(uuid.UUID, string) error
	ChangeUserRole(uuid.UUID, int) error
	ChangeAccountState(userID uuid.UUID, state bool) error
	CreateOrganization(*model.Organizations) error
	GetOrganizationByInviteCode(inviteCode string) (*model.Organizations, error)
	IsFirstUserInOrganization(orgID uuid.UUID) (bool, error)
	GetAccessTypeByName(string) (*model.AccessType, error)
	GetOrganizationByID(uuid.UUID) (*model.Organizations, error)
	IsFirstOrganization() (bool, error)
}
