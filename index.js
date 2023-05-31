const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
morgan.token('data', (req, res) => `{"name":${req.body.name},"number":${req.body.number}}`)//create new token
app.use(morgan(':method :url :status :res[content-length] -:response-time ms :data')) // morgan reconfigured by new token created
app.use(cors());
app.use(express.static('build'))
app.use(express.json());
persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    },
    {
        "id": 5,
        "name": " Brother Poppendieck",
        "number": "36-22-6524133"

    },
    {
        "id": 7,
        "name": "Matti Luukkai",
        "number": "234-678-90"
    }
]

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id) // id must be a number
    persons = persons.filter(person => person.id !== id) // removes deleted
    response.status(204).end() // successful deletion.No data returned

})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const pers = persons.filter(person => person.id === id)
    if (pers[0]) {
        response.json(pers)
    }
    else {
        response.status(404).send(`<div><strong>The requested id ${id} and associated information do not exist!</strong></div>`)
    }

})

const generateId = (min, max) => {
    return Math.floor(Math.random() * (1000))
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name) {
        return response.status(400).json({ error: "name missing" })
    }
    if (!body.number) {
        return response.status(400).json({ error: "number missing" })
    }
    if (persons.find(n => n.name.toLowerCase() === body.name.toLowerCase())) {
        return response.status(400).json({ error: "name must be unique" })
    }
    // create person object. Use random number generated id.   
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)
    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => { console.log(`Running on port ${PORT}`) })