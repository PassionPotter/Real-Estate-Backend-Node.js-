module.exports = (sequelize, Sequelize) => {
  const Faq = sequelize.define('faqs', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: { type: Sequelize.STRING },
      description: { type: Sequelize.STRING },
  })
  return Faq
}
