module.exports = (sequelize, Sequelize) => {
    const Howworks = sequelize.define('howworks', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        title: { type: Sequelize.STRING },
        description: { type: Sequelize.STRING },
    })
    return Howworks
  }
  