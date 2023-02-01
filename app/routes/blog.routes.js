const {authJwt} = require('../middleware')
const controller = require('../controllers/blog.controller')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    )
    next()
  })

  app.post('/api/admin/blog/update', [authJwt.verifyToken, authJwt.isAdmin], controller.saveBlog)
  app.post('/api/admin/blog', [authJwt.verifyToken, authJwt.isAdmin], controller.createBlog)
  app.get('/api/blog', controller.getBlogs)
}