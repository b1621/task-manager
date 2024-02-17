package config

import (
	"errors"
	"fmt"
	"time"

	"github.com/spf13/viper"
)

type Config struct {
	Server   ServerConfig   `mapstructure:"HTTP"`
	Postgres PostgresConfig `mapstructure:"PG"`
}

type ServerConfig struct {
	Port            int           `mapstructure:"PORT"`
	SessionDuration time.Duration `mapstructure:"SESSIONLEN"`
}

type PostgresConfig struct {
	Host     string `mapstructure:"HOST"`
	User     string `mapstructure:"USER"`
	Password string `mapstructure:"PASSWORD"`
	Database string `mapstructure:"DATABASE"`
}

func (p PostgresConfig) String() string {
	return "host=" + p.Host + " user=" + p.User + " password=" + p.Password + " dbname=" + p.Database
}

func LoadConfig(path string) (Config, error) { // TODO: Reconfigure To load from .env file
	var config Config

	c := viper.NewWithOptions(viper.KeyDelimiter("_"))
	c.AddConfigPath(".")
	c.SetConfigFile(".env")

	// viper.AddConfigPath(path)
	// viper.SetConfigFile(".env")

	// viper.AutomaticEnv() // Read from environment variables

	if err := c.ReadInConfig(); err != nil {
		return config, err
	}
	if err := c.UnmarshalExact(&config); err != nil {
		return config, err
	}

	fmt.Println(config)

	if config.Server.SessionDuration <= 0 {
		return config, errors.New("session token duration is not valid")
	}

	if config.Server.Port == 0 {
		return config, errors.New("HTTP Port is not valid")
	}

	return config, nil
}
