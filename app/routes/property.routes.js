const { authJwt } = require('../middleware')
const controller = require('../controllers/property.controller')
const path = require('path')
const fs = require('fs')
const multer = require('multer')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    )
    next()
  })

  app.post('/api/admin/image/upload', function (req, res) {
    var rootPath = __dirname.slice(0, -11)
    var file = JSON.parse(JSON.stringify(req.files))
    // console.log('[file]', file);
    var imgPaths = [];
    if (!Array.isArray(file.img))
      file.img = [file.img];
    for (let i = 0; i < file.img.length; i++) {
      let img = file.img[i];
      const time = new Date().valueOf()
      var file_name = rootPath + '/public/' + (time + '_' + img.name)
      //if you want just the buffer format you can use it
      var buffer = new Buffer.from(img.data)

      /*await*/
      // fs.writeFile(file_name, buffer), async (err) => {
      //   console.log('Successfully Written to File.')
      //   fs.unlink(rootPath + '/public/images' + file_name, () => {
      //   })
      //   console.log(time + '_' + img.name)
      //   imgPaths.push(time + '_' + img.name);
      // })
      fs.writeFile(file_name, buffer, (err) => {
        if (err) throw err;
        // console.log('Successfully Written to File.')
        fs.unlink(rootPath + '/public/images' + file_name, () => {
        })
        // console.log(time + '_' + img.name)
        imgPaths.push(time + '_' + img.name);
        if (i === file.img.length - 1) {
          console.log(imgPaths);
          res.send({ imgPaths })
        }
      })
    }
  })

  app.post('/api/propertydata', controller.getpropertydata)
  app.post('/api/admin/property', [authJwt.verifyToken, authJwt.isAdmin], controller.createProperty)
  app.post('/api/admin/property/update', [authJwt.verifyToken, authJwt.isAdmin], controller.updateProperty)
  app.get('/api/property', controller.getProperties),
    app.get('/api/property/id', controller.getPropertyById),
    app.get('/api/admin/rent', controller.rentcalculation),
    app.get('/api/admin/rentcalculation', controller.rent_calculation);
  app.post('/api/admin/state', controller.tokenstate);


}
