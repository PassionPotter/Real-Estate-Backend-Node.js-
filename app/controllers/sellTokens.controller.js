const db = require('../models')
const moment = require('moment')
const sendEmail = require('./auth.controller').sendEmail;
const Order = db.order
const Sequelize = db.Sequelize
const Property = db.property
const Token = db.token

exports.getSellTokenPropertiesData = (req, res) => {
  const count = Number(req.query.count) ? Number(req.query.count) : 20
  let userId = Number(req.query.ID)
  let buyBackPeriod = Number(req.query.period)
  Order.findAll({
    where: {
        userId: userId,
        createdAt:{
            [Sequelize.Op.gt]: moment().subtract(buyBackPeriod, 'days')
        },
        orderType: {
            [Sequelize.Op.or]: ['buy', 'sell']
        }
    },
    order: ['createdAt'],
  })
    .then(result => {

        if(result){
            let newObj = {}
            result.forEach((data)=>{
                // console.log(JSON.parse(data.details));
                let innerData = JSON.parse(data.details);
                innerData.forEach((data__)=>{
                    let ids = Object.keys(newObj);
                    if(ids.length && ids.indexOf(String(data__.productId))>-1){
                        
                        newObj[data__.productId] = {
                            ...newObj[data__.productId],
                            tokenQuantity: (data.orderType==='buy'?(parseInt(newObj[data__.productId].tokenQuantity) || 0)+parseInt(data__.tokenQuantity):(parseInt(newObj[data__.productId].tokenQuantity) || 0)-parseInt(data__.tokenQuantity))
                            }
                    }
                    else
                    {
                        
                        newObj[data__.productId] = data__
                    }
                })
            })
            console.log(newObj);
            if((Object.keys(newObj)).length){

                Property.findAll({
                    where:{  
                        id: {
                            [Sequelize.Op.in]:[...((Object.keys(newObj)).map(Number))]
                        }
                    }
                }).then((__result)=>{
                    
                    if(__result){
                        let ids = (Object.keys(newObj)).map(Number)
                        __result.forEach((data)=>{
                            if(ids.indexOf(data.id)>-1){
                                newObj[data.id] = {
                                    ...newObj[data.id],
                                    title: data.address1
                                }
                            }
                        })
                      Token.findAll({
                        where:{
                          propertyId: {
                            [Sequelize.Op.in]:[...((Object.keys(newObj)).map(Number))]
                          }
                        }
                      }).then((tokens)=>{
                        if(tokens){
                          tokens.forEach((token)=>{
                            newObj[token.propertyId] = {
                              ...newObj[token.propertyId],
                              tokenAddress: token.tokenAddress
                            }
                          })
                        }
                      })
                      res.status(200).json(Object.values(newObj))
                    }
                })
            }


        }


    //   res.status(200).json([])

    })
    .catch(err => {
      res.status(500).json({message: err.message})
    })
}

exports.saveSellTokenOrderData = (req, res) => {
    console.log('[date]', req.body);
    const d = new Date();
    let allsecond = d.getFullYear() * 365.25 * 60 * 60 * 24 + d.getMonth() * 60 * 60 * 24 * 30 + d.getDate() * 60 * 60 * 24 + d.getHours() * 60 * 60 + d.getMinutes() * 60 + d.getSeconds();
    Order.create({
      userId: req.body.userId,
      status: req.body.status,
      totalPrice: req.body.totalPrice,
      count: req.body.count,
      paymentMethod: req.body.paymentMethod,
      details: req.body.details,
      signatureId: req.body.signatureId,
      orderType: req.body.orderType,
      dineliFee: req.body.dineliFee,
      processingFee: req.body.processingFee,
      times: allsecond
    }).then(result => {
      if (result) {
        
  
        res.status(200).send({
          message: 'Sell Token request created successfully',
        })
        sendEmail(req.email, 'Sell token Order created', 'Your order created successfully.');
      } else {
        res.status(400).send({
          message: 'Please try again',
        })
        sendEmail(req.email, 'Order approved', 'Order created failed');
      }
    }).catch(err => {
      console.log(err);
      res.status(500).send({message: 'Server error'})
    })
  }

