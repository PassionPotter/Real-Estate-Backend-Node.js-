const {authJwt} = require('../middleware')
const controller = require('../controllers/howworks.controller')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    )
    next()
  })

  app.post('/api/admin/howworks/update', [authJwt.verifyToken, authJwt.isAdmin], controller.saveHowworks)
  app.post('/api/admin/howworks', [authJwt.verifyToken, authJwt.isAdmin], controller.createHowworks)
  app.get('/api/howworks', controller.getHowworks)
  app.get('/api/howworks/id',controller.getHowWorksById )
}