const db = require('../models')
const Referral = db.referral
const Coupon = db.coupon
const User = db.user
const couponCode = require('coupon-code');
var Promise = require('bluebird');

exports.getReferrals = (req, res) => {
  let condition = {
    order: ['createdAt'],
    where: {
        userId: req.query.ID
    }
  };
  Referral.findAll(condition)
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json({message: err.message})
    })
}

exports.createCoupon = (req, res) => {
  generateUniqueCode().then(function(code) {
    let insertData = {
      userId: req.body.id,
      coupon: code,
      amount: req.body.amount
    }
    Referral.update(
      {
        amount: 0
      },
      {where: {userId: req.body.id}}
    ).then(result => {
      Coupon.create(insertData).then(result => {
        Coupon.findAll({
          where: {userId: req.body.id}
        }).then(re => {
          res.status(200).json(re);
        })
      });
    })
  });
  
}

exports.delCommission = (req, res) => {
  Coupon.destroy({
    where: {
      id: req.body.id
    }
  }).then(result => {
    Coupon.findAll({
      where: {
        coupon: 'cash'
      },
    }).then(re => {
      User.findAll({})
      .then(users => {
        dataCom = [];
        for(let coupon of re)
        {
          for(let user of users){
            if(user.id == coupon.userId)
            {
              data = {
                id: coupon.id,
                amount: coupon.amount,
                userId: user.id,
                username: user.username
              };
              dataCom.push(data);
            }
          }
        }
        res.status(200).json(dataCom)
      })
    })
  })
}

exports.getCommission = (req, res) => {
  Coupon.findAll({
    where: {
      coupon: 'cash'
    },
  }).then(re => {
    User.findAll({})
    .then(users => {
      dataCom = [];
      for(let coupon of re)
      {
        for(let user of users){
          if(user.id == coupon.userId)
          {
            data = {
              id: coupon.id,
              amount: coupon.amount,
              userId: user.id,
              username: user.username
            };
            dataCom.push(data);
          }
        }
      }
      res.status(200).json(dataCom)
    })
  })
}

exports.createCash = (req, res) => {
  let insertData = {
    userId: req.body.id,
    coupon: 'cash',
    amount: req.body.amount
  }
  Referral.update(
    {
      amount: 0
    },
    {where: {userId: req.body.id}}
  ).then(result => {
    Coupon.create(insertData).then(result => {
      Coupon.findAll({
        where: {userId: req.body.id}
      }).then(re => {
        res.status(200).json(re);
      })
    });
  })
}

exports.checkCoupon = (req, res) => {
  Coupon.findAll({
    where: {
      userId: req.body.id,
      coupon: req.body.coupon
    }
  }).then(result => {
      res.status(200).json(result);
  })
}

exports.updateCoupon = (req, res) => {
  console.log(req.body.id, req.body.coupon)
  Coupon.findOne({
    where: {
      userId: req.body.id,
      coupon:req.body.coupon
    }
  }).then(result => {
    if(result?.amount == req.body.amount) {
      Coupon.destroy({
        where: {
          userId: req.body.id,
          coupon: req.body.coupon
        }
      })
    }
    else {
      result.amount = Number(result.amount) - Number(req.body.amount);
      result.save()
    }
  })
}

exports.getCoupon = (req, res) => {
  Coupon.findAll({
    where:{
      userId: req.query.id
    }
  }).then(result => {
    res.status(200).json(result)
  })
}

var count = 0;
// this is code that checks uniqueness and returns a promise
function check(code) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      count++;
      // first resolve with false, on second try resolve with true
      if (count === 1) {
        resolve(false);
      } else {
        resolve(true);
      }
    }, 1000);
  });
}

var generateUniqueCode = Promise.method(function() {
  var code = couponCode.generate();
  return check(code)
    .then(function(result) {
      if (result) {
        return code;
      } else {
        return generateUniqueCode();
      }
    });
});
