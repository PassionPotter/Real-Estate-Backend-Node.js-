const db = require('../models')
const Credential = db.credential


const hellosignSDK = require('hellosign-sdk'); 

exports.getHellosign = async (req, res) => {

  console.log('[hellosign entered]');

  const credential = await Credential.findOne();

  const hellosign = hellosignSDK({ key: credential.dataValues.hellosignApiKey });

  const opts = {
    test_mode: 1,
    clientId: credential.dataValues.hellosignClientId,
    title: 'NDA with Dineli',
    subject: 'The NDA we talked about',
    message: 'Please sign this NDA and then we can discuss more.',
    signers: [
      {
        email_address: req.body.email,
        name: req.body.name,
        order: req.body.order
      },
    ],
    files: ['NDA.pdf']
  };
  
  try {
    const signatureObj = await hellosign.signatureRequest.createEmbedded(opts);
    const signature = signatureObj.signature_request.signatures[0];
    const signatureId = signature.signature_id;
  
    const signUrl = await hellosign.embedded.getSignUrl(signatureId);

    console.log('[signUrl]', signUrl);

    res.status(200).json({ success: true, signUrl: signUrl.embedded.sign_url });

  } catch(err) {
    console.log('[err]', err);
    res.status(500).json({ success: false });
  }
  
  
  // .then((res) => {
  //   // console.log('[res]', res);
  //   const signature = res.signature_request.signatures[0];
  //   const signatureId = signature.signature_id;
  // }).catch((err) => {
  //   console.log('[err]', err);
  //   // handle error
  // });


  // res.status(200).json({ success: true });

  // const count = Number(req.query.count) ? Number(req.query.count) : 20
  // Hellosign.findAll({
  //   limit: count,
  //   order: ['createdAt'],
  // })
  //   .then(result => {
  //     res.status(200).json(result)
  //   })
  //   .catch(err => {
  //     res.status(500).json({message: err.message})
  //   })
}
