const db = require('../models')
const Refund = db.order

exports.getRefunds = (req, res) => {
  const count = Number(req.query.count) ? Number(req.query.count) : 20
  Refund.findAll({
    limit: count,
    order: ['createdAt'],
  })
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json({message: err.message})
    })
}

exports.createRefund = (req, res) => {
  console.log('[date]', req.body);
  Refund.create({
    userId: req.body.userId,
    tokenId: req.body.tokenId,
    tokenAmount: req.body.tokenAmount,
    userHash: req.body.userHash,
    payHash: req.body.payHash,
  }).then(result => {
    if (result) {
      res.status(200).send({
        message: 'Site setting created successfully',
      })
    } else {
      res.status(400).send({
        message: 'Please try again',
      })
    }
  }).catch(err => {
    console.log(err);
    res.status(500).send({message: 'Server error'})
  })
}

exports.saveRefund = (req, res) => {
  Refund.findOne({
    where: {
      id: req.body.id,
    }
  }).then(order => {
    if (!order) {
      res.status(400).send({
        message: 'Refund not found',
      })
    }

    order.userId = req.body.userId
    order.tokenId = req.body.tokenId
    order.tokenAmount = req.body.tokenAmount
    order.userHash = req.body.userHash
    order.payHash = req.body.payHash;

    order.save()

    res.status(200).send({
      message: 'Refund approved successfully',
    })
  })
}
