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



  Customer.findOne({ email: req.body.email, password: req.body.password }, (err, data) => {
    if (err) {
      res.status(400).send({ status: 0, message: err });
    }
  })
    .then((data) => {
      return res.send({
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
      return res.send({
        status: 1,
        name: data.title,
        message: "Logged In"
      });
    })
    .catch((err) => {
      console.log(err)
    });


});

module.exports = router;