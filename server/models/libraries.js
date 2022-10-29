const { DataTypes } = require('sequelize')
const db = require('./index')

module.exports = function (sequelize) {
  const Libraries = sequelize.define('Libraries', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    BookId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Books',
        key: 'id'
      }
    }
  })

  return Libraries
}

// with belongsToMany will result in:

// CREATE TABLE IF NOT EXISTS "ActorMovies" (
  // "userId" INTEGER NOT NULL REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  // "bookId" INTEGER NOT NULL REFERENCES "Book" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  // "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  // "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  // UNIQUE ("MovieId", "ActorId"),     -- Note: Sequelize generated this UNIQUE constraint but
  // PRIMARY KEY ("MovieId","ActorId")  -- it is irrelevant since it's also a PRIMARY KEY
// );