const db = require('../models')
const CheckoutFormData = db.checkoutFormData


exports.getCheckoutFormData = (req, res) => {
    const ID = req.query.ID
    let option = { userId: ID }
  
  
    CheckoutFormData.findOne({ where: option })
      .then(async result => {
        console.log(result)
        if(result){
          result = result.dataValues;

          res.status(200).json(result);
        }
        else
        {
          res.status(200).json({message:'no data found'})
        }

      })
      .catch(err => {
        // console.log(err.message)
        res.status(500).json({ message: err.message })
      })
  }
  
  exports.saveCheckoutFormData = (req, res) => {
    let data__ = {
      userId: req.body.userId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        country: req.body.country,
        streetAddress: req.body.streetAddress,
        city: req.body.city,
        zipCode: req.body.zipCode,
    }
    if (!req.body.id) {
      CheckoutFormData.create({
        ...data__
      }).then(formdata => {
        if (formdata) {
          res.status(200).send({
            message: 'checkout form data saved successfully',
          })
        } else {
          res.status(400).send({
            message: 'Please try again',
          })
        }
      }).catch(err => {
        res.status(500).send({message: 'Server error'})
      })
    } else {
      CheckoutFormData.findOne({
        where: {
          id: req.body.id,
        }
      }).then(checkoutform => {
        if (!checkoutform) {

          res.status(404).send({message: 'This data does not belong to our system.'})
        } else {


          checkoutform.userId = req.body.userId;
          checkoutform.firstName = req.body.firstName
          checkoutform.lastName = req.body.lastName
          checkoutform.email = req.body.email
          checkoutform.phone = req.body.phone
          checkoutform.country = req.body.country
          checkoutform.streetAddress = req.body.streetAddress
          checkoutform.city = req.body.city
          checkoutform.zipCode = req.body.zipCode

          
          checkoutform.save()
          res.status(200).send({
            message: 'checkout form data updated successfully',
          })
        }
      })
    }
  }
  