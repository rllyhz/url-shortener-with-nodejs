const mongoose = require('mongoose')

const createDatabase = () => {
  /* MONGOOSE CONNECTION */
  mongoose.connect('mongodb://localhost/url_shortener_app', { useNewUrlParser: true, useUnifiedTopology: true })
  mongoose.set('useCreateIndex', true)
}

module.exports = createDatabase