const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.json( users.map( u => u.toJSON() ) )
})

userRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body
        const { name, username, password } = body

        if(username.length <= 3 || password.length <= 3) {
            return response.status(400).json({
				error: 'ValidationError'
			})
        }

        const salt = bcrypt.genSaltSync(10)
		const passwordHash = bcrypt.hashSync(body.password, salt)

        const user = new User({
            name: body.name,
            username: body.username,
            password: passwordHash,
        })

        const savedUser = await user.save()
        response.json(savedUser)
    } catch(exception) {
        next(exception)
    }
})

module.exports = userRouter
