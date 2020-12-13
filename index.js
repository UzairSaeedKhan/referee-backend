const express = require('express')
const path = require('path')
const mongoose = require('mongoose')

// Add Routes
const customers = require('./routes/customers')
const login = require('./routes/login')
const signup = require('./routes/signup')
const offer = require('./routes/manage_offers')

const app = express()

// Body Parser
app.use(express.json());

const db = require('./config/keys').mongoURI

// Connect Database
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected'))
    .catch((err) => console.log(err))

app.use('/customers', customers)
app.use('/user/login', login)
app.use('/user/signup', signup)
app.use('/offer', offer)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('Server Running On Port'))