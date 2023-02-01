const db = require('../models')
const Quiz = db.quiz
const QuizAnswer = db.quizAnswer

exports.createQuiz = (req, res) => {
    Quiz.create({
        title: req.body.title,
        panswer: req.body.panswer,
        type:req.body.type
    }).then(site => {
        if (site) {
            res.status(200).send({
            message: 'Quiz created successfully',
            })
        } else {
            res.status(400).send({
            message: 'Please try again',
            })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).send({message: 'Server error'})
    })
}

exports.getQuizList = (req, res) => {
    Quiz.findAll()
        .then(result => {
          res.status(200).json(result)
        })
        .catch(err => {
          res.status(500).json({message: err.message})
        })
}
exports.getAnswerList = (req, res) => {
    QuizAnswer.findAll()
        .then(result => {
          res.status(200).json(result)
        })
        .catch(err => {
          res.status(500).json({message: err.message})
        })
}
exports.removeQuiz = (req, res) => {
    Quiz.destroy({where:{id:req.body.id}})
        .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json({message: err.message})
      })
}

exports.createAnswer = (req, res) => {
   
    QuizAnswer.create({
        answers:req.body.data,
    }).then(site => {
        if (site) {
            res.status(200).send({
            message: 'Answer created successfully',
            })
        } else {
            res.status(400).send({
            message: 'Please try again',
            })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).send({message: 'Server error'})
    })
}

