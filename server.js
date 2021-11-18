const express = require("express")
const cors = require("cors")
const morgan = require('morgan')
require('dotenv').config()

// create express app
const app = express()

// logging
app.use(morgan("dev"))

// use cors
let corsOptions = {
  origin: "http://localhost:8081",
}
app.use(cors(corsOptions))

// parse requests of content-type: application/json
app.use(express.json())

// parse requests content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

const db = require("./app/models")
const Role = db.role

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Db")
  initial()
})

function initial() {
  Role.create({
    id: 1,
    name: "user",
  })

  Role.create({
    id: 2,
    name: "moderator",
  })

  Role.create({
    id: 3,
    name: "admin",
  })
}

app.get("/", (req, res) => {
  res.json({ message: "Welcome to princeb app." })
})

// routes
require('./app/routes/auth.routes')(app)
require('./app/routes/user.routes')(app)

// set port, listen for requests
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`)
})
