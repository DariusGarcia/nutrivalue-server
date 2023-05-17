const User = require('./userModel')
const Meal = require('./mealModel')
const Recipe = require('./recipesModel')

User.hasMany(Meal, {
  foreignKey: 'userId',
})

Meal.belongsTo(User, {
  foreignKey: 'userId',
})
User.hasMany(Recipe, {
  foreignKey: 'userId',
})

Recipe.belongsTo(User, {
  foreignKey: 'userId',
})

module.exports = { User, Meal, Recipe }
