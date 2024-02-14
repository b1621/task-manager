package handler

import (
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"go.api/internal/app/model"
)

func (s *APIServer) SetupRoutes(r *gin.Engine) {
	// Public routes
	r.GET("/", s.HandleRoot)
	r.POST("/SignUp", s.HandleSignUp)
	r.POST("/Login", s.HandleLogin)
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	r.POST("/create-org", s.HandleCreateOrganization)

	admin, err := s.store.GetRoleByName("Admin")
	if err != nil {
		panic(err)
	}
	user, err := s.store.GetRoleByName("User")
	if err != nil {
		panic(err)
	}

	client, err := s.store.GetAccessTypeByName("Client")
	if err != nil {
		panic(err)
	}

	firm, err := s.store.GetAccessTypeByName("Firm")
	if err != nil {
		panic(err)
	}

	main, err := s.store.GetAccessTypeByName("Main")
	if err != nil {
		panic(err)
	}

	superadmin, err := s.store.GetAccessTypeByName("SuperAdmin")
	if err != nil {
		panic(err)
	}

	generalAuthenticatedRoutes := r.Group("/").Use(TokenAuthMiddleware(s.store,
		[]*model.Role{user, admin},
		[]*model.AccessType{client, firm, main, superadmin}))
	{
		generalAuthenticatedRoutes.GET("/Logout", s.HandleLogout)
	}

	userClientRoutes := r.Group("/").Use(TokenAuthMiddleware(s.store,
		[]*model.Role{user, admin},
		[]*model.AccessType{client}))
	{
		userClientRoutes.GET("/profile", s.HandleRoot)
		userClientRoutes.POST("/update-profile", s.HandleUpdateOwnProfile)
		userClientRoutes.POST("/reset-password", s.HandleUpdatePassword)
		userClientRoutes.POST("/Logout", s.HandleLogout)
		userClientRoutes.POST("/disable-account", s.HandleUserDisableOwnAccount)
	}

	adminClientRoutes := r.Group("/").Use(TokenAuthMiddleware(s.store,
		[]*model.Role{admin},
		[]*model.AccessType{client}))
	{
		adminClientRoutes.GET("/client-admin", s.HandleRoot)
		adminClientRoutes.POST("/update-user-profile", s.HandleAdminUpdateUserProfile)
		adminClientRoutes.POST("/reset-user-password", s.HandleAdminPasswordUpdate)
		adminClientRoutes.POST("/change-user-role", s.HandleChangeUserRole)
		adminClientRoutes.POST("/disable-or-enable-user-account", s.HandleAdminDisableOrEnableUserAccount)
	}

	userFirmRoutes := r.Group("/").Use(TokenAuthMiddleware(s.store,
		[]*model.Role{user, admin},
		[]*model.AccessType{firm}))
	{
		userFirmRoutes.GET("/user-firm")
	}

	adminFirmRoutes := r.Group("/").Use(TokenAuthMiddleware(s.store,
		[]*model.Role{admin},
		[]*model.AccessType{firm}))
	{
		adminFirmRoutes.POST("/change-tester-role", s.HandleChangeUserRole)
		adminFirmRoutes.GET("/admin-firm")
	}

	userMainRoutes := r.Group("/").Use(TokenAuthMiddleware(s.store,
		[]*model.Role{user, admin},
		[]*model.AccessType{main}))
	{
		userMainRoutes.GET("/user-main")
	}

	adminMainRoutes := r.Group("/").Use(TokenAuthMiddleware(s.store,
		[]*model.Role{admin},
		[]*model.AccessType{main}))
	{
		adminClientRoutes.POST("/change-main-user-role", s.HandleChangeUserRole)
		adminMainRoutes.GET("/admin-main")
	}

	userSuperAdminRoutes := r.Group("/").Use(TokenAuthMiddleware(s.store,
		[]*model.Role{user, admin},
		[]*model.AccessType{superadmin}))
	{
		adminClientRoutes.POST("/change-superadmin-user-role", s.HandleChangeUserRole)
		userSuperAdminRoutes.GET("/user-super-admin")
	}

	adminSuperAdminRoutes := r.Group("/").Use(TokenAuthMiddleware(s.store,
		[]*model.Role{admin},
		[]*model.AccessType{superadmin}))
	{
		adminSuperAdminRoutes.GET("/admin-super-admin")
	}
}
