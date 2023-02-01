const db = require('../models')
const Token = db.token

exports.getTokens = (req, res) => {
  const count = Number(req.query.count) ? Number(req.query.count) : 20
  Token.findAll({
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

exports.createToken = (req, res) => {
  Token.create({
    userId: req.body.userId,
    propertyId: req.body.propertyId,
    tokenAddress: req.body.tokenAddress,
    tokenSymbol: req.body.tokenSymbol,
    purchasePrice: req.body.purchasePrice,
    salePrice: req.body.salePrice,
    quantity: req.body.quantity,
    status: req.body.status,
  }).then(site => {
    if (site) {
      res.status(200).send({
        message: 'Site setting created successfully',
      })
    } else {
      res.status(400).send({
        message: 'Please try again',
      })
    }
  }).catch(err => {
    res.status(500).send({message: 'Server error'})
  })
}

exports.saveToken = (req, res) => {
  Token.findOne({
    where: {
      id: req.body.id,
    }
  }).then(token => {
    if (!token) {
      res.status(400).send({
        message: 'Token not found',
      })
    }
    token.userId = req.body.userId
    token.propertyId = req.body.propertyId
    token.tokenAddress = req.body.tokenAddress
    token.tokenSymbol = req.body.tokenSymbol
    token.purchasePrice = req.body.purchasePrice
    token.salePrice = req.body.salePrice,
    token.quantity = req.body.quantity
    token.status = req.body.status
    token.save()
    res.status(200).send({
      message: 'Token approved successfully',
    })
  })
}
