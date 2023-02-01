module.exports = (sequelize, Sequelize) => {
    const Quiz = sequelize.define('quizs', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        title: { type: Sequelize.STRING },
        panswer: { type: Sequelize.STRING },
        type: { type: Sequelize.STRING },
    })
    return Quiz
  }
  