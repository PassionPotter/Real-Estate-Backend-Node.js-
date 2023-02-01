module.exports = (sequelize, Sequelize) => {
  const Team = sequelize.define('teams', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: Sequelize.STRING },
    job: { type: Sequelize.STRING },
    avatar: { type: Sequelize.STRING },
    content: { type: Sequelize.STRING },
  })
  return Team
}
