// const {authJwt} = require('../middleware')
const controller = require('../controllers/referral.controller')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    )
    next()
  })
  
  
  // referrals getting for afilliate dasboard
  app.get('/api/getReferralsData', controller.getReferrals)
  app.post('/api/pay/request', controller.createCoupon)
  app.get('/api/pay/getCoupon', controller.getCoupon)
  app.post('/api/pay/checkCoupon', controller.checkCoupon)
  app.post('/api/pay/updateCoupon', controller.updateCoupon)
  app.post('/api/pay/requestCash', controller.createCash)
  app.get('/api/admin/commission', controller.getCommission)
  app.post('/api/admin/commission/del', controller.delCommission)
}