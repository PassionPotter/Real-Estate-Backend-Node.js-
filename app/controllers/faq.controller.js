const db = require('../models')
const Faq = db.faq

exports.getFaqs = (req, res) => {
  const count = Number(req.query.count) ? Number(req.query.count) : 20
  Faq.findAll({
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

exports.createFaq = (req, res) => {
  Faq.create({
    title: req.body.title,
    description: req.body.description,
  }).then(site => {
    console.log(site);
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

exports.saveFaq = (req, res) => {
  Faq.findOne({
    where: {
      id: req.body.id,
    }
  }).then(faq => {
    if (!faq) {
      res.status(400).send({
        message: 'Faq not found',
      })
    }
    faq.title = req.body.title
    faq.description = req.body.description
    faq.save()
    res.status(200).send({
      message: 'Faq approved successfully',
    })
  })
}
exports.getFaqsById = (req, res) => {
  const ID = req.query.ID
  let option = { id: ID }
  Faq.findOne({
      where:option
  }).then(result => {
      res.status(200).json(result);
  }).catch(err => {
      res.status(500).json({ message: err.message })
  })
}
