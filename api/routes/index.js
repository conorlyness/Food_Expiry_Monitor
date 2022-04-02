const { ObjectID } = require('bson');
var express = require('express');
var router = express.Router();
const objectId = require('mongodb').ObjectID;

router.get('/foodExpiration', (req, res, next) => {
  req.collection
    .find({})
    .toArray()
    .then((results) => res.json(results))
    .catch((error) => res.send(error));
});

router.post('/foodExpiration', (req, res, next) => {
  const { foodName, expirationDate } = req.body;
  if (!foodName || !expirationDate) {
    return res.status(400).json({
      message: 'food name and expiration date are required',
    });
  }
  const payload = { foodName, expirationDate };
  req.collection
    .insertOne(payload)
    .then((result) => res.json(result))
    .catch((error) => res.send(error));
});

router.delete('/foodExpiration/:id', (req, res, next) => {
  const { id } = req.params;
  const _id = ObjectID(id);

  req.collection
    .deleteOne({ _id })
    .then((result) => res.json(result))
    .catch((error) => res.send(error));
});

module.exports = router;
