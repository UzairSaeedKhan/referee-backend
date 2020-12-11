const express = require("express");
const router = express.Router();

// Import Model
const Customer = require("../models/Customer");

// @route POST api/customers
// @desc Login Customer
// @access public
router.post("/", (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({
      status: 0,
      message: "Body Empty.",
      data: null
    });
  }

  if (req.body.customer) {
    Customer.findOne({ email: req.body.email, password: req.body.password }, (err, data) => {
      if (err) {
        res.status(400).send({ status: 0, message: err });
      }
    })
      .then((data) => {
        return res.send({
          status: 1,
          name: data.name,
          message: "Logged In"
        });
      })
      .catch((err) => {
        res.status(500).send({
          status: 0,
          message: "Incorrect Credentials",
        });
      });
  }

  else {
    Business.findOne({ email: req.body.email, password: req.body.password }, (err, data) => {
      if (err) {
        res.status(400).send({ status: 0, message: err });
      }
    })
      .then((data) => {
        return res.send({
          status: 1,
          name: data.title,
          message: "Logged In"
        });
      })
      .catch((err) => {
        res.status(500).send({
          status: 0,
          message: "Incorrect Credentials",
        });
      });
  }

});

module.exports = router;