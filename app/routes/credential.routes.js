const {authJwt} = require('../middleware')
const controller = require('../controllers/credential.controller')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    )
    next()
  })

  app.post('/api/admin/credential/update', [authJwt.verifyToken, authJwt.isAdmin], controller.saveCredential)
  app.get('/api/credential', controller.getCredentials)
}