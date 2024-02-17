package model

import (
	"time"

	"github.com/google/uuid"
)

type Session struct {
	Token     string    `gorm:"type:text;primaryKey;not null"`
	UserAgent string    `gorm:"type:text"`
	ExpiresAt time.Time `gorm:"type:timestamp;not null"`
	UserID    uuid.UUID `gorm:"type:uuid;not null"`
	User      User      `gorm:"foreignKey:UserID"`
}

type User struct {
	UserID   int    `gorm:"type:int;primaryKey;autoIncrement" json:"user_id"`
	Username string `gorm:"type:varchar(255);not null;unique" json:"username"`
	Email    string `gorm:"type:varchar(255);not null;unique" json:"email"`
	Password string `gorm:"type:varchar(255)" json:"password"`
	Role     string `gorm:"type:varchar(255)" json:"role"`
}

type TaskGroup struct {
	GroupID     int    `gorm:"type:int;primaryKey;autoIncrement" json:"group_id"`
	GroupName   string `gorm:"type:varchar(255);not null" json:"group_name"`
	JoiningCode string `gorm:"type:varchar(255);not null" json:"joining_code"`
	ManagerID   int    `gorm:"type:int;not null" json:"manager_id"`
	Manager     User   `gorm:"foreignKey:ManagerID"`
}

type Task struct {
	TaskID         int       `gorm:"type:int;primaryKey;autoIncrement" json:"task_id"`
	TaskName       string    `gorm:"type:varchar(255);not null" json:"task_name"`
	Description    string    `gorm:"type:varchar(255)" json:"description"`
	DueDate        time.Time `gorm:"type:date" json:"due_date"`
	Priority       string    `gorm:"type:varchar(255)" json:"priority"`
	Status         string    `gorm:"type:varchar(255)" json:"status"`
	AssignedUserID int       `gorm:"type:int" json:"assigned_user_id"`
	AssignedUser   User      `gorm:"foreignKey:AssignedUserID"`
	GroupID        int       `gorm:"type:int" json:"group_id"`
	TaskGroup      TaskGroup `gorm:"foreignKey:GroupID"`
}

type Membership struct {
	MembershipID int       `gorm:"type:int;primaryKey;autoIncrement" json:"membership_id"`
	UserID       int       `gorm:"type:int;not null" json:"user_id"`
	User         User      `gorm:"foreignKey:UserID"`
	GroupID      int       `gorm:"type:int;not null" json:"group_id"`
	TaskGroup    TaskGroup `gorm:"foreignKey:GroupID"`
}

type Chat struct {
	ChatID    int       `gorm:"type:int;primaryKey;autoIncrement" json:"chat_id"`
	UserID    int       `gorm:"type:int;not null" json:"user_id"`
	User      User      `gorm:"foreignKey:UserID"`
	GroupID   int       `gorm:"type:int;not null" json:"group_id"`
	TaskGroup TaskGroup `gorm:"foreignKey:GroupID"`
	Message   string    `gorm:"type:varchar(255)" json:"message"`
	Timestamp time.Time `gorm:"type:datetime" json:"timestamp"`
}

type Report struct {
	ReportID    int       `gorm:"type:int;primaryKey;autoIncrement" json:"report_id"`
	UserID      int       `gorm:"type:int;not null" json:"user_id"`
	User        User      `gorm:"foreignKey:UserID"`
	TaskID      int       `gorm:"type:int;not null" json:"task_id"`
	Task        Task      `gorm:"foreignKey:TaskID"`
	Description string    `gorm:"type:varchar(255)" json:"description"`
	Timestamp   time.Time `gorm:"type:datetime" json:"timestamp"`
}

type Setting struct {
	SettingsID              int    `gorm:"type:int;primaryKey;autoIncrement" json:"settings_id"`
	UserID                  int    `gorm:"type:int;not null" json:"user_id"`
	User                    User   `gorm:"foreignKey:UserID"`
	APIKey                  string `gorm:"type:varchar(255)" json:"api_key"`
	CalendarIntegration     string `gorm:"type:varchar(255)" json:"calendar_integration"`
	NotificationPreferences string `gorm:"type:varchar(255)" json:"notification_preferences"`
}

type Schedule struct {
	ScheduleID   int       `gorm:"type:int;primaryKey;autoIncrement" json:"schedule_id"`
	UserID       int       `gorm:"type:int;not null" json:"user_id"`
	User         User      `gorm:"foreignKey:UserID"`
	TaskID       int       `gorm:"type:int;not null" json:"task_id"`
	Task         Task      `gorm:"foreignKey:TaskID"`
	CalendarType string    `gorm:"type:varchar(255)" json:"calendar_type"`
	Timestamp    time.Time `gorm:"type:datetime" json:"timestamp"`
}

type Notification struct {
	NotificationID int       `gorm:"type:int;primaryKey;autoIncrement" json:"notification_id"`
	UserID         int       `gorm:"type:int;not null" json:"user_id"`
	User           User      `gorm:"foreignKey:UserID"`
	Message        string    `gorm:"type:varchar(255)" json:"message"`
	Timestamp      time.Time `gorm:"type:datetime" json:"timestamp"`
}
