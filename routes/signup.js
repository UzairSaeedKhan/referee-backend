const express = require("express");
const router = express.Router();

// Import Model
const Customer = require("../models/Customer");
const Business = require("../models/Business");

// Importing Validations
const { signUpBusinessValidation } = require("../validation");
const { signUpCustomerValidation } = require("../validation");

// @route POST api/customers
// @desc Sign-Up Customer
// @access public
router.post("/", (req, res) => {
  // checking if email and password exist in the input  
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({
      status: 0,
      message: "Body Has Missing Fields.",
      data: null,
    });
  }

  if (req.body.customer) {
    // validation of credentials
    const { error } = signUpCustomerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // if valid then create customer
    const newCustomer = new Customer({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender,
      contact: req.body.contact,
      dob: req.body.dob,
    });

    newCustomer.save().then((customer) => res.json(customer));
  } else {
    // validation of credentials
    const { error } = signUpBusinessValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // if valid then create business
    const newBusiness = new Business({
      title: req.body.title,
      email: req.body.email,
      password: req.body.password,
      contact: req.body.contact,
      designation: req.body.designation,
    });

    newBusiness.save().then((business) => res.json(business));
  }
});

module.exports = router;
