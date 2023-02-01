const {authJwt} = require('../middleware')
const controller = require('../controllers/site.controller')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    )
    next()
  })

  app.post('/api/admin/site', [authJwt.verifyToken, authJwt.isAdmin], controller.saveSiteSetting)
  app.get('/api/site', controller.getSiteSetting)
}