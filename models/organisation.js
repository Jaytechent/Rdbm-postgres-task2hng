const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Organisation extends Model {}

Organisation.init({
  orgId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  }
}, {
  sequelize,
  modelName: 'Organisation',
  tableName: 'Organisations', // Set the table name explicitly to match the plural form
});

module.exports = Organisation;
