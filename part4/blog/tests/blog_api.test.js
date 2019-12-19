const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

describe('when there is initially some blogs saved', () => {
	// beforeEach(async () => {
	// 	await Blog.deleteMany({})
	//
	// 	const noteObjects = helper.initialBlogs
	// 		.map(note => new Blog(note))
	// 	const promiseArray = noteObjects.map(note => note.save())
	// 	await Promise.all(promiseArray)
	// })

	test('blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('all blogs are returned', async () => {
		const response = await api.get('/api/blogs')

		expect(response.body.length).toBe(1)
	})

	test('a specific blog is within the returned blogs', async () => {
		const response = await api.get('/api/blogs')

		const contents = response.body.map(r => r.content)
		expect(contents).toContain(
			'Browser can execute only Javascript'
		)
	})

	test('get a blog by id', async () => {
		const blog = await Blog.findById( '5dfb116593f6b82ff8b6d5df' )
		const contents = blog.likes
		expect(contents).toBe(10)
	})

	describe('viewing a specifin blog', () => {

		test('succeeds with a valid id', async () => {
			const blogsAtStart = await helper.blogsInDb()

			const noteToView = blogsAtStart[0]

			const resultBlog = await api
				.get(`/api/blogs/${noteToView.id}`)
				.expect(200)
				.expect('Content-Type', /application\/json/)

			expect(resultBlog.body).toEqual(noteToView)
		})

		test('fails with statuscode 404 if note does not exist', async () => {
			const validNonexistingId = await helper.nonExistingId()

			await api
				.get(`/api/blogs/${validNonexistingId}`)
				.expect(404)
		})

		test('fails with statuscode 400 id is invalid invalid', async () => {
			const invalidId = '5a3d5da59070081a82a3445'

			await api
				.get(`/api/blogs/${invalidId}`)
				.expect(400)
		})
	})

	describe('addition of a new blog', () => {
		test('succeeds with valid data', async () => {
			// const newBlog = new Blog({
		    //     title: 'another user blog',
		    //     author: 'another user',
		    //     url: 'https://.z.cn',
		    //     likes: 1,
			// 	userId: '5dfb08585f3ac757147d2012',
		    // })

			const o = {
		        title: 'UncleLiu\'s blog',
		        author: 'UncleLiu',
		        url: 'https://www.example.com',
		        likes: 1,
				userId: '5dfac75d338c50053009acb3',
		    }

			await api
				.post('/api/blogs')
				.send(o)
				.expect(200)
				.expect('Content-Type', /application\/json/)


			const blogsAtEnd = await helper.blogsInDb()
			expect(blogsAtEnd.length).toBe(4)

			const contents = blogsAtEnd.map(n => n.author)
			expect(contents).toContain(
				'UncleLiu'
			)
		})

		test('fails with status code 400 if data invaild', async () => {
			const newBlog = {
				important: true
			}

			await api
				.post('/api/blogs')
				.send(newBlog)
				.expect(400)

			const blogsAtEnd = await helper.blogsInDb()

			expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
		})
	})

	describe('deletion of a blog', () => {
		test('succeeds with status code 200 if id is valid', async () => {
			const blogsAtStart = await helper.blogsInDb()
			const noteToDelete = blogsAtStart[0]

			await api
				.delete(`/api/blogs/${noteToDelete.id}`)
				.expect(204)

			const blogsAtEnd = await helper.blogsInDb()

			expect(blogsAtEnd.length).toBe(
				helper.initialBlogs.length - 1
			)

			const contents = blogsAtEnd.map(r => r.content)

			expect(contents).not.toContain(noteToDelete.content)
		})

		test('delete a blog failed with 401', async () => {
			// const blogsAtStart = await helper.blogsInDb()
			const blogIdToDelete = 3
			await api
				.delete(`/api/blogs/${blogIdToDelete}`)
				.expect(401)

			// const blogsAtEnd = await helper.blogsInDb()
			// expect(blogsAtEnd.length).toBe(
			// 	helper.initialBlogs.length - 1
			// )
			// const contents = blogsAtEnd.map(r => r.content)
			// expect(contents).not.toContain(noteToDelete.content)
		})
	})
})

afterAll(() => {
	mongoose.connection.close()
})
