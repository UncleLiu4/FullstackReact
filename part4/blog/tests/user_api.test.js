const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const User = require('../models/user')

describe('when there is initially one user at db', () => {
	// beforeEach(async () => {
	// 	await User.deleteMany({})
	// 	const user = new User({
	// 		username: 'root',
	// 		name: 'root',
	// 		password: '123456'
	// 	})
	// 	await user.save()
	// })

	test('get all users', async () => {
		const response = await api.get('/api/users')
		expect(response.body.length).toBe(2)
	})

	test('before any user is added', async () => {
		const response = await api.get('/api/users')
		expect(response.body.length).toBe(0)
	})

	test('validation error', async () => {
		const newUser = {
			username: 'UL',
			name: 'UL',
			password: 'fullstack',
		}
		await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)
	})

	test('creation succeeds with a fresh username', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'UncleLiu',
			name: 'Uncle Liu',
			password: 'fullstack',
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

		const usernames = usersAtEnd.map(u => u.username)
		expect(usernames).toContain(newUser.username)
	})

	test('creation fails with proper statuscode and message if username already taken', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'root',
			name: 'Superuser',
			password: 'salainen',
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('`username` to be unique')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd.length).toBe(usersAtStart.length)
	})
})

afterAll(() => {
	mongoose.connection.close()
})
