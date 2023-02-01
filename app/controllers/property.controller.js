const db = require('../models')
const sendEmail = require('./auth.controller').sendEmail;
const moment = require('moment');
const Property = db.property
const Order = db.order;
const Token = db.token;
const User = db.user

exports.getProperties = (req, res) => {
  const count = Number(req.query.count) ? Number(req.query.count) : 20

  let filters = {
    limit: count,
    order: [['id', 'DESC']],
  };
  if (['lowToHigh', 'highToLow', 'recent'].indexOf(req.query.sortFilter) > -1) {
    let filter_object = {
      'lowToHigh': [['tokenValue', 'ASC']],
      'highToLow': [['tokenValue', 'DESC']],
      'recent': [['createdAt', 'DESC']]
    }
    filters.order = filter_object[req.query.sortFilter]
  }
  Property.findAll(filters)
    .then(async result => {
      let payload = result.map(item => {
        let singleItem = { ...item.dataValues };
        singleItem.timerToShow = false;
        if (singleItem.hoursToPublish) {

          let maxTime = moment(singleItem.updatedAt).add(singleItem.hoursToPublish, 'hours')
          if (moment().isBefore(maxTime)) {
            let duration = moment.duration(maxTime.diff(moment()))
            singleItem.timerToShow = `${duration.days()}__${(duration.hours() * 60 * 60 * 1000) + (duration.minutes() * 60 * 1000) + (duration.seconds() * 1000)}`;
          }
        }
        return singleItem;
      });
      let data = [];
      // console.log(payload);
      for (let item of payload) {
        let token = await Token.findOne({ where: { propertyId: item.id } });
        if (token) {
          token = token.dataValues;
          let tokenId = token.id;
          delete token.id;
          delete token.createdAt;
          delete token.updatedAt;
          data.push({ ...item, ...token, tokenId: tokenId });
        } else
          data.push({ ...item });
      }

      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json({ message: err.message })
    })
}

exports.getPropertyById = (req, res) => {
  const ID = req.query.ID
  let option = { id: ID }

  console.log('[getPropById] test it ', option);

  Property.findOne({ where: option })
    .then(async result => {
      let singleItem = { ...result.dataValues };
      singleItem.timerToShow = false;
      if (singleItem.hoursToPublish) {

        let maxTime = moment(singleItem.updatedAt).add(singleItem.hoursToPublish, 'hours')
        if (moment().isBefore(maxTime)) {
          let duration = moment.duration(maxTime.diff(moment()))
          singleItem.timerToShow = `${duration.days()}__${(duration.hours() * 60 * 60 * 1000) + (duration.minutes() * 60 * 1000) + (duration.seconds() * 1000)}`;
        }
      }
      result = singleItem;

      let token = await Token.findOne({ where: { propertyId: result.id } });

      if (token) {
        token = token.dataValues;
        delete token.id;
        delete token.createdAt;
        delete token.updatedAt;

        let payload = { ...result, ...token };

        res.status(200).json(payload)
      } else {
        res.status(200).json({ ...result });
      }

    })
    .catch(err => {
      // console.log(err.message)
      res.status(500).json({ message: err.message })
    })
}

exports.createProperty = (req, res) => {

  req.body.imageData = req.body.imageData.join(',') // converting imageData into String
  req.body.evaluationImg = req.body.evaluationImg.join(',');
  req.body.gMapImg = req.body.gMapImg.join(',');
  Property.create(req.body).then(property => {
    if (property) {
      res.status(200).send({
        message: 'House Property registration Success'
      })
      console.log(`property #${property.id} created`);
      sendEmail(req.email, 'Property registered', `Propery created success`);
    } else {
      res.status(400).send({
        message: 'Please try again.'
      })
    }
  }).catch(err => {
    res.status(500).send({ message: 'Server error' })

  })
}

