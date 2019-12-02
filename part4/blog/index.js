const app = require('./app') // the actual Express app
const http = require('http')
const config = require('./utils/config')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})

// const http = require('http')
// const express = require('express')
// const app = express()
// const bodyParser = require('body-parser')
// const cors = require('cors')
// const mongoose = require('mongoose')
// const config = require('./utils/config')
// const Blog = require('./models/blog')
//
// console.log('connecting to ', config.MONGODB_URI)
// mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('connected to MongoDB'))
//     .catch(error => console.log(`error connection to MongoDB ${error.message}`))
//
// app.use(cors())
// app.use(bodyParser.json())
//
// app.get('/api/blogs', (request, response) => {
//   console.log('api blogs method')
//   Blog
//     .find({})
//     .then(blogs => {
//       response.json(blogs)
//     })
// })
//
// app.post('/api/blogs', (request, response) => {
//   const blog = new Blog(request.body)
//
//   blog
//     .save()
//     .then(result => {
//       response.status(201).json(result)
//     })
// })
//
// const PORT = 3003
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })
