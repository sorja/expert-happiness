const mongoose = require('mongoose')
require('dotenv').load();
const url = `mongodb://${process.env.DB_USER}:${process.env.DB_PW}@ds125388.mlab.com:25388/fullstack-hy`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
})
const Person = mongoose.model('Person', personSchema)
const printAddressBook = () =>{
  mongoose.connect(url)
  console.log("Puhelinluettelo")
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}
const createNew = (name, number) => {
  mongoose.connect(url)

  const person = new Person({
    name,
    number,
    date: new Date(),
  })

  person
    .save()
    .then(response => {
      console.log(`OK! ${name} / ${number}`)
      mongoose.connection.close()
    })
}

if (process.argv.length === 4) {
  createNew(process.argv[2], process.argv[3])
} else {
  printAddressBook()
}
