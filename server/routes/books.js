const { Router } = require('express')
const { Books, Libraries } = require('../models/index')
const router = Router()
const { authenticateToken } = require('../middleware/authToken')
const Users = require('../models/users')
const db = require('../models')

// const users = [
//   { username: 'Art', title: 'Post 1' },
//   { username: 'Jim', title: 'Post 2' }
// ]

// router.get('/', authenticateToken, async (req, res) => {
//   try {
//     // const books = await Book.findAll()
//     res.json(users.filter(user => user.username === req.user.name))
//   } catch (e) {
//     console.log(e)
//     res.status(500).json({
//       message: 'Server error'
//     })
//   }
// })

router.get('/', authenticateToken, async (req, res) => {
  try {
    // const books = await Book.findAll()
    // res.json(users.filter(user => user.username === req.user.name))

    const books = await db.Books.findAll({
      include: [
        {
          model: db.Users,
          through: db.Libraries
        }
      ]
    })

    // const libraries = await Libraries.findAll()

    // res.json(books)
    console.log('books', books)

  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Server error'
    })
  }
})

router.post('/', authenticateToken, async (req, res) => {
  const { body: { title, author }, user: { userId } } = req

  try {
    const book = await Books.create({
      title,
      author,
      wasRead: false
    })

    await Libraries.create({ UserId: userId, BookId: book.id })

    res.status(201).json({ book })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Sever error'
    })
  }
})

router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { params, body } = req
    const book = await Books.findByPk(Number(params.id))
    book.wasRead = body.wasRead

    await book.save()
    res.json({ book })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Sever error'
    })
  }
})

router.delete('/:id', authenticateToken, async (req, res) => {
  const { params } = req
  try {
    // const book = Book.findAll({
    //   where: { id: Number(params.id) }
    // })

    const book = await Books.findByPk(Number(params.id))

    book.destroy()
    res.status(204).json(`Was destroyed successfully`)
  } catch (e) {
    console.log('e', e)
    res.status(500).json({
      message: 'Sever error'
    })
  }
})

module.exports = router
