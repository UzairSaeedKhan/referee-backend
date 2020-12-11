const express = require("express");
const router = express.Router();

// Import Model
const Offer = require("../models/Offer");

// ADD OFFERS
router.post("/addOffer", (req, res) => {
  const addOffer = new Offer({
    campaign_name: req.body.name,
    headline: req.body.headline,
    live_date: req.body.live_date,
    expiry_date: req.body.expiry_date,
    commision_based: req.body.commision_based,
    commision_value: req.body.commision_value,
    target_transaction: req.body.target_transaction,
    description: req.body.description,
  });
  addOffer.save().then((offer) => {
    res.json(offer);
  });
});

// EDIT OFFERS
router.patch("/addOffer", (req, res) => {
    const addOffer = new Offer({
      campaign_name: req.body.name,
      headline: req.body.headline,
      live_date: req.body.live_date,
      expiry_date: req.body.expiry_date,
      commision_based: req.body.commision_based,
      commision_value: req.body.commision_value,
      target_transaction: req.body.target_transaction,
      description: req.body.description,
    });
    addOffer.save().then((offer) => {
      res.json(offer);
    });
  });
  

module.exports = router