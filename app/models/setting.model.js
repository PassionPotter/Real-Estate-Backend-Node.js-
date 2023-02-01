module.exports = (sequelize, Sequelize) => {
  const Setting = sequelize.define('settings', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: { type: Sequelize.INTEGER },
    customSlug: { type: Sequelize.STRING },
    enableNewNotify: { type: Sequelize.BOOLEAN },
  })
  return Setting
}
