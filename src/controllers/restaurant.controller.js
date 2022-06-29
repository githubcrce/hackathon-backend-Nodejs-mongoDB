const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { restaurantService } = require('../services');
const { Restaurant } = require('../model');
const config = require('../config/config');
const nearby = catchAsync(async (req, res) => {
    res.send("Okay nearby");
});

const nearbyRating = catchAsync(async (req, res) => {
    res.send("Okay rating")
});

const getByName = catchAsync(async (req, res) => {
    const restaurant = await restaurantService.getRestaurantByName(req.params.name);
    if (!restaurant) {
        throw new Error('Restaurants not found');
    }
    res.send(restaurant);
});

const all = catchAsync(async (req, res) => {
    const restaurant = await restaurantService.getAllRestaurants();
    if (!restaurant) {
        throw new Error('Restaurants not found');
    }
    res.send(restaurant);
});

const new_rating = catchAsync(async (req, res) => {
    const restaurant = await restaurantService.createRestaurant(req.body);
    res.status(httpStatus.CREATED).send(restaurant);
});

const update_rating = catchAsync(async (req, res) => {
    console.log(req.params);
    const restaurant = await restaurantService.updateRating(req.params.id, req.body);
    res.status(httpStatus.OK).send(restaurant);
});

module.exports = {
    nearby,
    new_rating,
    update_rating,
    all,
    getByName,
    nearbyRating,
}