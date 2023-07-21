const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home')

router.get('/', homeController.getHomepage);
router.get('/getMeteorite', homeController.getMeteoriteInfo)

module.exports = router;