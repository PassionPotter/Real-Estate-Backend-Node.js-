const db = require('../models')
const config = require('../config/auth.config')
const User = db.user
const Credential = db.credential
const Role = db.role
const Referral = db.referral

const Op = db.Sequelize.Op

var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('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')

const sendEmail = (email, subject, content) => {

  Credential.findOne({
    limit: 1,
    order: ['createdAt'],
  }).then((credential) => {
    const transport = nodemailer.createTransport({
      host: 'tokized.immo',
      port: 465,
      auth: {
        user: credential.email,
        pass: credential.emailPassword,
      }
    })

    let sender = credential.email
    const mainOptions = {
      from: sender,
      to: email,
      subject: subject,
      html: content,
    }
    // console.log('[MailOptions]', mainOptions)
    transport.sendMail(mainOptions, (err, info) => {
      if (err) {
        console.log('[mail err]', err, info);
      }
      console.log('[mail info]', info);
    })
  })

  // console.log('[mailsend success]');
  //   const msg = {
  //     to: email,
  //     from: 'maksovsouse@gmail.com',
  //     subject: subject,
  //     html: content,
  //   }

  //   sgMail
  //     .send(msg)
  //     .then((response) => {
  //       console.log(response[0].statusCode)
  //       console.log(response[0].headers)
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //     })
}

exports.sendEmail = sendEmail;

const sendVerifyEmail = (email, string) => {
  // console.log('verify email');
  sendEmail(email, 'Email confirmation', `Press <a href=https://tokized.immo/#/verify/${string}> here </a> to verify your email. Thanks.`)
}
exports.signup = (req, res) => {
  User.count({}).then(count => {
    console.log(count, "count");
    if (count === 0) {
      req.body.roles = ['admin']
    } else {
      req.body.roles = ['user']
    }
    // Save User to Database
    const randString = Math.random().toString(36).substring(2, 16) + Math.random().toString(36).substring(2, 16)
    User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phone: req.body.phone,
      username: req.body.username,
      email: req.body.email,
      citizen: req.body.citizen,
      password: bcrypt.hashSync(req.body.password, 8),
      verificationString: randString,
      type: 1 //basic
    })
      .then(user => {
        // send email to activate the user
        console.log('create user', user);
        if (req.body.referral && user.id) {
          User.findOne({
            where: {
              username: req.body.referral
            }
          }).then((referralUser) => {
            Referral.create({
              userId: referralUser.id,
              customer: user.id,
              amount: 0,
              description: '',
              status: 1,

            }).then(() => {
              console.log('success')
            })
              .catch((err) => {
                console.log(err)
              })
          }).catch((e) => {
            console.log(e)
          })

        }

        sendVerifyEmail(req.body.email, randString)
        if (req.body.roles) {
          Role.findAll({
            where: {
              name: {
                [Op.or]: req.body.roles
              }
            }
          }).then(roles => {
            user.setRoles(roles).then(() => {
              res.send({ message: 'User registered successfully!' })
              // sendEmail(req.body.email, 'User Registered', `User(${req.body.email} registerd succesfully!)`);
            })
          })
        } else {
          // user role = 1
          user.setRoles([1]).then(() => {
            res.send({ message: 'User registered successfully!' })
          })
        }
      })
      .catch(err => {
        res.status(500).send({ message: err.message })
      })
  }
  )
}

exports.signin = (req, res) => {

  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        User.findOne({
          where: {
            email: req.body.username,
          }
        })
          .then(user => {
            if (!user) {
              return res.status(404).send({ message: 'User Not found.' })
            }
            //--------------if username exists,---------------------------
            loginProcess(req, res, user)
          })
        return res.status(404).send({ message: 'User Not found.' })
      }
      //--------------if email exists,---------------------------
      loginProcess(req, res, user)

    })
    .catch(err => {
      res.status(500).send({ message: 'Try again' })
    })
}

loginProcess = (req, res, user) => {
  var passwordIsValid = bcrypt.compareSync(
    req.body.password,
    user.password
  )

  if (!passwordIsValid) {
    return res.status(401).send({
      accessToken: null,
      message: 'Invalid Password!',
    })
  }
  if (!user.isActive) {
    return res.status(402).send({
      accessToken: null,
      message: 'Not activated yet!'
    })
  }
  var token = jwt.sign({ id: user.id, email: user.email }, config.secret, {
    expiresIn: 86400 // 24 hours
  })

  var authorities = [];
  user.getRoles().then(roles => {
    for (let i = 0; i < roles.length; i++) {
      authorities.push(roles[i].name.toUpperCase())
    }
    console.log(user);
    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      roles: authorities,
      accessToken: token,
      firstName: user.firstname,
      lastName: user.lastname,
      walletAddress: user.walletAddress,
      type: user.type,
      card: user.card
    })
  })
}

exports.verifyEmail = (req, res) => {
  const { verificationString } = req.params;
  User.findOne({
    where: {
      verificationString: verificationString
    }
  }).then((user) => {
    if (!user) {
      res.status(404).send({
        message: 'User not found!',
      })
    }
    user.isActive = true;
    user.save()
    res.send({
      message: 'User activated successfully!',
    })
  }).catch(() => {
    res.status(500).send({
      message: 'Try again!',
    })
  })
}
exports.resetPassword = (req, res) => {
  // console.log('--------------------- username', req.body.username)
  User.findOne({
    where: {
      [Op.or]: [
        {
          username: req.body.username,
        },
        {
          email: req.body.username,
        },
      ]
    }
  })
    .then(user => {
      console.log('000000000000000000000', user)
      if (!user) {
        res.status(404).send({
          message: 'User not found!',
        })
      }
      const randString = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10)
      console.log('---------', randString)
      user.password = bcrypt.hashSync(randString, 8)
      user.save()
      res.status(200).send({
        message: 'Your password has been changed successfully!',
      })
      sendEmail(user.email, 'Reset Password', `Your password has been changed. Your new password is <b>${randString}</b>`)
    })
    .catch(err => {
      res.status(500).send({ message: err })
    })
}

exports.resetNewPassword = (req, res) => {
  // console.log('--------------------- username', req.body.username)
  User.findOne({
    where: {
      [Op.or]: [
        {
          username: req.body.username,
        },
        {
          email: req.body.username,
        },
      ]
    }
  })
    .then(user => {
      // console.log('000000000000000000000', user)
      if (!user) {
        res.status(404).send({
          message: 'User not found!',
        })
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.currentPassword,
        user.password
      )
      if (!passwordIsValid) {
        res.status(200).send({

          errorMessage: true,
          message: 'Current password is incorrect!',
        })
        return
      }

      // const randString = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10)
      // console.log('---------',randString)
      user.password = bcrypt.hashSync(req.body.password, 8)
      user.save()
      res.status(200).send({
        message: 'Your password has been changed successfully!',
      })
      sendEmail(user.email, 'Reset Password', `Your password has been changed. Your new password is <b>${req.body.password}</b>`)
    })
    .catch(err => {
      res.status(500).send({ message: err })
    })
}