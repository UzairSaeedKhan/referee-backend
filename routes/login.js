const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

// Import Model
const Customer = require("../models/Customer");

// Importing Validations
const { logInValidation } = require('../validation');

// @route POST api/customers
// @desc Login Customer
// @access public
router.post("/", (req, res) => {
  if (!req.body.email || !req.body.password) { // Email and Password are present in body
    return res.status(400).send({
      status: 0,
      message: "Body Empty.",
      data: null
    });
  }

  // Checking if this customer already exists
  Customer.findOne({ email: req.body.email, password: req.body.password }, (err, data) => {
    if (err) {
      res.status(400).send({ status: 0, message: err });
    }
  })
    .then((data) => {
      // validation of credentials
      const { error } = logInValidation(req.body);
      if (error) return res.status(400).send(error.details[0].message);
      return res.send({
        id: _id,
        status: 1,
        first_name: data.first_name,
        message: "Logged In"
      });
    })
    .catch((err) => {
      console.log(err)
    });

  Business.findOne({ email: req.body.email, password: req.body.password }, (err, data) => {
    if (err) {
      res.status(400).send({ status: 0, message: err });
    }
  })
    .then((data) => {
      jwt.sign({ data }, 'secretkey', { expiresIn: '1h' }, (err, token) => {
        return res.json({
        id: data._id,
        status: 1,
        name: data.title,
        message: "Logged In",
        token
        });
      });

    })
    .catch((err) => {
      console.log(err)
    });



});

module.exports = router;