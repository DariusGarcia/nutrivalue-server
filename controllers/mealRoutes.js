const mealRouter = require('express').Router()
const { Meal } = require('../models')

// READ all meals
mealRouter.get('/', async (req, res) => {
  try {
    const meals = await Meal.findAll()
    res.status(200).json(meals)
  } catch (err) {
    res.status(500).json(err)
  }
})

// CREATE new meal
mealRouter.post('/', async (req, res) => {
  const { mealName, protein, carbs, fats, calories } = req.body
  try {
    const newMeal = await Meal.create({
      mealName: mealName,
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
  const { mealName, proteins, carbs, fats, calories } = req.body
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

// DELETE a meal
mealRouter.delete('/:id', async (req, res) => {
  const mealId = req.params.id
  try {
    const deletedMeal = await Meal.destroy({
      where: {
        id: mealId,
      },
    })

    if (deletedMeal === 0) {
      res.status(404).json({ message: 'Meal not found' })
    } else {
      res.status(200).json({ message: 'Meal deleted successfully' })
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = mealRouter
