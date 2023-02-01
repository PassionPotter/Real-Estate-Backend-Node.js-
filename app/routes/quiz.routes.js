const {authJwt} = require('../middleware')
const controller = require('../controllers/quiz.controller')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    )
    next()
  })

//   app.post('/api/admin/faq/update', [authJwt.verifyToken, authJwt.isAdmin], controller.saveFaq)
  app.post('/api/admin/quiz', [authJwt.verifyToken, authJwt.isAdmin], controller.createQuiz)
  app.post('/api/admin/quiz/remove', [authJwt.verifyToken, authJwt.isAdmin], controller.removeQuiz)
  app.get('/api/quiz', controller.getQuizList)

  app.post('/api/sellproperty/answer', controller.createAnswer)
  app.post('/api/sellproperty/answerList', [authJwt.verifyToken, authJwt.isAdmin], controller.getAnswerList)


}