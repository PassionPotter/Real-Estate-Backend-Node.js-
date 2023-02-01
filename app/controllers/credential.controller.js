const db = require('../models')
const Credential = db.credential

exports.getCredentials = (req, res) => {
  const count = Number(req.query.count) ? Number(req.query.count) : 20
  Credential.findAll({
    limit: count,
    order: ['createdAt'],
  })
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json({message: err.message})
    })
}

exports.saveCredential = (req, res) => {
  Credential.findOne({
    where: {
      id: req.body.id,
    }
  }).then(credential => {
    if (!credential) {
      res.status(400).send({
        message: 'Credential not found',
      })
    }
    console.log(req.body.idVerificationLink, req.body.idAuthKey);
    credential.statusApi = req.body.statusApi;
    credential.blockchainId = req.body.blockchainId;
    credential.infuraProjectEndpoint = req.body.infuraProjectEndpoint;
    credential.networkId = req.body.networkId;
    credential.xDaiEndpoint = req.body.xDaiEndpoint;
    credential.walletPublicKey = req.body.walletPublicKey;
    credential.walletPrivateKey = req.body.walletPrivateKey;
    credential.paypalAppClientId = req.body.paypalAppClientId;
    credential.coinbaseApiKey = req.body.coinbaseApiKey;
    credential.hellosignApiKey = req.body.hellosignApiKey;
    credential.hellosignClientId = req.body.hellosignClientId;
    credential.googleMapsApiKey = req.body.googleMapsApiKey;
    credential.chatLink = req.body.chatLink;
    credential.email = req.body.email;
    credential.emailPassword = req.body.emailPassword;
    credential.idVerificationLink = req.body.idVerificationLink;
    credential.idAuthKey = req.body.idAuthKey;
    credential.save()
    res.status(200).send({
      message: 'Credential approved successfully',
    })
  })
}
