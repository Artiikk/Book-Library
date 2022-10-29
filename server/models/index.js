const { Sequelize } = require('sequelize')
const UsersFactory = require('./users')
const LibrariesFactory = require('./libraries')
const BooksFactory = require('./books')
require('dotenv').config()

const DB_NAME = process.env.DB_NAME
const USER_NAME = process.env.USER_NAME
const PASSWORD = process.env.PASSWORD
const HOSTNAME = process.env.HOSTNAME

const sequelize = new Sequelize(DB_NAME, USER_NAME, PASSWORD, {
  host: HOSTNAME,
  dialect: 'mysql',
  port: 3306
})

const models = {
  Users: UsersFactory(sequelize),
  Libraries: LibrariesFactory(sequelize),
  Books: BooksFactory(sequelize)
}

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models)
  }
})


// function filterFiles(file) {
//   return (file.includes('.')) && (file !== 'index.js')
// }

// function importFile(file) {
//   const model = sequelize['import'](path.join(__dirname, file))
//   db[model.name] = model
// }

// fs.readdirSync(__dirname).filter(filterFiles).forEach(importFile)

const db = { ...models, sequelize }

module.exports = db
