require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./model/person')

const app = express()
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(cors())
app.use(morgan(function (tokens, req, res) {  
  return [    
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))

// let persons = [
//     {
//       "name": "Arto Hellas",
//       "number": "040-123456",
//       "id": 1
//     },
//     {
//       "name": "Ada Lovelace",
//       "number": "39-44-5323523",
//       "id": 2
//     },
//     {
//       "name": "Dan Abramov",
//       "number": "12-43-234345",
//       "id": 3
//     },
//     {
//       "name": "Mary Poppendieck",
//       "number": "39-23-6423122",
//       "id": 4
//     }
//   ]

app.get('/', (request, response) => {
    response.send('<p>welcome</p>')
})

app.get('/info', (request, response, next) => {
    Person
      .count({})
      .then(c => response.send(`<p>Phone has info for ${c} people</p><p>${new Date()}</p>`))
      .catch(error => next(error))
})

app.get('/api/persons', (request, response) => {
    // response.json(persons)
    Person.find({}).then(persons => {
      response.json(persons.map(person => person.toJSON()))
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
      .then(person => {        
        if (person) {
          response.json(person.toJSON())
        } else {
          response.status(404).end() 
        }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
      .then(result => {
        console.log('deleted res', result)
        response.status(204).end()
      })
      .catch(error => next(error))    
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: 'missing name or number' })
  }

  const p = new Person({
    name: body.name,
    number: body.number,
  })
  
  p.save()
    .then(response => response.status(200).end())
    .catch(err => next(err))

  /**
  Person
    .findOneAndUpdate({ name: body.name }, 
                      { 'number': body.number }, 
                      { returnNewDocument: true, runValidators: true, context: 'query' },)
  .then(saved => {            
    response.json(saved.toJSON())
  })
  .catch(error => next(error)) */
})

app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })  

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  if (error.name === 'ValidationError' ) {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})