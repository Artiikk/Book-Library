const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Books = sequelize.define('Books', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER
    },
    wasRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })

  Books.associate = function(models) {
    Books.belongsToMany(models.Users, { through: models.Libraries })
  }

  return Books
}