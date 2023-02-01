module.exports = (sequelize, Sequelize) => {
    const CheckoutFormData = sequelize.define('checkoutFormData', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: { type: Sequelize.INTEGER },
      firstName: { type: Sequelize.STRING },
      lastName: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      phone: { type: Sequelize.STRING },
      country: { type: Sequelize.STRING },
      streetAddress: { type: Sequelize.STRING },
      city: { type: Sequelize.STRING },
      zipCode: { type: Sequelize.STRING },
      
    })
    return CheckoutFormData
  }
  