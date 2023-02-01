const {authJwt} = require('../middleware')
const controller = require('../controllers/user.controller')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    )
    next()
  })

  // app.get('/api/test/all', controller.allAccess)
  // app.get('/api/test/user', [authJwt.verifyToken], controller.userBoard)
  // app.get('/api/test/mod', [authJwt.verifyToken, authJwt.isModerator], controller.moderatorBoard)
  // app.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard)

  app.get('/api/user', controller.getUsers);
  app.post('/api/user/approve', controller.approve);
  app.post('/api/user/img', controller.getImagUser);
  app.post('/api/admin/user', controller.createUser);
  app.post('/api/admin/user/update', controller.saveUser);
  app.post('/api/admin/user/check', controller.checkWallet);
  app.post('/api/admin/user/checkMulti', controller.checkMultiWallet);
  app.post('/api/admin/user/update/card', controller.updateCard);
  app.post('/api/admin/user/updateroletype', controller.updateRoleType);
}
