module.exports = (sequelize, Sequelize) => {
    const Newsletter = sequelize.define('newsletters', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: { type: Sequelize.STRING },
      
    })
    return Newsletter
  }
  