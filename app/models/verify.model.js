module.exports = (sequelize, Sequelize) => {
  const Verify = sequelize.define('verifies', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: { type: Sequelize.INTEGER },
    content: { type: Sequelize.STRING },
    isVerified: { type: Sequelize.BOOLEAN },
  })
  return Verify
}
