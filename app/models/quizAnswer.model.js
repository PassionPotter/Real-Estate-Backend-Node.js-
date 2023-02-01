module.exports = (sequelize, Sequelize) => {
    const QuizAnswer = sequelize.define('quizAnswers', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        answers: { type: Sequelize.TEXT }
    })
    return QuizAnswer
  }
  