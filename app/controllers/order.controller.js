const db = require('../models')
const sendEmail = require('./auth.controller').sendEmail;
const Order = db.order
const User = db.user
const Token = db.token
const Referral = db.referral
const Site = db.site

exports.getOrders = (req, res) => {
  const count = Number(req.query.count) ? Number(req.query.count) : 2000;
  let condition = {
    limit: count,
    order: ['createdAt'],
  };
  if (req.query.type === 'sell') {
    condition['where'] = {
      orderType: req.query.type
    }
  }
  if (req.query.id) {
    condition['where'] = {
      ...condition['where'],
      userId: req.query.id
    }
  }
  Order.findAll(condition)
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json({ message: err.message })
    })
}

exports.getWhitelist = (req, res) => {
  Order.findAll({
    where: {
      paymentMethod: "whitelist",
      orderType:'buy'
    }
  })
  .then(data => {
    Order.findAll({
      where: {
        paymentMethod: "whitelist",
        orderType: "sell"
      }
    }).then(data__ => {
      let ordersClone = [];
      console.log(data__.length, "count")
      for(let item of data)
      {
        item.details = JSON.parse(item.details);
        for(let item__ of data__)
        {
          console.log(item__.details.hash, "console")
          details = JSON.parse(item__.details);
          if(item.details.hash == details.hash)
          {
            item.dataValues.ownerId = item__.userId;
            item.dataValues.sellId = item__.id;
          }
        }
        ordersClone.push(item)
      }
      res.status(200).json(ordersClone)
    })
  })
  .catch(err => {
    res.status(500).json({ message: err.message })
  })
}

exports.getOwners = (req, res) => {
  Order.findAll({
    where: {
      paymentMethod: "whitelist",
      orderType: "sell"
    }
  })
  .then(result => {
    res.status(200).json(result)
  })
  .catch(err => {
    res.status(500).json({ message: err.message })
  })
}

exports.getUserOrder = (req, res) => {
  console.log("the transfer")
  // const count = Number(req.query.count) ? Number(req.query.count) : 20
  // console.log('order param',req.query);
  Order.findAll({
    where: {
      userId: id
    }
  })
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json({ message: err.message })
    })
}

const updateReferral = (customerId, totalPrice) => {
  Referral.findOne({
    where: {
      customer: customerId
    }
  }).then((referral) => {
    if (referral) {
      console.log('before________________________________')
      Site.findAll({
        limit: 1,
        order: ['createdAt'],
      })
        .then(result => {
          if (result[0]['referralCommision'] && parseFloat(result[0]['referralCommision']) > 0) {

            let com = parseFloat((totalPrice / 100) * parseFloat(result[0]['referralCommision'])).toFixed(2);
            if (parseFloat(referral.amount) > 0) {
              referral.amount = Number(referral.amount) + Number(com);
              console.log('amount', referral.amount)
            }
            else {
              referral.amount = com;
            }
            referral.save();
            console.log('save time________________________________', result[0]['referralCommision'], totalPrice,)
          }
        })
        .catch(err => {
          console.log({ message: err.message })
        })

    }
  })
}

exports.createOrder = (req, res) => {
  console.log('[date]', req.body);
  Order.create({
    userId: req.body.userId,
    status: req.body.status,
    totalPrice: req.body.totalPrice,
    count: req.body.count,
    paymentMethod: req.body.paymentMethod,
    details: req.body.details,
    signatureId: req.body.signatureId,
    orderType: req.body.orderType,
    times: ""
  }).then(result => {
    if (result) {

      updateReferral(req.body.userId, req.body.totalPrice)

      let details = JSON.parse(req.body.details);
      details.forEach(element => {
        Token.findOne({
          where: {
            tokenAddress: element.tokenAddress
          }
        }).then(token => {
          // console.log("token available",token.available, element.tokenQuantity);
          token.available = token.available - element.tokenQuantity;
          token.save();
        }).catch((e) => {
          console.log(e)
        })
      });

      res.status(200).send({
        message: 'Site setting created successfully',
      })
      sendEmail(req.email, 'Order created', 'Your order created successfully.');
    } else {
      res.status(400).send({
        message: 'Please try again',
      })
      sendEmail(req.email, 'Order approved', 'Order created failed');
    }
  }).catch(err => {
    console.log(err);
    res.status(500).send({ message: 'Server error' })
  })
}

exports.checkOrderDiscount = (req, res) => {
  Referral.findOne({
    where: {
      customer: req.body.id
    }
  }).then(result => {
    if(result)
    {
      Order.findOne({
        where:{ userId: req.body.id}
      }).then(result__ => {
        if(!result__) {
          Site.findAll({
            limit: 1,
            order: ['createdAt'],
          })
            .then(result1__ => {
              console.log(result1__[0]['refferalorder'], 'SITE')
              if (result1__[0]['refferalorder'] && parseFloat(result1__[0]['refferalorder']) > 0) {
                res.status(200).send({
                  referral: parseFloat(result1__[0]['refferalorder'])
                })
              }
            })
            .catch(err => {
              console.log({ message: err.message })
            })
        }
      })
    }
  }) 
}

