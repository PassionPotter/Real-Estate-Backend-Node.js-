module.exports = (sequelize, Sequelize) => {
  const Cart = sequelize.define('carts', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: { type: Sequelize.INTEGER },
    propertyId: { type: Sequelize.INTEGER },
    purchasePrice: { type: Sequelize.FLOAT },
    quantity: { type: Sequelize.INTEGER },
  })
  return Cart
}
