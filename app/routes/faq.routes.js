const {authJwt} = require('../middleware')
const controller = require('../controllers/faq.controller')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    )
    next()
  })

  app.post('/api/admin/faq/update', [authJwt.verifyToken, authJwt.isAdmin], controller.saveFaq)
  app.post('/api/admin/faq', [authJwt.verifyToken, authJwt.isAdmin], controller.createFaq)
  app.get('/api/faq', controller.getFaqs)
  app.get('/api/faq/id',controller.getFaqsById )
}