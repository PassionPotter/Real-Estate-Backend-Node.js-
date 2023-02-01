const { verifySignUp } = require('../middleware')
const controller = require('../controllers/auth.controller')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    )
    next()
  })

  app.post('/api/auth/signup', [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted], controller.signup)
  app.post('/api/auth/signin', controller.signin)
  app.get('/api/auth/verify/:verificationString', controller.verifyEmail)
  app.post('/api/auth/resetPassword', controller.resetPassword);
  app.post('/api/auth/resetNewPassword', controller.resetNewPassword);
}
