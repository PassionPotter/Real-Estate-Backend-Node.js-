module.exports = (sequelize, Sequelize) => {
  const Token = sequelize.define('tokens', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: { type: Sequelize.INTEGER },
    tokenAddress: { type: Sequelize.STRING },
    tokenSymbol: { type: Sequelize.STRING },
    propertyId: { type: Sequelize.INTEGER },
    purchasePrice: { type: Sequelize.FLOAT },
    salePrice: { type: Sequelize.FLOAT },
    quantity: { type: Sequelize.INTEGER },
    available: { type: Sequelize.INTEGER},

    
  })
  return Token
}
