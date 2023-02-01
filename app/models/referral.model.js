module.exports = (sequelize, Sequelize) => {
  const Referral = sequelize.define('referrals', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: { type: Sequelize.INTEGER },
    customer: { type: Sequelize.INTEGER },
    amount: { type: Sequelize.FLOAT },
    description: { type: Sequelize.STRING },
    status: { type: Sequelize.INTEGER },
  })
  return Referral
}
