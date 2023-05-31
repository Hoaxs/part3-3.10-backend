

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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => { console.log(`Running on port ${PORT}`) })