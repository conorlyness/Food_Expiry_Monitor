const { ObjectID } = require('bson');
var express = require('express');
var router = express.Router();
const objectId = require('mongodb').ObjectID;

const t = new Date();
const date = ('0' + t.getDate()).slice(-2);
const month = ('0' + (t.getMonth() + 1)).slice(-2);
const year = t.getFullYear();
const today = `${date}/${month}/${year}`;

router.get('/foodExpiration', (req, res, next) => {
  req.collection
    .find({})
    .sort({ expirationDate: 1 })
    .toArray()
    .then((results) => res.json(results))
    .catch((error) => res.send(error));
});

router.get('/foodExpiration/3days', (req, res, next) => {
  req.collection
    .find({})
    .toArray()
    .then((results) => res.json(results))
    .catch((error) => res.send(error));
});

router.get('/foodExpiration/today', (req, res, next) => {
  console.log(today);
  req.collection
    .find({ expirationDate: today })
    .toArray()
    .then((results) => res.json(results))
    .catch((error) => res.send(error));
});

router.get('/foodExpiration/yesterday', (req, res, next) => {
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
      message: 'Food name & Expiration date are required',
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
