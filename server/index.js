const express = require('express')
const booksRoutes = require('./routes/books')
const authRoutes = require('./routes/auth')
const cors = require('cors')
const db = require('./models')
const cookieParser = require('cookie-parser')
const app = express()
const PORT = process.env.PORT || 3000


// default CORS config
// {
//   "origin": "*",
//   "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//   "preflightContinue": false,
//   "optionsSuccessStatus": 204
// }
app.use(cors({ credentials: true, origin: 'http://localhost:8080' }))
app.use(cookieParser())

// parse application/x-www-form-urlencoded and application/json
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api/books', booksRoutes)
app.use('/api/auth', authRoutes)

async function start() {
  try {
    await db.sequelize.sync()
    app.listen(PORT)
  } catch (e) {
    console.log(e)
  }
}

start()
