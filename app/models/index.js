const config = require('../config/db.config.js')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle,
    },
    logging: false
  }
)
// const sequelize = new Sequelize('postgres://ovowufad:MDm1Hb0KToWg9S6fIF8fsKoHsHgCPKDr@otto.db.elephantsql.com/ovowufad')

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.site = require('../models/site.model.js')(sequelize, Sequelize)
db.user = require('../models/user.model.js')(sequelize, Sequelize)
db.role = require('../models/role.model.js')(sequelize, Sequelize)
db.property = require('../models/property.model.js')(sequelize, Sequelize)
db.blog = require('../models/blog.model.js')(sequelize, Sequelize)
db.faq = require('../models/faq.model.js')(sequelize, Sequelize)
db.cart = require('../models/cart.model.js')(sequelize, Sequelize)
db.token = require('../models/token.model.js')(sequelize, Sequelize)
db.comment = require('../models/comment.model.js')(sequelize, Sequelize)
db.team = require('../models/team.model.js')(sequelize, Sequelize)
db.order = require('../models/order.model.js')(sequelize, Sequelize)
db.credential = require('../models/credential.model.js')(sequelize, Sequelize)
db.verify = require('../models/verify.model.js')(sequelize, Sequelize)
db.visit = require('../models/visit.model.js')(sequelize, Sequelize)
db.affUrl = require('./affUrl.model.js')(sequelize, Sequelize)
db.coupon = require('../models/coupon.model.js')(sequelize, Sequelize)
db.referral = require('../models/referral.model.js')(sequelize, Sequelize)
db.payout = require('../models/payout.model.js')(sequelize, Sequelize)
db.paymentType = require('../models/paymentType.model.js')(sequelize, Sequelize)
db.setting = require('../models/setting.model.js')(sequelize, Sequelize)
db.lifeCustomer = require('../models/lifeCustomer.model.js')(sequelize, Sequelize);
db.refund = require('../models/refund.model.js')(sequelize, Sequelize);
db.newsletter = require('../models/newsletter.model.js')(sequelize, Sequelize)
db.callrequest = require('../models/callrequest.model.js')(sequelize, Sequelize)
db.checkoutFormData = require('../models/checkoutFormData.model.js')(sequelize, Sequelize)
db.blogsNew = require('../models/blogsNew.model.js')(sequelize, Sequelize)
db.Howworks = require('../models/howworks.model.js')(sequelize, Sequelize)
db.quiz = require('../models/quiz.model.js')(sequelize, Sequelize)
db.quizAnswer = require('../models/quizAnswer.model.js')(sequelize, Sequelize)

/******************* Refund **********************/
db.user.hasMany(db.refund, {
  foreignKey: 'userId',
  sourceKey: 'id',
});

db.refund.belongsTo(db.user, {
  foreignKey: 'userId',
  sourceKey: 'id'
});


db.token.hasMany(db.refund, {
  foreignKey: 'tokenId',
  sourceKey: 'id'
});

db.refund.belongsTo(db.token, {
  foreignKey: 'tokenId',
  sourceKey: 'id'
});


// db.affcommission.belongsTo(db.users, {
//   foreignKey: 'userId',
//   sourceKey: 'id'
// });

/******************* User **********************/
// with role
db.role.belongsToMany(db.user, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId',
})

db.user.belongsToMany(db.role, {
  through: 'user_roles',
  foreignKey: 'userId',
  otherKey: 'roleId',
})

/******************* Blog **********************/
// with user
db.user.hasMany(db.blog, {
  foreignKey: 'userId',
  sourceKey: 'id',
})
db.blog.belongsTo(db.user, {
  foreignKey: 'userId',
  targetKey: 'id',
})
// with comment
db.blog.hasMany(db.comment, {
  foreignKey: 'blogId',
  sourceKey: 'id',
})
db.comment.belongsTo(db.blog, {
  foreignKey: 'blogId',
  targetKey: 'id',
})

/******************* Token **********************/
// with property
db.property.hasMany(db.token, {
  foreignKey: 'propertyId',
  sourceKey: 'id',
})
db.token.belongsTo(db.property, {
  foreignKey: 'propertyId',
  targetKey: 'id',
})

db.user.hasMany(db.coupon, { foreignKey:'userId', sourceKey: 'id'});
db.coupon.belongsTo(db.user, { foreignKey:'userId', targetKey: 'id'});

/******************* Cart **********************/
// with user
db.user.hasMany(db.cart, {
  foreignKey: 'userId',
  sourceKey: 'id',
})
db.cart.belongsTo(db.user, {
  foreignKey: 'userId',
  targetKey: 'id',
})
// with property
db.property.hasMany(db.cart, {
  foreignKey: 'propertyId',
  sourceKey: 'id',
})
db.cart.belongsTo(db.property, {
  foreignKey: 'userId',
  targetKey: 'id',
})

/******************* Others **********************/
// with payment method
db.paymentType.hasMany(db.order, {
  foreignKey: 'paymentTypeId',
  sourceKey: 'id',
})
db.order.belongsTo(db.paymentType, {
  foreignKey: 'paymentTypeId',
  targetKey: 'id',
})
// with user
db.user.hasMany(db.order, {
  foreignKey: 'userId',
  sourceKey: 'id',
})
db.order.belongsTo(db.user, {
  foreignKey: 'userId',
  targetKey: 'id',
})
// verify relation
// with user
db.user.hasMany(db.verify, {
  foreignKey: 'userId',
  sourceKey: 'id',
})
db.verify.belongsTo(db.user, {
  foreignKey: 'userId',
  targetKey: 'id',
})

db.ROLES = ['user', 'moderator', 'admin']
db.TYPES = ['basic', 'gold', 'premium']
module.exports = db
