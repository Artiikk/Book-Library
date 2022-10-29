const { DataTypes } = require('sequelize')

module.exports = function (sequelize) {
  const Users = sequelize.define('Users', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER
    },
    userUUID: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    activated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  })

  Users.associate = function(models) {
    Users.belongsToMany(models.Books, { through: models.Libraries })
  }

  Users.prototype.activate = function() {
    this.activated = true
    return this.save()
  }

  return Users
}


// User.belongsToMany(Book, { through: 'foo_bar', sourceKey: 'name', targetKey: 'title' })
