const recipeRouter = require('express').Router()
const { Recipe, User } = require('../models')
const jwt = require('jsonwebtoken')

// READ all meals
recipeRouter.get('/', async (req, res) => {
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
    const recipes = await Recipe.findAll({ where: { userId: userId } })
    res.status(200).json(recipes)
  } catch (err) {
    res.status(500).json(err)
  }
})

// CREATE new meal
recipeRouter.post('/', async (req, res) => {
  const { image, label, protein, carbs, fats, calories, category } = req.body
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
    const newRecipe = await user.createRecipe({
      label: label,
      category: category,
      protein: protein,
      carbs: carbs,
      fats: fats,
      calories: calories,
      image: image,
    })

    res.status(200).json(newRecipe)
  } catch (err) {
    res.status(500).json(err)
  }
})

// UPDATE a meal
recipeRouter.put('/:id', async (req, res) => {
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
  const recipeId = req.params.id
  try {
    const updatedRecipe = await Recipe.update(
      {
        image: image,
        label: label,
        category: category,
        mealName: mealName,
        proteins: proteins,
        carbs: carbs,
        fats: fats,
        calories: calories,
      },
      {
        where: {
          id: recipeId,
        },
      }
    )

    if (updatedRecipe[0] === 0) {
      res.status(404).json({ message: 'Recipe not found' })
    } else {
      res.status(200).json({ message: 'Recipe updated successfully' })
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

// DELETE multiple meals
recipeRouter.delete('/', async (req, res) => {
  const recipeIds = req.body.recipeIds

  try {
    const deletedRecipes = await Recipe.destroy({
      where: {
        id: recipeIds,
      },
    })

    if (deletedRecipes === 0) {
      res.status(404).json({ message: 'Recipes not found' })
    } else {
      res.status(200).json({ message: 'Recipes deleted successfully' })
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = recipeRouter