exports.saveOrder = (req, res) => {
  console.log(req.body, "the order save");
  Order.findOne({
    where: {
      id: req.body.id,
    }
  }).then(order => {
    if (!order) {
      res.status(400).send({
        message: 'Order not found',
      })
    }
    //get date
    const d = new Date();
    const allsecond = d.getFullYear() * 365.25 * 60 * 60 * 24 + d.getMonth() * 60 * 60 * 24 * 30 + d.getDate() * 60 * 60 * 24 + d.getHours() * 60 * 60 + d.getMinutes() * 60 + d.getSeconds();
    order.userId = req.body.userId
    order.status = req.body.status
    order.totalPrice = req.body.totalPrice
    order.count = req.body.count
    order.paymentMethod = req.body.paymentMethod;
    order.details = req.body.details;
    order.signatureId = req.body.signatureId;
    order.orderType = req.body.orderType || null;
    order.times = allsecond;
    order.save()
    res.status(200).send({
      message: 'Order approved successfully',
    })
    if (req.body.status === 'complete') {
      User.findOne({
        where: {
          id: req.body.userId
        }
      }).then(user => {
        sendEmail(user.email, 'Token transfered', 'Your token transfered successfully');
      })
    }
  })
}

exports.addWalletAddress = (req, res) => {
  console.log(req.body, "the dtra dkdd");
  Order.findOne({
    where: {
      id: req.body.id,
    }
  }).then(async (order) => {
    // console.log(order.count, "sell token data");
    // const json = JSON.parse(order.dataValues.details);
    // let selltoken = await Order.findOne({
    //   where: {
    //     id: req.body.id,
    //   }
    // });
    // let selltokencount = await Order.findAll({
    //   where: {
    //     userId: selltoken.userId,
    //     orderType: "buy",
    //   }
    // });
    // let count = 0;
    // for (let k = 0; k < selltokencount.length; k++) {
    //   let alljson = JSON.parse(selltokencount[k].dataValues.details);
    //   if (json.productId == alljson.productId) {
    //     console.log(selltokencount[k].dataValues.count,)
    //     // count = order.dataValues.count - selltokencount[k].dataValues.count;
    //     // if (count >= 0) {

    //     // }

    //     console.log(selltokencount[k].dataValues.count, "number");

    //   }
    //   console.log(selltokencount[k].count)

    // }
    // console.log(selltokencount.length, "but token count");




    if (!order) {
      res.status(400).send({
        message: 'Order not found',
      })
    }

    if (order.details && typeof order.details === 'string') {
      let detail = JSON.parse(order.details);
      let newData = [...detail];
      detail.forEach((data) => {
        newData = [];
        let __Data = { ...data }
        if (req.body.wallet) {
          __Data.toAddress = req.body.wallet
        }

        if (req.body.hash) {
          __Data.hash = req.body.hash
        }
        newData.push(__Data);
      })
      order.details = JSON.stringify(newData);
      if (req.body.status) {
        order.status = req.body.status
      }
      if(req.body.userId) {
        order.userId = req.body.userId
      }
      if(req.body.times) {
        const d = new Date();
        const allsecond = d.getFullYear() * 365.25 * 60 * 60 * 24 + d.getMonth() * 60 * 60 * 24 * 30 + d.getDate() * 60 * 60 * 24 + d.getHours() * 60 * 60 + d.getMinutes() * 60 + d.getSeconds();
        order.times = allsecond
      }
      order.save()
      res.status(200).send({
        message: 'Order updated successfully',
      })
    }

    if (req.body.status === 'complete') {
      User.findById(req.body.userId).then(user => {
        sendEmail(user.email, 'Token transfered', 'Your token transfered successfully');
      })
    }
  })
}


exports.getSellTokenWalletAddress = (req, res) => {
  Order.findAll({
    where: {
      userId: req.query.id,
      orderType: 'sell'
    },
  }).then(order => {
    if (!order) {
      res.status(400).send({
        message: 'Order not found',
      })
    }
    if (order) {

      let dataToReturn = {};
      for (let index = 0; index < order.length; index++) {
        const element = order[index];

        if (element.details && (JSON.parse(element.details))[0] && (JSON.parse(element.details))[0]['toAddress'] && !(JSON.parse(element.details))[0]['hash']) {

          dataToReturn['wallet'] = (JSON.parse(element.details))[0]['toAddress']
          dataToReturn['orderId'] = element['id']
          dataToReturn['tokenQuantity'] = (JSON.parse(element.details))[0]['tokenQuantity']
          break;
        }

      }
      res.status(200).send(dataToReturn)
    }

  })
}
//generate the report
exports.setReport = (req, res) => {
  const d = new Date();
  const allsecond = d.getFullYear() * 365.25 * 60 * 60 * 24 + d.getMonth() * 60 * 60 * 24 * 30 + d.getDate() * 60 * 60 * 24 + d.getHours() * 60 * 60 + d.getMinutes() * 60 + d.getSeconds();
  Order.update({ f_totalprice: 0, times: allsecond }, {
    where: {
      orderType: "buy"
    }
  }).then(async (property) => {
    res.status(200).send("paymentok")
  })

}