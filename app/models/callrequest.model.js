module.exports = (sequelize, Sequelize) => {
    const Callrequest = sequelize.define('callrequest', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      phone: { type: Sequelize.STRING },
      description: { type: Sequelize.STRING },
      
    })
    return Callrequest
  }
  