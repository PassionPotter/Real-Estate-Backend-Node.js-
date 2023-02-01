require('dotenv').config();

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./app/config/db.config')
const fileUpload = require('express-fileupload')
const path = require('path')
let busboy = require('connect-busboy')

const app = express()
app.use(fileUpload())
app.use(busboy())
app.use(express.static('public'))

var corsOptions = {
  origin: '*'
}

app.use(cors(corsOptions))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const db = require('./app/models')
const Role = db.role

db.sequelize.sync().then(() =>
  (async function initial() {
    const cnt = await Role.count({})
    if (cnt === 0) {
      Role.create({ id: 1, name: 'user' })

      Role.create({ id: 2, name: 'moderator' })

      Role.create({ id: 3, name: 'admin' })
    }
  })()
)
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// simple route
// app.get('/', (req, res) => {
//   res.json({message: ''})
// })
// routes
require('./app/routes/auth.routes')(app)
require('./app/routes/user.routes')(app)
require('./app/routes/property.routes')(app)
require('./app/routes/site.routes')(app)
require('./app/routes/token.routes')(app)
require('./app/routes/team.routes')(app)
require('./app/routes/faq.routes')(app)
require('./app/routes/blog.routes')(app);
require('./app/routes/order.routes')(app);
require('./app/routes/hellosign.routes')(app);
require('./app/routes/credential.routes')(app);
require('./app/routes/email.routes')(app);
require('./app/routes/newsletter.routes')(app);
require('./app/routes/callrequest.routes')(app);
require('./app/routes/checkoutFormData.routes')(app);
require('./app/routes/generic.routes')(app);
require('./app/routes/sellTokens.routes')(app);
require('./app/routes/referral.routes')(app);
require('./app/routes/blogsNew.routes')(app);
require('./app/routes/howworks.routes')(app);
require('./app/routes/quiz.routes')(app);



app.use(express.static('frontend/build'));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
})

app.use(express.static(path.join(__dirname, "/public")));
app.use('/public', express.static('public'));

// set port, listen for requests
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})

