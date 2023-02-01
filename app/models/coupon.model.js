module.exports = (sequelize, Sequelize) => {
    const Coupon = sequelize.define('affcommssions', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: { type: Sequelize.INTEGER },
      amount: { type: Sequelize.FLOAT },
      coupon: { type: Sequelize.STRING }
    })
    return Coupon
}