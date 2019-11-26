const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
})

const Person = mongoose.model('Person', personSchema)

function main() {  
  const argvLength = process.argv.length  
  if ( argvLength < 3 ) {
    console.log('give password as argument')
    process.exit(1)
  } else if( argvLength == 5 ) {    
    const password = process.argv[2]
    const name = process.argv[3]
    const number = process.argv[4]    
    save(password, name, number)
  } else if( argvLength == 3 ) {    
    const password = process.argv[2]
    list(password)
  } else {
    console.log('wrong args, try again')
    process.exit(1)
  }
}

function save(password, name, number) {
  const url = `mongodb+srv://fullstack:${password}@fullstack-k9put.mongodb.net/phonebook?retryWrites=true&w=majority`
  mongoose.connect(url, { useNewUrlParser: true })
  const person = new Person({ name, number, })
  person.save().then(response => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}

function list(password) {
  const url = `mongodb+srv://fullstack:${password}@fullstack-k9put.mongodb.net/phonebook?retryWrites=true&w=majority`
  mongoose.connect(url, { useNewUrlParser: true })
  Person.find({  }).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}

main()