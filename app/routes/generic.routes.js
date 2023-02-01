const {authJwt} = require('../middleware')
const controller = require('../controllers/generic.controller')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    )
    next()
  })

  app.post('/api/admin/saveCookiesData', [authJwt.verifyToken, authJwt.isAdmin], controller.saveCookiesJson)
  app.get('/api/getCookiesData', controller.getCookiesJson)

  
  app.post('/api/admin/saveGeneralInformationData', [authJwt.verifyToken, authJwt.isAdmin], controller.saveGeneralInformationJson)
  app.get('/api/getGeneralInformationData', controller.getGeneralInformationJson)

  app.post('/api/admin/savePrivacyPolicyData', [authJwt.verifyToken, authJwt.isAdmin], controller.savePrivacyPolicyJson)
  app.get('/api/getPrivacyPolicyData', controller.getPrivacyPolicyJson)

  app.post('/api/admin/saveHowItWorksData', [authJwt.verifyToken, authJwt.isAdmin], controller.saveHowItWorksJson)
  app.get('/api/getHowItWorksData', controller.getHowItWorksJson)
  
  app.post('/api/admin/saveFaqsNewData', [authJwt.verifyToken, authJwt.isAdmin], controller.saveFaqsNewJson)
  app.get('/api/getFaqsNewData', controller.getFaqsNewJson)

}