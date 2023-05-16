const foodSearchRouter = require('express').Router()
const { User } = require('../models')
const jwt = require('jsonwebtoken')

const APP_ID = process.env.APP_ID
const API_KEY = process.env.API_KEY
const FOOD_BASE_URL = process.env.FOOD_SEARCH_BASE_URL

// POST a search for a food item
foodSearchRouter.post('/search', async (req, res) => {
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
    const { ingr, nutritionType, category } = req.body
    const url = `${FOOD_BASE_URL}app_id=${APP_ID}&app_key=${API_KEY}&ingr=${encodeURIComponent(
      ingr
    )}&nutrition-type=${encodeURIComponent(
      nutritionType
    )}&category=${encodeURIComponent(category)}`

    const response = await fetch(url)
    const data = await response.json()

    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'An error occurred' })
  }
})

module.exports = foodSearchRouter
