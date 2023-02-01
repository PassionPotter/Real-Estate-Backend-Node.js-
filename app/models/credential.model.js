module.exports = (sequelize, Sequelize) => {
  const Credential = sequelize.define('credentials', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      blockchainId: { type: Sequelize.INTEGER },
      infuraProjectEndpoint: { type: Sequelize.STRING },
      networkId: { type: Sequelize.INTEGER },
      xDaiEndpoint: { type: Sequelize.STRING },
      statusApi: { type: Sequelize.STRING },
      walletPublicKey: { type: Sequelize.STRING },
      walletPrivateKey: { type: Sequelize.STRING },
      paypalAppClientId: { type: Sequelize.STRING },
      coinbaseApiKey: { type: Sequelize.STRING },
      hellosignApiKey: { type: Sequelize.STRING },
      hellosignClientId: { type: Sequelize.STRING },
      googleMapsApiKey: { type: Sequelize.STRING },
      chatLink: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      emailPassword: { type: Sequelize.STRING },
      idVerificationLink: { type: Sequelize.STRING },
      idAuthKey: { type: Sequelize.STRING}

  })
  return Credential
}
