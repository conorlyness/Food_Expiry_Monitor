const { ObjectID } = require('bson');
var express = require('express');
var router = express.Router();
const objectId = require('mongodb').ObjectID;

const t = new Date();
const date = ('0' + t.getDate()).slice(-2);
//used for having dates one, two and three days in the future
const datePlus1 = t.getDate() + 1;
const datePlus2 = t.getDate() + 2;
const datePlus3 = t.getDate() + 3;

//used for having dates one day in the past
const currentDate = t.getDate();
const dateMinus1 = ('0' + (currentDate - 1)).slice(-2);

const month = ('0' + (t.getMonth() + 1)).slice(-2);
const year = t.getFullYear();
const today = `${date}/${month}/${year}`;
const oneDayTillExpiry = `${datePlus1}/${month}/${year}`;
const twoDaysTillExpiry = `${datePlus2}/${month}/${year}`;
const threeDaysTillExpiry = `${datePlus3}/${month}/${year}`;
const expiredOneDayAgo = `${dateMinus1}/${month}/${year}`;

router.get('/foodExpiration', (req, res, next) => {
  req.collection
    .find({})
    .sort({ expirationDate: 1 })
    .toArray()
    .then((results) => res.json(results))
    .catch((error) => res.send(error));
});

router.get('/foodExpiration/3days', (req, res, next) => {
  //store all the dates i want to look for in the find method
  let dates = [oneDayTillExpiry, twoDaysTillExpiry, threeDaysTillExpiry];
  req.collection
    .find({
      expirationDate: { $in: dates },
    })
    .toArray()
    .then((results) => res.json(results))
    .catch((error) => res.send(error));
});

router.get('/foodExpiration/today', (req, res, next) => {
  req.collection
    .find({ expirationDate: today })
    .toArray()
    .then((results) => res.json(results))
    .catch((error) => res.send(error));
});

router.get('/foodExpiration/yesterday', (req, res, next) => {
  req.collection
    .find({ expirationDate: expiredOneDayAgo })
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
