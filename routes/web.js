const router = require('express').Router(),
  config = require('config'),
  validUrl = require('valid-url'),
  shortid = require('shortid'),
  Url = require('../models/Url')

router.route('/')
  .get(async (req, res) => {
    res.render('index', { url: null })
  })

  .post(async (req, res) => {
    if (validUrl.isUri(req.body.longUrl)) {
      try {
        const url = await Url.findOne({ longUrl: req.body.longUrl })
        if (url) {
          res.render('index', { url })
        } else {
          const shortenedUrl = `${config.get('base_url')}/url/${shortid.generate()}`
          const url = new Url({ longUrl: req.body.longUrl, shortenedUrl })
          await url.save()
          res.render('index', { url })
        }
      } catch (err) {
        res.status(504).json({
          status: 504,
          message: err,
          value: {
            longUrl: req.body.longUrl,
            shortenedUrl: null
          }
        })
      }
    } else {
      res.status(501).json({
        status: 501,
        message: 'Invalid url format!',
        value: {
          longUrl: req.body.longUrl,
          shortenedUrl: null
        }
      })
    }
  })

router.get('/urls', async (req, res) => {
  const urls = await Url.find().sort({ createdAt: 'desc' })
  if (urls) {
    res.status(200).json(
      {
        status: 200,
        message: 'Successfully retrieve urls!',
        value: {
          urls: urls
        }
      }
    )
  }
})

router.route('/url/:url')
  .get(async (req, res) => {
    const shortenedUrl = `${config.get('base_url')}/url/${req.params.url}`
    const url = await Url.findOne({ shortenedUrl })

    if (url) {
      res.redirect(url.longUrl)
    } else {
      res.status(401).json({
        status: 401,
        message: 'Sorry, The given url is unknown!',
      })
    }
  })

module.exports = router