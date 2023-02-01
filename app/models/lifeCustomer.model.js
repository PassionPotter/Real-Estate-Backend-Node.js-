module.exports = (sequelize, Sequelize) => {
  const LifeCustomer = sequelize.define('lifeCustomers', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: { type: Sequelize.INTEGER },
      status: { type: Sequelize.INTEGER },
      totalPrice: { type: Sequelize.FLOAT },
      count: { type: Sequelize.INTEGER },
      paymentMethod: { type: Sequelize.INTEGER },
  })
  return LifeCustomer
}
