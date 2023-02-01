const db = require('../models')
const sendEmail = require('./auth.controller').sendEmail;
const axios = require("axios").default;
const Credential = db.credential
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

exports.allAccess = (req, res) => {
  res.status(200).send('Public Content.')
}

exports.userBoard = (req, res) => {
  res.status(200).send('User Content.')
}

exports.adminBoard = (req, res) => {
  res.status(200).send('Admin Content.')
}

exports.moderatorBoard = (req, res) => {
  res.status(200).send('Moderator Content.')
}

async function getRole(user) {
  return new Promise((resolve, reject) => {
    var authorities = [];
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        authorities.push(roles[i].name.toUpperCase())
      }
      resolve(authorities);
    })
      .catch(err => reject(err));
  });
}

exports.getUsers = (req, res) => {
  const count = Number(req.query.count) ? Number(req.query.count) : 5000
  User.findAll({
    limit: count,
    order: ['id'],
  })
    .then(async users => {
      let payload = [];
      for (let user of users) {
        let tmpUser = Object.assign({}, user.dataValues);
        tmpUser['role'] = await getRole(user);
        payload.push(tmpUser);
      }
      res.status(200).json(payload);
    })
    .catch(err => {
      console.log('err', err);
      res.status(500).json({ message: err.message })
    })
}

exports.approve = async (req, res) => {
  const credential = await Credential.findOne();
  const options = {
    method: 'POST',
    url: credential.dataValues.idVerificationLink + '/inquiries/'+req.body.inquiryId+'/approve',
    headers: {
      Accept: 'application/json',
      'Persona-Version': '2021-05-14',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + credential.dataValues.idAuthKey
    }
  };

  axios.request(options).then(function (response) {
    if(response.data)
    {
      console.log(response.data.data.relationships.verifications.data[0].id)
      res.status(200).send({
        card: response.data.data.relationships.verifications.data[0].id
      })
    }
  }).catch(function (error) {
    console.error(error);
  });
}

exports.getImagUser = async (req, res) => {
  const credential = await Credential.findOne();
  const options = {
    method: 'GET',
    url: credential.dataValues.idVerificationLink +'/verifications/'+req.body.card,
    headers: {
      Accept: 'application/json',
      'Persona-Version': '2021-05-14',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + credential.dataValues.idAuthKey
    }
  };
  console.log(req.body.card);
  axios.request(options).then(function (response) {
    if(response.data)
    {
      console.log("imgURL", response.data.data.attributes)
      const options__ = {
        method: 'GET',
        url:response.data.data.attributes['front-photo-url'],
        headers: {
          Authorization: 'Bearer ' + credential.dataValues.idAuthKey
        },
        responseType:'arraybuffer'
      }
      axios.request(options__).then(function(res__) {
        console.log(res__.data);
        res.status(200).send({
          img:res__.data
        })
      })
     
    }
  }).catch(function (error) {
    console.error(error);
  });
}

exports.createUser = (req, res) => {

  User.create({
    email: req.body.email,
    walletAddress: req.body.walletAddress,
  })
    .then(user => {
      // send email to activate the user
      console.log(req.body.role)
      if (req.body.role) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: [req.body.role]
            }
          }
        }).then(roles => {
          console.log(roles);
          user.setRoles(roles).then(() => {
            res.send({ message: 'User registered successfully!' })
            sendEmail(req.email, 'User Registered', `User(${req.email} registerd succesfully!)`);
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
      console.log('[err]', err);
      res.status(500).send({ message: err.message })
    })
}

exports.saveUser = (req, res) => {
    User.findOne({
    where: {
      id: req.body.id,
    }
  }).then(user => {
    if (!user) {
      res.status(400).send({
        message: 'Order not found',
      })
    }
    // console.log('update user', req.body);
    console.log(req.body, "*****");
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.username = req.body.username;
    user.phone = req.body.phone;
    user.email = req.body.email;
    user.citizen = req.body.citizen;
    user.isActive = req.body.isActive ? true : false;
    user.walletAddress = req.body.walletAddress;
    user.xDaiWallet = req.body.xDaiWallet;
    user.type = req.body.type
    user.save()
    user.setRoles([Number(req.body.role)]).then(() => {
      console.log(`${user.email} updated success`);
      res.send({ message: 'User updated successfully!' })
    })
  })
}

exports.checkWallet = (req, res) => {
  User.findOne({
    where:{
      id: req.body.id
    }
  }).then(user => {
    let status = false
    console.log(req.body.info);
    if(req.body.info == 'xDai')
    {
      if(!user.xDaiWallet)
        status = true
    }
    else {
      if(!user.walletAddress)
        status = true
    } 
    res.status(200).send({
      status: status
    })
  })
}

exports.checkMultiWallet = (req, res) => {
  let condition = {};
  if(req.body.wallet)
    condition['walletAddress'] = req.body.wallet;
  else if(req.body.xDaiWallet)
    condition['xDaiWallet'] = req.body.xDaiWallet;
  User.findOne({
    where:condition
  }).then(user => {
    let status = false
    if(!user)
      status = true
    res.status(200).send({
      status: status
    })
  })
}

exports.updateCard = (req, res) => {
  User.findOne({
    where: {
      id: req.body.id,
    }
  }).then(user => {
    if (!user) {
      res.status(400).send({
        message: 'Order not found',
      })
    }

    user.card = req.body.card;
    user.save()
    res.status(200).send({
      message: 'Card sumbit successfully',
    })
  })
}

exports.updateRoleType = (req, res) => {
  User.findOne({
    where: {
      id: req.body.id,
    }
  }).then(user => {
    if (!user) {
      res.status(400).send({
        message: 'Order not found',
      })
    }

    user.type = req.body.type;
    user.save()
    user.setRoles([req.body.role]).then(() => {
      res.status(200).send({
        message: 'User approved successfully',
      })
    })
  })
}

