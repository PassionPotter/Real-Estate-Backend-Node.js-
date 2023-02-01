module.exports = (sequelize, Sequelize) => {
  const UserType = sequelize.define('usertypes', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
  })
  return UserType;
}


