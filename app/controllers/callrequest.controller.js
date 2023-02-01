const db = require('../models')
// const sendEmail = require('./auth.controller').sendEmail;
const Callrequest = db.callrequest



exports.createCallRequest = (req, res) => {
    Callrequest.findOne({
        where: {
          email: req.body.email,
          phone: req.body.phone
        }
      }).then(record => {
        if (!record) {

            Callrequest.create(req.body).then(data => {
                if (data) {
                    res.status(200).send({
                        message: 'We will review your request and get back to you soon.'
                    })
                } else {
                    res.status(400).send({
                        message: 'Please try again.'
                    })
                }
            }).catch(err => {
                console.log(err, err.message)
                res.status(500).send({ message: 'Server error' })
            })
        }
        else
        {
            let status = record.dataValues.status
            res.status(200).send({
                message: 'Your data is already saved for call schedule, status is '+status
            })
        }
      })
}

exports.getSchedules = (req, res) => {
    Callrequest.findAll({
        order: [['id', 'DESC']]
    }).then(result => {
        console.log("aaaaa");
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })
}
