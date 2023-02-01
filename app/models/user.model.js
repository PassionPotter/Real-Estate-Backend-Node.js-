module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('users', {
    firstname: { type: Sequelize.STRING },
    lastname: { type: Sequelize.STRING },
    phone: { type: Sequelize.STRING },
    citizen: { type: Sequelize.STRING },
    username: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
    walletAddress: { type: Sequelize.STRING },
    isActive: { type: Sequelize.BOOLEAN },
    verificationString: { type: Sequelize.STRING },
    type: { type: Sequelize.INTEGER },
    card: { type: Sequelize.STRING },
    xDaiWallet: { type: Sequelize.STRING }
  })
  return User
}

