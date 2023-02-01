const db = require('../models')
const Howworks = db.Howworks

exports.getHowworks = (req, res) => {
  const count = Number(req.query.count) ? Number(req.query.count) : 20
  Howworks.findAll({
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

exports.createHowworks = (req, res) => {
    Howworks.create({
    title: req.body.title,
    description: req.body.description,
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
    console.log(err);
    res.status(500).send({message: 'Server error'})
  })
}

exports.saveHowworks = (req, res) => {
    Howworks.findOne({
    where: {
      id: req.body.id,
    }
  }).then(howworks => {
    if (!howworks) {
      res.status(400).send({
        message: 'Howwork not found',
      })
    }
    howworks.title = req.body.title
    howworks.description = req.body.description
    howworks.save()
    res.status(200).send({
      message: 'Howwork approved successfully',
    })
  })
}

exports.getHowWorksById = (req, res) => {
    const ID = req.query.ID
    let option = { id: ID }
    Howworks.findOne({
        where:option
    }).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({ message: err.message })
    })
}
