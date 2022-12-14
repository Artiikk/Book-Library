require('dotenv').config()

const EMAIL_FROM = process.env.EMAIL_FROM
const BASE_URL = process.env.BASE_URL

module.exports = function(email, userId) {
  return {
    to: email,
    from: EMAIL_FROM,
    subject: 'Book library activation',
    html: `
      <h1>Welcome to our Book library</h1>
      <p>You have to activate your account first</p>
      <a href='${BASE_URL}/api/auth/activation/${userId}' target='_blank'>Activate</a>
      <hr />
      <p>Visit our <a href='${BASE_URL}'>BOOK LIBRARY</a></p>
    `
  }
}
