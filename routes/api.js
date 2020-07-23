const router = require('express').Router()

router.get('/', (req, res) => res.status(200).json({
  status: 200,
  msg: 'Hello, there!'
}))

module.exports = router
