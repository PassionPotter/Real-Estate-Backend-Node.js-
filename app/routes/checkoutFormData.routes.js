const {authJwt} = require('../middleware')
const controller = require('../controllers/checkoutFormData.controller')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    )
    next()
  })

  app.post('/api/saveCheckoutform', [authJwt.verifyToken], controller.saveCheckoutFormData)
  app.get('/api/getCheckoutform', controller.getCheckoutFormData)
}
