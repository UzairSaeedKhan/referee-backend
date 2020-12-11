const express = require("express");
const router = express.Router();

// Import Model
const Customer = require("../models/Customer");
const Business = require("../models/Business")

// @route POST api/customers
// @desc Sign-Up Customer
// @access public
router.post('/', (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({
            status: 0,
            message: "Body Has Missing Fields.",
            data: null
        });
    }

    if (req.body.customer) {
        const newCustomer = new Customer({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            contact: req.body.contact,
            dob: req.body.dob
        })

        newCustomer.save().then((customer) => res.json(customer))
    }

    else {
        const newBusiness = new Business ({
            title: req.body.title,
            email: req.body.email,
            password: req.body.password,
            contact: req.body.contact,
            designation: req.body.designation
        })

        newBusiness.save().then((business) => res.json(business))
    }


})

module.exports = router