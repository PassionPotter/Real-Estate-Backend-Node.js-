const {authJwt} = require('../middleware')
const controller = require('../controllers/token.controller')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    )
    next()
  })

  app.post('/api/admin/token/update', [authJwt.verifyToken, authJwt.isAdmin], controller.saveToken)
  app.post('/api/admin/token', [authJwt.verifyToken, authJwt.isAdmin], controller.createToken)
  app.get('/api/token', controller.getTokens)
}