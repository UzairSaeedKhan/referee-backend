const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Import Model
const customer = require("../models/Customer");
const business = require("../models/Business");

// @route GET api/customers
// @desc Get All Customers
// @access public
router.get("/", (req, res) => {
  Customer.find().then((customers) => res.json(customers));
});

// @route GET api/business
// @desc Get All Businesses
// @access public
router.get("/businesses", (req, res) => {
  Business.find().then((business) => res.json(business));
});

// @route POST api/customers
// @desc Create Customer
// @access public
router.post("/", (req, res) => {
  const newCustomer = new Customer({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  newCustomer.save().then((customer) => res.json(customer));
});

// @route DELETE api/customers
// @desc Delete Customer
// @access public
router.delete("/:id", (req, res) => {
  Customer.findById(req.params.id)
    .then((customer) =>
      customer.remove().then(() => res.json({ success: true }))
    )
    .catch((err) => res.status(404).json({ success: false }));
});

// @route DELETE api/customers
// @desc Delete Business
// @access public
router.delete("/b/:id", (req, res) => {
  Business.findById(req.params.id)
    .then((customer) =>
      customer.remove().then(() => res.json({ success: true }))
    )
    .catch((err) => res.status(404).json({ success: false }));
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = router;
