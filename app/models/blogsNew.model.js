module.exports = (sequelize, Sequelize) => {
    const Blog = sequelize.define('newBlogs', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        title: { type: Sequelize.STRING },
        content: { type: Sequelize.STRING },
    })
    return Blog
  }
  