const { request } = require("express");
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

// Import Model
const offer = require("../models/Offer");

// VIEW ALL OFFERS
router.get("/", (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    Offer.find().then((offer) => res.json(offer));
  })
});

// ADD OFFERS
router.post("/", verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(400).send({ err });
    }
    else {
      const newOffer = new Offer({
        campaign_name: req.body.campaign_name,
        headline: req.body.headline,
        live_date: req.body.live_date,
        expiry_date: req.body.expiry_date,
        commision_based: req.body.commision_based,
        commision_value: req.body.commision_value,
        target_transaction: req.body.target_transaction,
        description: req.body.description
      });
      newOffer.save().then((offer) => res.json(offer));
    }
  })
});



// EDIT OFFERS
// EDITS/UPDATE A SPECIFIC OFFER (by offerId)
router.patch("/:id", verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(400).send({ err });
    }
    else {
      Offer.updateOne({ _id: req.params.id },{$set: {campaign_name: req.body.campaign_name,
            headline: req.body.headline,
            //live_date: req.body.live_date,
            //expiry_date: req.body.expiry_date,
            description: req.body.description
          }
        }, (err, data) => {res.json(data)}
      )
    }
  })
});

// @route DELETE api/customers
// @desc Delete Customer
// @access public
router.delete('/id', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(404).send({msg : "InvalidJWT."})
    }
    else {
      Offer.findById(req.params.id)
      .then(offer => offer.remove().then(() => res.json({ success: true })))
      .catch(err => res.status(404).json({ success: false }))
    }
  })
  
})

module.exports = router;

// EDIT OFFER (FIND ONE AND UPDATE) (BY ID) and DELETE OFFER
// JWT
// AUTHENTICATION


function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }

}