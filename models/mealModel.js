const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection.js')

class Meal extends Model {}

Meal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    mealName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    calories: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    carbs: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    protein: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    fats: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true,
    underscored: true,
    modelName: 'meal',
  }
)

module.exports = Meal
