const express = require('express');
const ctrl = require('../controllers/shows')

const router = express.Router();


// template routes
router.get('/', ctrl.get)
router.post('/:id/', ctrl.play)
router.get('/stream/:id/', ctrl.stream)


module.exports = router;
