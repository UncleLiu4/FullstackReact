const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
	{
		content: 'HTML is easy',
		important: false
	},
	{
		content: 'Browser can execute only Javascript',
		important: true
	}
]

// const nonExistingId = async () => {
// 	const note = new Note({
// 		content: 'willremovethissoon'
// 	})
// 	await note.save()
// 	await note.remove()
//
// 	return note._id.toString()
// }

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
	const users = await User.find({})
	return users.map(u => u.toJSON())
}

module.exports = {
	// initialNotes,
	// nonExistingId,
	blogsInDb,
	usersInDb,
}
