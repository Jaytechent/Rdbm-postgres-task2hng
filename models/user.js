




const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {}

User.init({
  userId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
phone: {
  type: DataTypes.STRING,
  allowNull: false},
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'Users', // Ensure this matches your actual table name in PostgreSQL
  timestamps: true,
  underscored: false // Optional: Use underscored naming for columns
});

module.exports = User;




// models/user.js
// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/database');

// class User extends Model {}

// User.init({
//   userId: {
//     type: DataTypes.STRING,
//     unique: true,
//     allowNull: false
//   },
//   firstName: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   lastName: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   email: {
//     type: DataTypes.STRING,
//     unique: true,
//     allowNull: false
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   phone: {
//     type: DataTypes.STRING,
//   }
// }, {
//   sequelize,
//   modelName: 'User'
// });

// module.exports = User;