exports.updateProperty = (req, res) => {
  if (req.body.imageData)
    req.body.imageData = req.body.imageData.join(',') // converting imageData into String
    Property.findOne({
    where: {
      id: req.body.id,
    }
  }).then(property => {
    if (!property) {
      res.status(400).send({
        message: 'Please try again.'
      })
    }
    else {
      console.log(req.body);
      // property = { ...property, ...req.body.data };
      property.address1 = req.body.address1;
      property.address2 = req.body.address2;
      property.pos_latitude = req.body.pos_latitude;
      property.pos_longitude = req.body.pos_longitude;
      if (req.body.imageData) {
        property.imageData = req.body.imageData
      }
      property.rentStartsDate = req.body.rentStartsDate;
      property.monthlyRentPerToken = req.body.monthlyRentPerToken;
      property.tokenValue = req.body.tokenValue;
      property.generatedToken = req.body.generatedToken;
      property.propertyType = req.body.propertyType;
      property.neighborhood = req.body.neighborhood;
      property.squareFeet = req.body.squareFeet;
      property.lotSize = req.body.lotSize;
      property.bedroomOrBath = req.body.bedroomOrBath;
      property.constructionYear = req.body.constructionYear;
      property.currentStatusOfProperty = req.body.currentStatusOfProperty;
      property.section8 = req.body.section8;

      property.monthlyGrossRent = req.body.monthlyGrossRent;
      property.monthlyCosts = req.body.monthlyCosts;
      property.propertyManagementFee = req.body.propertyManagementFee;
      property.platformFee = req.body.platformFee;
      property.tax = req.body.tax;
      property.insuranceFee = req.body.insuranceFee;
      property.utility = req.body.utility;
      property.assetPrice = req.body.assetPrice;
      property.fee = req.body.fee;
      property.initMaintainanceReserve = req.body.initMaintainanceReserve;
      property.basic = req.body.basic;
      property.gold = req.body.gold;
      property.premium = req.body.premium;
      property.propertyDetail = req.body.propertyDetail;
      property.marketEvaluation = req.body.marketEvaluation;
      property.longTermAssetManagement = req.body.longTermAssetManagement;
      property.hoursToPublish = req.body.hoursToPublish;
      property.etherScanLink = req.body.etherScanLink;


      property.projectIRR = req.body.projectIRR;
      property.maintenanceExpenses = req.body.maintenanceExpenses;
      property.renovationUpgrade = req.body.renovationUpgrade;
      property.operatingExpenseReimbursement = req.body.operatingExpenseReimbursement;
      property.vacancyReserve = req.body.vacancyReserve;
      property.administrativeFee = req.body.administrativeFee;
      property.projectedAppreciation = req.body.projectedAppreciation;
      property.stories = req.body.stories;
      property.totalUnits = req.body.totalUnits;
      property.office = req.body.office;
      property.heating = req.body.heating;
      property.cooling = req.body.cooling;
      property.buildingClass = req.body.buildingClass;
      property.foundation = req.body.foundation;
      property.exteriorWall = req.body.exteriorWall;
      property.parking = req.body.parking;
      property.renovated = req.body.renovated;
      property.propertyManager = req.body.propertyManager;

      property.roofType = req.body.roofType;
      property.propertyClass = req.body.propertyClass;
      property.documentURL = req.body.documentURL;
      property.identifier = req.body.identifier;
      property.etherDate = req.body.etherDate;
      property.etherContractAddrress = req.body.etherContractAddrress;
      property.etherOwnerWallet = req.body.etherOwnerWallet;
      property.gNosisContractAddress = req.body.gNosisContractAddress;


      property.gNosisOwnerWallet = req.body.gNosisOwnerWallet;
      property.gNosisLevins = req.body.gNosisLevins;
      property.marketEvaluationTitle = req.body.marketEvaluationTitle;
      property.marketEvaluationImgTitle = req.body.marketEvaluationImgTitle;
      property.evaluationImg = req.body.evaluationImg;
      property.bedRoomBath = req.body.bedRoomBath;
      property.xDaiLink = req.body.xDaiLink;
      property.gMapImg = req.body.gMapImg;
      property.ini = req.body.xDaiLink;
      property.initialRenovationReserve = req.body.initialRenovationReserve;

      property.mapCode = req.body.mapCode;
      property.hellosignlink = req.body.hellosignlink;
      property.save()
      return res.status(200).send({
        message: 'House Property update Success'
      })
    }
    sendEmail(req.email, 'Property updated', `Propery updated success`);
  }).catch(err => {
    console.log(err);
    res.status(500).send({ message: 'Server error' })

  })
}
exports.tokenstate = (req, res) => {
  const d = new Date();
  const allsecond = d.getFullYear() * 365.25 * 60 * 60 * 24 + d.getMonth() * 60 * 60 * 24 * 30 + d.getDate() * 60 * 60 * 24 + d.getHours() * 60 * 60 + d.getMinutes() * 60 + d.getSeconds();
  Property.update({ rentstate: req.body.state, time: allsecond }, {
    where: {
      id: req.body.id,
    }
  }).then(async (property) => {

    let alldata = await Token.findOne({
      where: {
        propertyId: req.body.id,
      }
    });
    let orderdata = await Order.findAll({});
    for (let k = 0; k < orderdata.length; k++) {
      const json = JSON.parse(orderdata[k].dataValues.details);
      if (Array.isArray(json) && json.length) {
        const address = json[0].tokenAddress
        if (alldata.tokenAddress == address) {
          if (req.body.state == "Disable") {
            let propertydata = await Property.findOne({
              where: {
                id: req.body.id,
              }
            });
            let firstTotalPersRent = Number((((propertydata.monthlyGrossRent - propertydata.monthlyCosts) * 12) / (31557600 * propertydata.generatedToken)).toFixed(25)) * orderdata[k].count;
            let differencentsecond = allsecond - orderdata[k].times;
            let totalprice = Number(orderdata[k].f_totalprice) + Number(firstTotalPersRent * differencentsecond);
            console.log(totalprice, "the total price");
            Order.update({ f_totalprice: totalprice }, {
              where: {
                id: orderdata[k].id,
              }
            }).then(property => {
              console.log(property, "the state update");
            });

          }
          else {
            Order.update({ times: allsecond }, {
              where: {
                id: orderdata[k].id,
              }
            }).then(property => {
              console.log(allsecond, "the date update");
            });
          }
        }

      }
    }
    return res.status(200).send({
      message: 'House Property update Success'
    })
  });

}

