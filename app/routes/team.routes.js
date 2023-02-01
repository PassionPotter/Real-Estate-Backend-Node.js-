const {authJwt} = require('../middleware')
const controller = require('../controllers/team.controller')
const fs = require('fs')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    )
    next()
  })

  app.post('/api/admin/team/update', [authJwt.verifyToken, authJwt.isAdmin], controller.saveTeam)
  app.post('/api/admin/team', [authJwt.verifyToken, authJwt.isAdmin], controller.createTeam)
  app.get('/api/admin/team/delete', controller.delTeam)
  app.get('/api/team', controller.getTeams)
}