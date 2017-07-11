'use strict'

const jsonParser = require('body-parser').json()

const Router = require('express').Router
const router = new Router()
const venueController = require('../controllers/venue-controller.js')


const PAGE_LENGTH = 20

// index route
router.get('/api/venues', (req, res, next) => {
  venueController.index(PAGE_LENGTH, req.query.page)
    .then(page => res.json(page))
    .catch(err => next(err))
})

// create
router.post('/api/venues', jsonParser, (req, res, next) => {
  venueController.create(req.body)
    .then(venue => res.status(201).json(venue))
    .catch(err => next(err))
})

// read
router.get('/api/venues/:id', (req, res, next) => {
  venueController.read(req.params.id)
    .then(venue => res.status(200).json(venue))
    .catch(err => next(err))
})

// update
router.put('/api/venues/:id', jsonParser, (req, res, next) => {
  venueController.update(req.params.id, req.body)
    .then(venue => res.status(200).json(venue))
    .catch(err => next(err))
})

// destroy
router.delete('/api/venues/:id', (req, res, next) => {
  venueController.destroy(req.params.id)
    .then(() => res.status(204).send())
    .catch(err => next(err))
})

module.exports = router
