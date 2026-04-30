import e from "express";
import morgan from "morgan";

const app = e();

app.use(e.json())
app.use(morgan('tiny'))

let phones = [
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
  }
]

app.get('/api/persons', (req, res) => {
  res.json(phones)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const phone = phones.find(p => p.id === id)

  if (phone) res.json(phone)
  else {
    res.status(404).json({
      error: `Phone with id ${id} not found`
    })
  }
})

app.get('/info', (req, res) => {
  res.send(`
    <div>
      <p>Phonebook has info for ${phones.length} people</p>
      <p>${Date()}</p>
    </div>
    `)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  phones = phones.filter(p => p.id !== id)
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const id = Math.floor(Math.random() * 1000)
  const body = req.body

  if (!body.name) {
    return res.status(400).json({
      error: 'Missing name'
    })
  } else if (!body.number) {
    return res.status(400).json({
      error: 'Missing number'
    })
  } else if (phones.find(p => p.name === body.name)) {
    return res.status(400).json({
      error: 'Name must be unique'
    })
  }

  const phone = {
    id,
    name: body.name,
    number: body.number
  }

  phones = phones.concat(phone)

  res.json(phone)
})

const unkownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unkownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})