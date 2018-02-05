const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')

const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(
    morgan(':method :url :body - status: :status - lenghth: :res[content-length] - :response-time ms')
)

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
    Person.find({}, { __v: 0 }).then(result => {
        const txt = `
        Puhelinluettelossa ${result.length} henkilon tiedot
        <br />
        ${new Date()}
    `
        res.send(txt)
    }).catch(error => {
        console.log(error)
    })

})

app.get('/persons', (request, response) => {
    Person.find({}, { __v: 0 }).then(result => {
        response.json(result.map(Person.format))
    }).catch(error => {
        console.log(error)
    })
})

app.post('/persons', (request, response) => {
    const id = persons[persons.length - 1].id + 1
    const body = request.body

    if (!Object.keys(body).length) {
        return response.status(400).json({ error: 'content missing' })
    }

    if (!body.name) {
        return response.status(400).json({ error: 'Name missing' })
    }

    if (!body.number) {
        return response.status(400).json({ error: 'Number missing' })
    }

    Person.find({ name: body.name })
        .then(result => {
            console.log(result)
            if (result.length) {
                return response.status(400).json({ error: 'Person exists. Name must be unique' })
            } else {
                const person = new Person({
                    name: body.name,
                    number: body.number,
                    date: new Date(),
                })

                person
                    .save()
                    .then(res => {
                        response.json(Person.format(res))
                    }).catch(error => {
                        console.log(error)
                    })


            }
        })

})

app.get('/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    Person.findById(request.params.id)
        .then(person => {
            response.json(person)
        })
        .catch(error => {
            console.log(error)
            response.status(404).end()
        })
})

app.delete('/persons/:id', (request, response) => {
    Person
        .findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => {
            response.status(400).send({ error: 'malformatted id' })
        })
})

app.put('/persons/:id', (request, response) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
        date: new Date()
    }

    Person
        .findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(Person.format(updatedPerson))
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'malformatted id' })
        })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`
    All routes:
    `)
    app._router.stack.forEach(function (r) {
        if (r.route && r.route.path) {
            const method = Object.keys(r.route.methods)[0].toUpperCase()
            console.log(method, `http://localhost:${PORT}${r.route.path}`)
        }
    })
    console.log(`Server running on port ${PORT}`)
})
