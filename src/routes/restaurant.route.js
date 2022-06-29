const express = require('express');
const restaurantValidation = require('../validations/restaurant.validation');
const restaurantController = require('../controllers/restaurant.controller');

const router = express.Router();

/*
Discovery
*/
router.get('/nearby/:radius', restaurantController.nearby);
router.get('/all/:name', restaurantController.getByName);
router.get('/all',  restaurantController.all);
router.get('/nearby/rating/:radius', restaurantController.nearbyRating);
/*
ratings
*/
router.post('/new_rating', restaurantController.new_rating);
router.patch('/update_rating/:id', restaurantController.update_rating);
// router.get('/avg_rating', validate(restaurantValidation.all), restaurantController.all);

module.exports = router;