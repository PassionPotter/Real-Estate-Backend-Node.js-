module.exports = (sequelize, Sequelize) => {
  const Payout = sequelize.define('payouts', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: { type: Sequelize.INTEGER },
      amount: { type: Sequelize.FLOAT },
      payMethod: { type: Sequelize.INTEGER },
      status: { type: Sequelize.INTEGER },
  })
  return Payout
}