exports.getpropertydata = (req, res) => {

  console.log(req.body.id);
  Order.findAll({
    where: {
      userId: req.body.id,
      status: "complete"
    }
  }).then(async (orderdata) => {
    try {
      const count = orderdata.length;
      sellData = {}
      for(let i = 0; i < count; i ++)
      {
        if(orderdata[i].dataValues.orderType == 'sell')
        {
          const details = JSON.parse(orderdata[i].dataValues.details);
          userId = orderdata[i].userId;
          if(!sellData[userId])
            sellData[userId] = {};
          if(!sellData[userId][details[0].productId])
            sellData[userId][details[0].productId] = Number(orderdata[i].dataValues.count)
          else sellData[userId][details[0].productId] += Number(orderdata[i].dataValues.count)
        }
      }
      let token_count = 0;
      let serveraldata = [];
      console.log(sellData, 'sell')
      if (count != 0) {
        for (let i = 0; i < count; i++) {
          const json = JSON.parse(orderdata[i].dataValues.details);
          if (orderdata[i].orderType == "sell") continue;
          token_count = orderdata[i].dataValues.count;
          console.log(token_count, 'buy')
          userbuy = orderdata[i].userId;
          if(userbuy in sellData) {
            if(json[0].productId in sellData[userbuy]) {
              if(sellData[userbuy][json[0].productId] >= token_count)
              {
                sellData[userbuy][json[0].productId] -= token_count;
                token_count = 0;
              }
              else {
                token_count -= sellData[userbuy][json[0].productId];
                sellData[userbuy][json[0].productId] = 0;
              }
            }
          }
          if (Array.isArray(json) && json.length && token_count != 0) {
            console.log(token_count, 'remain')
            const address = json[0]?.tokenAddress;
            console.log('address', address);
            let data = await Token.findOne({
              where: {
                tokenAddress: address,
              }
            });
            const owndata = data?.dataValues?.propertyId;
            let alldata = await Property.findOne({
              where: {
                id: owndata,
              }
            });
            alldata.dataValues.count = token_count;
            serveraldata.push(alldata.dataValues);
          }

        }
        console.log("======severaldata=========");
        console.log(serveraldata)
        res.send(serveraldata);
      }
    } catch (error) {
      console.log(error)
    }

  });


}
exports.rentcalculation = (req, res) => {

  let home = [];
  const d = new Date();
  let allsecond = d.getFullYear() * 365.25 * 60 * 60 * 24 + d.getMonth() * 60 * 60 * 24 * 30 + d.getDate() * 60 * 60 * 24 + d.getHours() * 60 * 60 + d.getMinutes() * 60 + d.getSeconds();
  Property.findAll({
    where: {
      rentstate: "Stop"
    }
  }).then(response => {
    for (let k = 0; k < response.length; k++) {
      let element = response[k].dataValues;
      element.time = allsecond - element.time;
      home.push(element);
    }
    res.send(home);
  });
}
exports.rent_calculation = async (req, res) => {
  let token_count = 0;
  let userbuy;
  let serveraldata = [];
  let differencentsecond = 0;
  let oridinaltime = 0;
  let sellData = {};
  let dataAll = [];
  const orderdata = await Order.findAll({
    where: {
      status: "complete",
      orderType: "sell"
    }
  });
      const count = orderdata.length;
      console.log(count)
      if (count != 0) {
        for(let i = 0; i < count; i ++) {
          let userId = orderdata[i].userId;
          details = JSON.parse(orderdata[i].dataValues.details);
          data = {
            userId: orderdata[i].userId,
            propertyId: details[0].productId,
            count: orderdata[i].count,
            times: orderdata[i].times
          };
          console.log(data, 'data')
          dataAll.push(data)
          if(!sellData[userId])
            sellData[userId] = {};
          if(!sellData[userId][details[0].productId])
            sellData[userId][details[0].productId] = Number(orderdata[i].dataValues.count)
          else sellData[userId][details[0].productId] += Number(orderdata[i].dataValues.count)
        }
      }
  Order.findAll({
    where: {
      status: "complete",
      orderType: "buy"
    }
  }).then(async (orderBuy) => {
    try {
      const d = new Date();
      for (let i = 0; i < orderBuy.length; i++) {
        const json = JSON.parse(orderBuy[i].dataValues.details);
        token_count = orderBuy[i].count;
        userbuy = orderBuy[i].userId;
        let allsecond = d.getFullYear() * 365.25 * 60 * 60 * 24 + d.getMonth() * 60 * 60 * 24 * 30 + d.getDate() * 60 * 60 * 24 + d.getHours() * 60 * 60 + d.getMinutes() * 60 + d.getSeconds();
        console.log(allsecond, "allsecond");
        differencentsecond = allsecond - orderBuy[i].dataValues.times;
        sellCount = 0;
        if(userbuy in sellData) {
          console.log("HHHHHHHHHHHH")
          if(json[0].productId in sellData[userbuy])
          {
            // if(sellData[userbuy][json[0].productId] >= token_count)
            // {
            //   sellData[userbuy][json[0].productId] -= token_count;
            // }
            // else {
            //   token_count -= sellData[userbuy][json[0].productId];
            //   sellData[userbuy][json[0].productId] = 0;
            // }
            for(let j = 0; j < dataAll.length; j ++) {
              if(dataAll[j].propertyId == json[0].productId && dataAll[j].userId == userbuy)
              {
                console.log(userbuy)
                if(dataAll[j].count >= token_count)
                {
                  dataAll[j].count -= token_count;
                  differencentsecond = dataAll[j].times - orderBuy[i].dataValues.times;
                  sellCount = 0;
                  if(differencentsecond <= 0)
                    token_count = 0
                  if (Array.isArray(json) && json.length && token_count != 0 && differencentsecond > 0) {
                    const address = json[0].tokenAddress;
                    let data = await Token.findOne({
                      where: {
                        tokenAddress: address,
                      }
                    });
                    let usernames = await User.findOne({
                      where: {
                        id: userbuy,
                      }
                    });
                    const owndata = data.dataValues.propertyId;
                    let alldata = await Property.findOne({
                      where: {
                        id: owndata,
                      }
                    });
                    //fix
                    alldata.dataValues.orderId = userbuy;
                    alldata.dataValues.storeprice = orderBuy[i].f_totalprice;
                    alldata.dataValues.seconds = differencentsecond;
                    alldata.dataValues.count = token_count;
                    alldata.dataValues.username = usernames.dataValues.username;
                    alldata.dataValues.walletAddress = usernames.dataValues.walletAddress;
                    serveraldata.push(alldata.dataValues);
                    break
                  }
                }
                else {
                  token_count -= dataAll[j].count;
                  sellCount += dataAll[j].count;
                  dataAll[j].count = 0;
                  differencentsecond = dataAll[j].times - orderBuy[i].dataValues.times;
                  if (Array.isArray(json) && json.length && sellCount != 0 && differencentsecond > 0) {
                    const address = json[0].tokenAddress;
                    let data = await Token.findOne({
                      where: {
                        tokenAddress: address,
                      }
                    });
                    let usernames = await User.findOne({
                      where: {
                        id: userbuy,
                      }
                    });
                    const owndata = data.dataValues.propertyId;
                    let alldata = await Property.findOne({
                      where: {
                        id: owndata,
                      }
                    });
                    //fix
                    alldata.dataValues.orderId = userbuy;
                    alldata.dataValues.storeprice = orderBuy[i].f_totalprice;
                    alldata.dataValues.seconds = differencentsecond;
                    alldata.dataValues.count = sellCount;
                    alldata.dataValues.username = usernames.dataValues.username;
                    alldata.dataValues.walletAddress = usernames.dataValues.walletAddress;
                    serveraldata.push(alldata.dataValues);
                  }
                }
              }
            }
            differencentsecond = allsecond - orderBuy[i].dataValues.times;
            if (Array.isArray(json) && json.length && token_count != 0 && differencentsecond > 0) {
              const address = json[0].tokenAddress;
              let data = await Token.findOne({
                where: {
                  tokenAddress: address,
                }
              });
              let usernames = await User.findOne({
                where: {
                  id: userbuy,
                }
              });
              const owndata = data.dataValues.propertyId;
              let alldata = await Property.findOne({
                where: {
                  id: owndata,
                }
              });
              //fix
              alldata.dataValues.orderId = userbuy;
              alldata.dataValues.storeprice = orderBuy[i].f_totalprice;
              alldata.dataValues.seconds = differencentsecond;
              alldata.dataValues.count = token_count;
              alldata.dataValues.username = usernames.dataValues.username;
              alldata.dataValues.walletAddress = usernames.dataValues.walletAddress;
              serveraldata.push(alldata.dataValues);
            }
          }
          else if (Array.isArray(json) && json.length && token_count != 0) {
            console.log("asdasd")
            const address = json[0].tokenAddress;
            let data = await Token.findOne({
              where: {
                tokenAddress: address,
              }
            });
            let usernames = await User.findOne({
              where: {
                id: userbuy,
              }
            });
            const owndata = data.dataValues.propertyId;
            let alldata = await Property.findOne({
              where: {
                id: owndata,
              }
            });
            //fix
            alldata.dataValues.orderId = userbuy;
            alldata.dataValues.storeprice = orderBuy[i].f_totalprice;
            alldata.dataValues.seconds = differencentsecond;
            alldata.dataValues.count = token_count;
            alldata.dataValues.username = usernames.dataValues.username;
            alldata.dataValues.walletAddress = usernames.dataValues.walletAddress;
            serveraldata.push(alldata.dataValues);
          }
        }
        else if (Array.isArray(json) && json.length && token_count != 0) {
          console.log("asdasd")
          const address = json[0].tokenAddress;
          let data = await Token.findOne({
            where: {
              tokenAddress: address,
            }
          });
          let usernames = await User.findOne({
            where: {
              id: userbuy,
            }
          });
          const owndata = data.dataValues.propertyId;
          let alldata = await Property.findOne({
            where: {
              id: owndata,
            }
          });
          //fix
          alldata.dataValues.orderId = userbuy;
          alldata.dataValues.storeprice = orderBuy[i].f_totalprice;
          alldata.dataValues.seconds = differencentsecond;
          alldata.dataValues.count = token_count;
          alldata.dataValues.username = usernames.dataValues.username;
          alldata.dataValues.walletAddress = usernames.dataValues.walletAddress;
          serveraldata.push(alldata.dataValues);
        }
      }

      res.send(serveraldata);
    }catch (error) {
      console.log(error);
    }
  })

}