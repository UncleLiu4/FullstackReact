const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs.map( blog => blog.toJSON() ))
})

blogRouter.post('/', async (request, response) => {
    // const user = await User.findOne({  })
    const { title, author, url, likes, userId } = request.body
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
})

module.exports = blogRouter
