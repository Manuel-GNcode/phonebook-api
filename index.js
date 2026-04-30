import e from "express";
const app = e();

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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})