const mongoose = require('mongoose')

if ( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').load();
}
const url = `mongodb://${process.env.DB_USER}:${process.env.DB_PW}@${process.env.DB_URI}`
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
})

personSchema.statics.format = person => ({
  id: person._id,
  name: person.name,
  number: person.number,
  date: person.date
})

const Person = mongoose.model('Person', personSchema)
module.exports = Person