const { Router } = require('express')
const router = Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { v4: uuid } = require('uuid')
const db = require('../models')
const nodemailer = require('nodemailer')
const sgTransport = require('nodemailer-sendgrid-transport')
const regEmail = require('../mails/registrations')
require('dotenv').config()

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET
const SENDGRID_MAIL_KEY = process.env.SENDGRID_MAIL_KEY
const BASE_URL = process.env.BASE_URL
const BASE_FRONTEND_URL = process.env.BASE_FRONTEND_URL

const transporter = nodemailer.createTransport(sgTransport({
  auth: {
    api_key: SENDGRID_MAIL_KEY
  }
}))

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    const hashedPassword = await bcrypt.hash(password, 12)
    const userUUID = uuid()

    const [user, created] = await db.Users.findOrCreate({
      where: { email },
      defaults: {
        userUUID,
        name,
        email,
        password: hashedPassword
      }
    })

    if (created) {
      await transporter.sendMail(regEmail(email, userUUID))
      res.json(`User ${name} was succesfully created!`)
    } else {
      res.status(400).send({ error: `User with an email: "${user.email}" already exists!` })
    }
  } catch (e) {
    console.log('error', e)
  }
})

router.get('/activation/:uuid', async (req, res) => {
  try {
    const user = await db.Users.findOne({ where: { userUUID: req.params.uuid } })

    if (user) {
      await user.activate()
      await user.save()
      res.redirect(`${BASE_FRONTEND_URL}/login?activation=successfull`)
    }
  } catch (e) {
    console.log(e)
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const candidate = await db.Users.findOne({ where: { email } })

    if (candidate) {
      const passwordIsValid = await bcrypt.compare(password, candidate.password)
      const { activated } = candidate

      if (!activated) {
        return res.status(403).json('You have to activate your account first!')
      }

      if (passwordIsValid) {
        const user = { userId: candidate.id }

        const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '1m' })
        const refreshToken = jwt.sign(user, REFRESH_TOKEN_SECRET, { expiresIn: '3h' })

        res.cookie('refreshToken', refreshToken, { maxAge: 60 * 1000 * 60 * 3, httpOnly: true })
        res.json({ accessToken })
      } else {
        res.status(403).json('Password is wrong!')
      }
    } else {
      res.status(403).json('There are no users with these credentials!')
    }
  } catch (e) {
    console.log('error', e)
  }
})

router.get('/refreshToken', (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) return res.sendStatus(401)

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        console.log('Verify token error acquired: ', err)
        return res.sendStatus(403)
      }

      const currentUser = { userId: user.userId }

      const accessToken = jwt.sign(currentUser, ACCESS_TOKEN_SECRET, { expiresIn: '1m' })
      const refreshToken = jwt.sign(currentUser, REFRESH_TOKEN_SECRET, { expiresIn: '3h' })

      res.cookie('refreshToken', refreshToken, { maxAge: 60 * 1000 * 60 * 3, httpOnly: true })
      res.json({ accessToken })
    })
  } catch (e) {
    console.log('error', e)
  }
})

router.delete('/logout', (req, res) => {
  res.cookie('refreshToken', null, { maxAge: 0 })
  res.sendStatus(204)
})

module.exports = router
