module.exports = (sequelize, Sequelize) => {
  const Refund = sequelize.define('refunds', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      tokenAmount: { type: Sequelize.FLOAT },
      userHash: { type: Sequelize.STRING },
      payHash: { type: Sequelize.STRING },
  });

  return Refund;
}
