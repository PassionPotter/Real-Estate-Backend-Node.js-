module.exports = (sequelize, Sequelize) => {
  const Blog = sequelize.define('blogs', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: { type: Sequelize.INTEGER },
      title: { type: Sequelize.STRING },
      thumbnail: { type: Sequelize.STRING },
      content: { type: Sequelize.BLOB },
      date: { type: Sequelize.DATE },
  })
  return Blog
}
