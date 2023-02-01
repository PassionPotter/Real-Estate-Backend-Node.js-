const db = require('../models')
const Team = db.team

exports.getTeams = (req, res) => {
  const count = Number(req.query.count) ? Number(req.query.count) : 20
  Team.findAll({
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

exports.createTeam = (req, res) => {
  console.log(req.body);
  Team.create({
    name: req.body.name,
    job: req.body.job,
    avatar: req.body.avatar,
    content: req.body.content,
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

exports.saveTeam = (req, res) => {
  Team.findOne({
    where: {
      id: req.body.id,
    }
  }).then(team => {
    if (!team) {
      res.status(400).send({
        message: 'Team not found',
      })
    }
    team.name = req.body.name
    team.job = req.body.job
    team.avatar = req.body.avatar
    team.content = req.body.content
    team.save()
    res.status(200).send({
      message: 'Team approved successfully',
    })
  })
}

exports.delTeam = (req, res) => {
  console.log(req);
  Team.destroy({
    where: {
      id: req.query.id
    }
  }).then(team => {
    res.status(200).send({
      message: 'Team delete successfully',
    })
  })
}
