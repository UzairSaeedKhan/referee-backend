const express = require('express')
const path = require('path')
const mongoose = require('mongoose')

// Add Routes
const customers = require('./routes/customers')
const login = require('./routes/login')
const signup = require('./routes/signup')

const app = express()

// Body Parser
app.use(express.json());

const db = require('./config/keys').mongoURI

// Connect Database
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conected'))
    .catch((err) => console.log(err))

app.use('/api/customers', customers)
app.use('/user/login', login)
app.use('/user/signup', signup)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('Server Running'))