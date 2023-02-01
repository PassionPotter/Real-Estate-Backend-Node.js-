const { authJwt } = require('../middleware')
const controller = require('../controllers/blogsNew.controller')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    )
    next()
  })

  app.post('/api/admin/blogsNew/create', [authJwt.verifyToken, authJwt.isAdmin], controller.createNewBlog)
  app.post('/api/admin/blogsNew/update', [authJwt.verifyToken, authJwt.isAdmin], controller.updateBlogsNew)
  app.get('/api/admin/blogsNew/del', controller.delPost);
  app.get('/api/blogsNew', controller.getBlogsNew)
  app.get('/api/blogsNewById', controller.getBlogsNewById)

}