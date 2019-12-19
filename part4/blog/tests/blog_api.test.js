const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
// const helper = require('./test_helper')
const Blog = require('../models/blog')

// const initialNotes = [{
// 		content: 'HTML is easy',
// 		date: new Date(),
// 		important: false,
// 	},
// 	{
// 		content: 'Browser can execute only Javascript',
// 		date: new Date(),
// 		important: true,
// 	},
// ]

// beforeEach(async () => {
// 	await Note.deleteMany({})
//
// 	let noteObject = new Note(helper.initialNotes[0])
// 	await noteObject.save()
//
// 	// noteObject = new Note(initialNotes[1])
// 	noteObject = new Note(helper.initialNotes[1])
// 	await noteObject.save()
// })

test('a valid blog can be added ', async () => {
	const newBlog = {
		title: 'Add a blog from test',
	    author: 'Uncle Liu',
	    url: 'https://z.cn',
	    likes: 3000
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	// const notesAtEnd = await helper.notesInDb()
	// expect(notesAtEnd.length).toBe(helper.initialNotes.length + 1)
	//
	// const contents = notesAtEnd.map(n => n.content)
	// expect(contents).toContain(
	// 	'async/await simplifies making async calls'
	// )
})

test('all notes are returned', async () => {
	const response = await api.get('/api/blogs')
	// expect(response.body.length).toBe(initialNotes.length)
	expect(response.body.length).toBe(1)
})

afterAll(() => mongoose.disconnect());

// test('a specific note is within the returned notes', async () => {
// 	const response = await api.get('/api/notes')
//
// 	const contents = response.body.map(r => r.content)
//
// 	expect(contents).toContain(
// 		'Browser can execute only Javascript'
// 	)
// })
//
// test('note without content is not added', async () => {
// 	const newNote = {
// 		important: true
// 	}
//
// 	await api
// 		.post('/api/notes')
// 		.send(newNote)
// 		.expect(400)
//
// 	const notesAtEnd = await helper.notesInDb()
//
// 	expect(notesAtEnd.length).toBe(helper.initialNotes.length)
// })
//
// test('a specific note can be viewed', async () => {
// 	const notesAtStart = await helper.notesInDb()
//
// 	const noteToView = notesAtStart[0]
//
// 	const resultNote = await api
// 		.get(`/api/notes/${noteToView.id}`)
// 		.expect(200)
// 		.expect('Content-Type', /application\/json/)
//
// 	expect(resultNote.body).toEqual(noteToView)
// })
//
// test('a note can be deleted', async () => {
// 	const notesAtStart = await helper.notesInDb()
// 	const noteToDelete = notesAtStart[0]
//
// 	await api
// 		.delete(`/api/notes/${noteToDelete.id}`)
// 		.expect(204)
//
// 	const notesAtEnd = await helper.notesInDb()
//
// 	expect(notesAtEnd.length).toBe(
// 		helper.initialNotes.length - 1
// 	)
//
// 	const contents = notesAtEnd.map(r => r.content)
//
// 	expect(contents).not.toContain(noteToDelete.content)
// })
