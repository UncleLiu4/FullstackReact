const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    name: String,
    // username: String,
    username: {
        type: String,
        minlength: 3,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 3,
        required: true
    },
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
		delete returnedObject.password
	}
})

const User = mongoose.model('User', userSchema)

module.exports = User
