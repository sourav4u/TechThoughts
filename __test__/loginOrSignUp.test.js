/* eslint-disable no-undef */

// eslint-disable-next-line import/no-extraneous-dependencies
const request = require('supertest');
const mongoose = require('mongoose');
const { app } = require('../src/app');
const { redisConnect, redisDisconnect } = require('../src/util/redis');

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

describe('Test For Login OR SIGN UP A USER A user', () => {
	test('Should Logged a User', (done) => {
		request(app)
			.post('/auth/login')
			.send({ email: 's@gmail.com', password: 'vashisht@123' })
			.set('Content-Type', 'application/json')
			.then((response) => {
				expect(response.statusCode).toBe(200);
				done();
			});
	});
	test('Should Throw An error about nOT PROVIDING Email', (done) => {
		request(app)
			.post('/auth/login')
			.send({ password: 'vashisht@123' })
			.set('Content-Type', 'application/json')
			.then((response) => {
				expect(response.statusCode).toBe(400);
				done();
			});
	});
	test('Should Throw An error about not PROVIDING Password', (done) => {
		request(app)
			.post('/auth/login')
			.send({ email: 's@gmail.com' })
			.set('Content-Type', 'application/json')
			.then((response) => {
				expect(response.statusCode).toBe(400);
				done();
			});
	});
	test('Should Sign UP  a User', (done) => {
		request(app)
			.post('/auth/signup/')
			.send({
				email: 's@gmail.com',
				password: 'vashisht@123',
				username: 'pardeep kumar g',
			})
			.set('Content-Type', 'application/json')
			.then((response) => {
				expect(response.statusCode).toBe(201);
				done();
			});
	});
	test('Should Throw En Error For Not sending  EMAIL', (done) => {
		request(app)
			.post('/auth/signup/')
			.send({
				// email: 's@gmail.com',
				password: 'vashisht@123',
				username: 'pardeep kumar g',
			})
			.set('Content-Type', 'application/json')
			.then((response) => {
				expect(response.statusCode).toBe(400);
				done();
			});
	});
	test('Should Throw En Error For Not sending  Password', (done) => {
		request(app)
			.post('/auth/signup/')
			.send({
				email: 's@gmail.com',
				//	password: 'vashisht@123',
				username: 'pardeep kumar g',
			})
			.set('Content-Type', 'application/json')
			.then((response) => {
				expect(response.statusCode).toBe(400);
				done();
			});
	});
	test('Should Throw En Error For Not sending  Username', (done) => {
		request(app)
			.post('/auth/signup/')
			.send({
				email: 's@gmail.com',
				password: 'vashisht@123',
				// username: 'pardeep kumar g',
			})
			.set('Content-Type', 'application/json')
			.then((response) => {
				expect(response.statusCode).toBe(400);
				done();
			});
	});
});
