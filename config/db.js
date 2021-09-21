'use strict'
require('dotenv').config()
// Environment variable DB_URI will be available in
// heroku production evironment otherwise use test or development db
const currentDb = process.env.DB_URI

module.exports = currentDb
