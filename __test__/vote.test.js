/* eslint-disable no-undef */

// eslint-disable-next-line import/no-extraneous-dependencies
const request = require('supertest');
const mongoose = require('mongoose');
const { app } = require('../src/app');
const { redisConnect, redisDisconnect } = require('../src/util/redis');
const logger = require('../src/logger');

const image = `${__dirname}/../mern-stack.png`;
require('dotenv').config();

beforeAll(async () => {
	mongoose.set('strictQuery', true);
	await mongoose.connect(process.env.MONGODB);
	await redisConnect();
});

afterAll(async () => {
	await mongoose.disconnect();
	await redisDisconnect();
});

describe('Test For LIKE and DISLIKE', () => {
	test('SHOULD LIKE IF USER IS AUTHENTICATED', (done) => {
		request(app)
			.put('/vote/upvote/63cd0868d74f774faca1e036')
			.set('Authorization', `bearer ${process.env.JWT_TOKEN_FOR_TESTING}`)
			.then((response) => {
				expect(response.statusCode).toBe(201);
				done();
			});
	});

	test('SHOULD DISLIKE IF USER IS AUTHENTICATED', (done) => {
		request(app)
			.put('/vote/downvote/63cd0868d74f774faca1e036')
			.set('Authorization', `bearer ${process.env.JWT_TOKEN_FOR_TESTING}`)
			.then((response) => {
				expect(response.statusCode).toBe(201);
				done();
			});
	});

	test('SHOULD THROW EN ERROR FOR NOT AUTHENTICATED', (done) => {
		request(app)
			.put('/vote/downvote/63cd0868d74f774faca1e036')
			.set('Authorization', 'bearer ')
			.then((response) => {
				expect(response.statusCode).toBe(401);
				done();
			});
	});
});
