const express = require('express');
const { addLike, disLike } = require('../controller/voteController');
const logger = require('../logger/index');
const { verifyToken } = require('../util/jwt');

const voteRouter = express.Router();

voteRouter.put('/upvote/:id', verifyToken, addLike);

voteRouter.put('/downvote/:id', verifyToken, disLike);

module.exports = {
	voteRouter,
};
