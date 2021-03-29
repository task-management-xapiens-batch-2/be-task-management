require('dotenv').config()

const {
  DATABASE,
  DATABASE_USER,
  DATABASE_PASSWORD = null,
  DATABASE_HOST,
  DATABASE_PORT
} = process.env

module.exports = {
  development: {
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE,
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    dialect: 'postgres',
    operatorsAliases: 0
  },
  production: {
    username: process.env.DB_HEROKU_USERNAME,
    password: process.env.DB_HEROKU_PASSWORD,
    database: process.env.DB_HEROKU_NAME,
    host: process.env.DB_HEROKU_HOST,
    port: process.env.DB_HEROKU_PORT,
    dialect: 'postgres',
    operatorsAliases: 0
  }
}