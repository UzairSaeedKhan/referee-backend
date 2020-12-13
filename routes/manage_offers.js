const express = require("express");
const router = express.Router();

// Import Model
const Offer = require("../models/Offer");

// VIEW ALL OFFERS
router.get("/viewAllOffers", (req, res) => {
  Offer.find().then((offer) => res.json(offer));
});

// ADD OFFERS
router.post("/addOffer", async (req, res) => {
  const addOffer = new Offer({
    campaign_name: req.body.campaign_name,
    headline: req.body.headline,
    live_date: req.body.live_date,
    expiry_date: req.body.expiry_date,
    commision_based: req.body.commision_based,
    commision_value: req.body.commision_value,
    target_transaction: req.body.target_transaction,
    description: req.body.description
  });
  try {
    const new_offer = await addOffer.save();
    res.json(new_offer);
  } catch (err) {
    res.json({ message: err });
  }
});

// EDIT OFFERS
// EDITS/UPDATE A SPECIFIC OFFER (by offerId)
router.patch("/editOffer/:id", async (req, res) => {
  try {
    const editedOffer = await Offer.updateOne(
      { _id: req.params.id },
      {
        $set: {
          campaign_name: req.body.campaign_name,
          headline: req.body.headline,
          //live_date: req.body.live_date,
          //expiry_date: req.body.expiry_date,
          description: req.body.description
        },
      }
    );
    res.json(editedOffer);
  } catch (err) {
    res.json({ message: "ERROR!" });
  }
});

// @route DELETE api/customers
// @desc Delete Customer
// @access public
router.delete('/deleteOffer/:id', (req, res) => {
  Offer.findById(req.params.id)
      .then(offer => offer.remove().then(() => res.json({ success: true })))
      .catch(err => res.status(404).json({ success: false }))
})

module.exports = router;

// EDIT OFFER (FIND ONE AND UPDATE) (BY ID) and DELETE OFFER
// JWT
// AUTHENTICATION
