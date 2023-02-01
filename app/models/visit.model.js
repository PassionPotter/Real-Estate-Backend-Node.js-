module.exports = (sequelize, Sequelize) => {
  const Visit = sequelize.define('visits', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: { type: Sequelize.INTEGER },
    url: { type: Sequelize.STRING },
    refferUrl: { type: Sequelize.STRING },
    isConverted: { type: Sequelize.BOOLEAN },
  })
  return Visit
}
