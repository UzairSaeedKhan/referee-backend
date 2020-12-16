const { request } = require("express");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Importing Validations
const { addOfferValidation } = require('../validation');
const { editOfferValidation } = require('../validation')

// Import Model
const offer = require("../models/Offer");
const Offer = require("../models/Offer");

// VIEW ALL OFFERS
router.get("/", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    Offer.find().then((offer) => res.json(offer));
  });
});

// ADD OFFERS
router.post("/", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.status(400).send({ err });
    } else {
      // CHECK: if offer already exists
        const offerExist = Offer.findOne({campaign_name:req.body.campaign_name}, (err, data) => { 
        if (data){ 
            res.status(400).json("Offer already exists") 
        }else {
          // validation
          const { error } = addOfferValidation(req.body);
          if (error) return res.status(400).send(error.details[0].message);
          // adding offer
          const newOffer = new Offer({
            business_id: req.body.business_id,
            campaign_name: req.body.campaign_name,
            headline: req.body.headline,
            live_date: req.body.live_date,
            expiry_date: req.body.expiry_date,
            commission_based: req.body.commission_based,
            commission_value: req.body.commission_value,
            target_transaction: req.body.target_transaction,
            description: req.body.description,
          })
          newOffer.save().then((offer) => res.json(offer));
        }
      });
      
      }
  })
});

// EDIT OFFERS
// EDITS/UPDATE A SPECIFIC OFFER (by offerId)
router.patch("/:id", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.status(400).send({ err });
    } else {
      // validation
      const { error } = editOfferValidation(req.body);
      if (error) return res.status(400).send(error.details[0].message);
      // editing offer
      Offer.updateOne(
        { _id: req.params.id },
        {
          $set: {
            campaign_name: req.body.campaign_name,
            headline: req.body.headline,
            //live_date: req.body.live_date,
            //expiry_date: req.body.expiry_date,
            description: req.body.description,
          },
        },
        (err, data) => {
          res.json(data);
        }
      );
    }
  });
});

// @route DELETE api/customers
// @desc Delete Offer
// @access public
router.delete("/delete/:id", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.status(404).send({ msg: "InvalidJWT." });
    } else {
      Offer.findById(req.params.id)
        .then((offer) => offer.remove().then(() => res.json({ success: true })))
        .catch((err) => res.status(404).json({ success: false }));
    }
  });
});

// @route DELETE api/customers
// @desc Delete All Offers
// @access public
router.delete("/deleteAll", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.status(404).send({ msg: "InvalidJWT." });
    } else {
      Offer.remove({})
        .then(() => res.json({ success: true }))
        .catch((err) => res.status(404).json({ err }));
    }
  });
});

module.exports = router;

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
