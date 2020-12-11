const express = require("express");
const router = express.Router();

// Import Model
const Customer = require("../models/Customer");

// @route POST api/customers
// @desc Login Customer
// @access public
router.post("/", (req, res) => {
  if (!req.body.email) {
    return res.status(400).send({
      status: 0,
      message: "Body Empty.",
      data: null
    });
  }
  Customer.findOne({ email: req.body.email }, (err, data) => {
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
        message: "Some Error",
      });
    });
});

module.exports = router;
