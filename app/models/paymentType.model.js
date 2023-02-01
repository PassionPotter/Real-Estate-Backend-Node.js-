module.exports = (sequelize, Sequelize) => {
  const PaymentType = sequelize.define('paymentTypes', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: { type: Sequelize.STRING },
      other: { type: Sequelize.STRING },
  })
  return PaymentType
}
