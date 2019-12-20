const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs.map( blog => blog.toJSON() ))
})

blogRouter.post('/', async (request, response, next) => {
    const body = request.body
    // const token = getTokenFrom(request)
    const token = request.token

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
		if (!token || !decodedToken.id) {
			return response.status(401).json({
				error: 'token missing or invalid'
			})
		}
        const { title, author, url, likes, } = body
        const userId = decodedToken.id        

        const user = await User.findById(userId)
        const blog = new Blog({
            title,
            author,
            url,
            likes,
            user: user._id,
        })

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.json(savedBlog.toJSON())

    } catch(exception) {
        next(exception)
    }
})

blogRouter.delete('/:id', async (request, response, next) => {
    const token = request.token
    const blogIdToDelete = request.params.id
	try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
		if (!token || !decodedToken.id) {
			return response.status(401).json({
				error: 'token missing or invalid'
			})
		}
        const userIdFromToken = decodedToken.id
        const blog = await Blog.findById( blogIdToDelete )

        if(blog.user.toString() === userIdFromToken.toString()) {
            console.log('相等')
            await Blog.findByIdAndRemove(blogIdToDelete)
    		response.status(204).end()
        } else {
            console.log('不相等')
    		response.status(401).end()
        }
	} catch (exception) {
		next(exception)
	}
})

module.exports = blogRouter
