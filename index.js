const dotenv = require('dotenv')
dotenv.config({ path: './.env.local' })
const cors = require('cors')
const express = require('express')
const path = require('path')
const session = require('express-session')
// const limiter = require('./middleware/rateLimiter')
const routes = require('./controllers')
const sequelize = require('./config/connection')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const app = express()

app.use(
  cors({
    origin: process.env.ORIGIN_URL,
  })
)

const PORT = Number(process.env.PORT) || 4002

process.on('uncaughtException', (err) => {
  console.error(err)
  console.log('\nNode NOT Exiting...')
})

// express session options
const sess = {
  secret: '74vLqUS50mP4FNlPzfqd42IBnoL34823',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({ db: sequelize }),
}

app.use(session(sess))

//  the IP address of the request might be the IP of the load balancer/reverse proxy (making the rate limiter effectively a global one and blocking all requests once the limit is reached) or undefined
// app.set('trust proxy', 1)

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// prettier-ignore
app.use((req, res, next) => {
  console.log(req.path, req.method)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept')
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, OPTIONS')
  next()
})

// Apply the rate limiting middleware to all api requests
// app.use('/api/stocks', limiter)
// app.use('/api/watchlist', limiter)

// routes
app.use(routes)

// connect to db
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(
      `🚀 ~ Now listening on port ${PORT}\n-------------------------------\n`
    )
  )
})

module.exports = app
