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
    username: HEROKU_DATABASE_USER,
    password: HEROKU_DATABASE_PASSWORD,
    database: HEROKU_DATABASE,
    host: HEROKU_DATABASE_HOST,
    port: HEROKU_DATABASE_PORT,
    dialect: 'postgres',
    operatorsAliases: 0
  }
}