const express = require('express');
const logger = require('../logger/index');

const { getHome } = require('../controller/homeController');
const { redisCache } = require('../util/redis');

const homeRouter = express.Router();

homeRouter.get('/', redisCache, getHome);

module.exports = {
	homeRouter,
};
