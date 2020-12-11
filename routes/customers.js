const express = require('express')
const router = express.Router()


// Import Model
const Customer = require('../models/Customer')

// @route GET api/customers
// @desc Get All Customers
// @access public
router.get('/', (req, res) => {
    Customer.find()
        .then((customers) => res.json(customers))
})

// @route POST api/customers
// @desc Create Customer
// @access public
router.post('/', (req, res) => {
    const newCustomer = new Customer({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    newCustomer.save().then((customer) => res.json(customer))
})

// @route DELETE api/customers
// @desc Delete Customer
// @access public
router.delete('/:id', (req, res) => {
    Customer.findById(req.params.id)
        .then(customer => customer.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))
})



module.exports = router