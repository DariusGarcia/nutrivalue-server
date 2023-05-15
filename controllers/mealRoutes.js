const mealRouter = require('express').Router()
const { Meal, User } = require('../models')
const jwt = require('jsonwebtoken')
// READ all meals
mealRouter.get('/', async (req, res) => {
  const token = req.headers.authorization // Assuming the token is provided in the Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Missing token' })
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
  const userId = decodedToken.id
  const user = await User.findByPk(userId) // Retrieve the user instance by their ID
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }
  try {
    const meals = await Meal.findAll({ where: { userId: userId } })
    res.status(200).json(meals)
  } catch (err) {
    res.status(500).json(err)
  }
})

// CREATE new meal
mealRouter.post('/', async (req, res) => {
  const { mealName, protein, carbs, fats, calories, category } = req.body
  const token = req.headers.authorization // Assuming the token is provided in the Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Missing token' })
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
  const userId = decodedToken.id
  const user = await User.findByPk(userId) // Retrieve the user instance by their ID
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }
  try {
    const newMeal = await user.createMeal({
      mealName: mealName,
      category: category,
      protein: protein,
      carbs: carbs,
      fats: fats,
      calories: calories,
    })

    res.status(200).json(newMeal)
  } catch (err) {
    res.status(500).json(err)
  }
})

// UPDATE a meal
mealRouter.put('/:id', async (req, res) => {
  const token = req.headers.authorization // Assuming the token is provided in the Authorization header
  if (!token) {
    return res.status(401).json({ message: 'Missing token' })
  }

  const { mealName, proteins, carbs, fats, calories } = req.body

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
  const userId = decodedToken.id
  const user = await User.findByPk(userId) // Retrieve the user instance by their ID
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }
  const mealId = req.params.id
  try {
    const updatedMeal = await Meal.update(
      {
        mealName: mealName,
        proteins: proteins,
        carbs: carbs,
        fats: fats,
        calories: calories,
      },
      {
        where: {
          id: mealId,
        },
      }
    )

    if (updatedMeal[0] === 0) {
      res.status(404).json({ message: 'Meal not found' })
    } else {
      res.status(200).json({ message: 'Meal updated successfully' })
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

// DELETE multiple meals
mealRouter.delete('/', async (req, res) => {
  const mealIds = req.body.mealIds

  try {
    const deletedMeals = await Meal.destroy({
      where: {
        id: mealIds,
      },
    })

    if (deletedMeals === 0) {
      res.status(404).json({ message: 'Meals not found' })
    } else {
      res.status(200).json({ message: 'Meals deleted successfully' })
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = mealRouter
