module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define('comments', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: { type: Sequelize.INTEGER },
      blogId: { type: Sequelize.INTEGER },
      title: { type: Sequelize.STRING },
      content: { type: Sequelize.BLOB },
  })
  return Comment
}
