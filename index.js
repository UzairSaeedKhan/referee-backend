const express = require('express')
const path = require('path')
const mongoose = require('mongoose')

// Add Routes
const customers = require('./routes/api/customers')

const app = express()

// Body Parser
app.use(express.json());

const db = require('./config/keys').mongoURI

// Connect Database
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected'))
    .catch((err) => console.log(err))

app.use('/api/customers', customers)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('Server Running'))