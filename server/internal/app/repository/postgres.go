package repository

import (
	"errors"
	"fmt"
	"time"

	"github.com/google/uuid"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"

	"go.api/internal/app/model"
	"go.api/internal/app/service"
	"go.api/internal/config"
)

type PostgresUserRepository struct {
	db *gorm.DB
}

func NewPostgresRepository(config config.PostgresConfig) (*PostgresUserRepository, error) {
	db, err := gorm.Open(postgres.Open(config.String()), &gorm.Config{TranslateError: true})
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}
	err = db.Exec("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";").Error
	if err != nil {
		return nil, fmt.Errorf("failed to create uuid-ossp extension: %w", err)
	}
	err = db.AutoMigrate(&model.User{}, &model.Role{}, &model.Session{},
		&model.Organizations{}, &model.AccessType{})
	if err != nil {
		return nil, fmt.Errorf("automigraton error: %w", err)
	}

	//Adding Roles
	//TODO: check if the loop is necessary
	for _, role := range model.ROLES {
		var existingRole model.Role
		err := db.First(&existingRole, "name = ?", role.Name).Error
		if errors.Is(err, gorm.ErrRecordNotFound) {
			if err := db.Create(&role).Error; err != nil {
				return nil, fmt.Errorf("failed to populate roles: %w", err)
			}
		} else if err != nil {
			return nil, fmt.Errorf("failed to populate roles: %w", err)
		}
	}

	// Adding Access Types
	for _, accesstype := range model.ACCESSTYPES {
		var existingAccessType model.AccessType
		err := db.First(&existingAccessType, "name = ?", accesstype.Name).Error
		if errors.Is(err, gorm.ErrRecordNotFound) {
			if err := db.Create(&accesstype).Error; err != nil {
				return nil, fmt.Errorf("failed to populate access types: %w", err)
			}
		} else if err != nil {
			return nil, fmt.Errorf("failed to populate access types: %w", err)
		}
	}

	return &PostgresUserRepository{db: db}, nil
}

func (p *PostgresUserRepository) CreateUser(user *model.User) error {
	px, err := service.HashPassword(user.Password)
	if err != nil {
		return err
	}
	user.Password = px
	return p.db.Create(&user).Error
}

func (p *PostgresUserRepository) GetUserByID(id uuid.UUID) (*model.User, error) {
	var user model.User
	err := p.db.First(&user, "id = ?", id).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (p *PostgresUserRepository) UpdateUser(updatedUser *model.User) error {
	return p.db.Model(&model.User{}).
		Where("id = ?", updatedUser.ID).
		Updates(model.User{
			Username: updatedUser.Username,
			Email:    updatedUser.Email,
			Phone:    updatedUser.Phone,
		}).Error
}

func (p *PostgresUserRepository) CheckDisabledStatus(userID uuid.UUID) (bool, error) {
	user, err := p.GetUserByID(userID)
	if err != nil {
		return true, err
	}
	return user.IsDisabled, nil
}

func (p *PostgresUserRepository) LoginUser(loginReq *service.LoginUserRequest, userAgent string, duration time.Duration) (*model.User, *model.Session, error) {
	var user model.User
	err := p.db.First(&user, "username = ?", loginReq.Username).Error
	if err != nil {
		return nil, nil, err
	}

	// Incorrect password
	if ok := service.VerifyPassword([]byte(user.Password), loginReq.Password); !ok {
		return nil, nil, fmt.Errorf("incorrect Password")
	}

	token := service.GenerateRandomString()

	session := &model.Session{
		UserID:    user.ID,
		Token:     token,
		UserAgent: userAgent,
		ExpiresAt: time.Now().Add(duration),
	}

	if err := p.db.Create(session).Error; err != nil {
		return nil, nil, err
	}

	return &user, session, nil
}

func (p *PostgresUserRepository) LogoutUser(token string) error {
	return p.db.Where("token = ?", token).Delete(&model.Session{}).Error
}

func (p *PostgresUserRepository) GetSessionToken(refreshToken string) (*model.Session, error) {
	session := &model.Session{}
	err := p.db.Where("token=? and expires_at>?", refreshToken, time.Now()).
		Preload(clause.Associations).Preload("User.Role").Take(session).Error
	if err != nil {
		return nil, err
	}
	return session, nil
}

func (p *PostgresUserRepository) DeleteExpiredTokens() error {
	return p.db.Where("expires_at < ?", time.Now()).Delete(&model.Session{}).Error
}

func (p *PostgresUserRepository) UpdatePassword(userID uuid.UUID, newPassword string) error {
	hashedNewPassword, err := service.HashPassword(newPassword)
	if err != nil {
		return err
	}

	return p.db.Model(&model.User{ID: userID}).Update("password", hashedNewPassword).Error
}

func (p *PostgresUserRepository) ChangeUserRole(userID uuid.UUID, newRoleID int) error {
	return p.db.Model(&model.User{ID: userID}).Update("role_id", newRoleID).Error
}

func (p *PostgresUserRepository) ChangeAccountState(userID uuid.UUID, state bool) error {
	return p.db.Model(&model.User{ID: userID}).Update("is_disabled", state).Error
}

func (p *PostgresUserRepository) GetRoleByName(name string) (*model.Role, error) {
	r := &model.Role{}
	err := p.db.Where("name = ?", name).Take(r).Error
	return r, err
}

func (p *PostgresUserRepository) CreateOrganization(org *model.Organizations) error {
	org.InviteCode = service.GenerateRandomString()
	return p.db.Create(&org).Error
}

func (p *PostgresUserRepository) IsFirstOrganization() (bool, error) {
	var orgCount int64
	if err := p.db.Model(&model.Organizations{}).Count(&orgCount).Error; err != nil {
		return false, nil
	}
	return orgCount == 0, nil
}

func (p *PostgresUserRepository) GetOrganizationByInviteCode(inviteCode string) (*model.Organizations, error) {
	var org model.Organizations
	if err := p.db.Where("invite_code = ?", inviteCode).First(&org).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("organization not found")
		}
		return nil, err
	}
	return &org, nil
}

func (p *PostgresUserRepository) IsFirstUserInOrganization(orgID uuid.UUID) (bool, error) {
	var userCount int64
	if err := p.db.Model(&model.User{}).Where("organization_id = ?", orgID).Count(&userCount).Error; err != nil {
		return false, err
	}
	return userCount == 0, nil
}

func (p *PostgresUserRepository) GetAccessTypeByName(name string) (*model.AccessType, error) {
	var accessType model.AccessType
	if err := p.db.Where("name = ?", name).First(&accessType).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("access type not found")
		}
		return nil, err
	}
	return &accessType, nil
}

func (p *PostgresUserRepository) GetOrganizationByID(id uuid.UUID) (*model.Organizations, error) {
	var org model.Organizations
	if err := p.db.Where("id = ?", id).First(&org).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("organization not found")
		}
		return nil, err
	}
	return &org, nil
}
