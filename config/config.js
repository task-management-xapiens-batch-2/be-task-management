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
    operatorsAliases: false
  },
  production: {
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE,
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    dialect: 'postgres',
    operatorsAliases: false
  }
}