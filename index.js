const express = require('express'),
  config = require('config'),
  createDatabase = require('./config/database'),
  apiRouter = require('./routes/api'),
  webRouter = require('./routes/web'),
  app = express()

createDatabase()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use('/', webRouter)
app.use('/api', apiRouter)

app.listen(config.get('PORT'), () => console.log(`Server running on port: ${config.get('PORT')}`))
