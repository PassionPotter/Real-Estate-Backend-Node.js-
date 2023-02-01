module.exports = (sequelize, Sequelize) => {
  const Site = sequelize.define('sites', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: { type: Sequelize.STRING },
    description: { type: Sequelize.STRING },
    keywords: { type: Sequelize.STRING },
    address: { type: Sequelize.TEXT },
    telephone: { type: Sequelize.STRING },
    language: { type: Sequelize.STRING },
    videoLink: { type: Sequelize.STRING },
    youtube: { type: Sequelize.STRING },
    twitter: { type: Sequelize.STRING },
    linkedin: { type: Sequelize.STRING },
    twitch: { type: Sequelize.STRING },
    englishtelegram: { type: Sequelize.STRING },
    spanishtelegram: { type: Sequelize.STRING },
    frenchtelegram: { type: Sequelize.STRING },
    germantelegram: { type: Sequelize.STRING },
    russiantelegram: { type: Sequelize.STRING },
    discord: { type: Sequelize.STRING },
    trustpilot: { type: Sequelize.STRING },
    rarible: { type: Sequelize.STRING },
    wechat: { type: Sequelize.STRING },
    weibo: { type: Sequelize.STRING },
    kawasakiSocial: { type: Sequelize.STRING },
    languageSocial: { type: Sequelize.STRING },
    tokenBuyBackPeriod: { type: Sequelize.STRING },
    referralCommision: { type: Sequelize.STRING },
    refferalorder: { type:Sequelize.STRING }
  })
  return Site
}
