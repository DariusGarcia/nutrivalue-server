const User = require('./userModel')
const Meal = require('./mealModel')

User.hasMany(Meal, {
  foreignKey: 'userId',
})

Meal.belongsTo(User, {
  foreignKey: 'userId',
})

module.exports = { User, Meal }
