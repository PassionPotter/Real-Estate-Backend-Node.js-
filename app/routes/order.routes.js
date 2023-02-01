const { authJwt } = require('../middleware')
const controller = require('../controllers/order.controller')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    )
    next()
  })

  app.post('/api/admin/order/update', [authJwt.verifyToken], controller.saveOrder)
  app.post('/api/admin/order', [authJwt.verifyToken], controller.createOrder)
  app.post('/api/admin/orderAddWallet', [authJwt.verifyToken], controller.addWalletAddress)
  app.get('/api/order', controller.getOrders)
  app.get('/api/order/whitelist', controller.getWhitelist)
  app.get('/api/order/owner', controller.getOwners)
  app.get('/api/getSellTokenWalletAddress', controller.getSellTokenWalletAddress)
  app.get('/api/order/:uid', controller.getUserOrder)
  app.post('/api/admin/reportdata', controller.setReport)
  app.post('/api/order/checkDiscount', controller.checkOrderDiscount)
}