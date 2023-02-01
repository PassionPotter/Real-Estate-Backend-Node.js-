module.exports = (sequelize, Sequelize) => {
  const AffUrl = sequelize.define('affUrls', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: { type: Sequelize.INTEGER },
    url: { type: Sequelize.STRING },
  })
  return AffUrl
}
