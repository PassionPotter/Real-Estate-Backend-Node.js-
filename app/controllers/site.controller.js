const db = require('../models')
const Site = db.site

exports.getSiteSetting = (req, res) => {
  Site.findAll({
    limit: 1,
    order: ['createdAt'],
  })
    .then(result => {
      console.log(result, 'site');
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json({message: err.message})
    })
}

exports.saveSiteSetting = (req, res) => {
  if (!req.body.id) {
    Site.create({
      title: req.body.title,
      description: req.body.description,
      keywords: req.body.keywords,
      telephone: req.body.telephone,
      address: req.body.address,
      language: req.body.language,
      tokenBuyBackPeriod: req.body.tokenBuyBackPeriod,
      referralCommision: req.body.referralCommision,
      refferalorder: req.body.refferalorder,
      videoLink: req.body.videoLink,
      youtube: req.body.youtube,
      twitter: req.body.twitter,
      linkedin: req.body.linkedin,
      twitch: req.body.twitch,
      englishtelegram: req.body.englishtelegram,
      spanishtelegram: req.body.spanishtelegram,
      frenchtelegram: req.body.frenchtelegram,
      germantelegram: req.body.germantelegram,
      russiantelegram: req.body.russiantelegram,
      discord: req.body.discord,
      trustpilot: req.body.trustpilot,
      rarible: req.body.rarible,
      wechat: req.body.wechat,
      weibo: req.body.weibo,
      kawasakiSocial: req.body.kawasakiSocial,
      languageSocial: req.body.languageSocial,
    }).then(site => {
      if (site) {
        return res.status(200).send({
          message: 'Site setting saved successfully',
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
    Site.findOne({
      where: {
        id: req.body.id,
      }
    }).then(site => {
      if (!site) {
        Site.create(req.body).then(site => {
          if (site) {
           return res.status(200).send({
              message: 'Site setting saved successfully',
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
        site.title = req.body.title
        site.description = req.body.description
        site.keywords = req.body.keywords
        site.address = req.body.address
        site.telephone = req.body.telephone
        site.language = req.body.language
        site.tokenBuyBackPeriod = req.body.tokenBuyBackPeriod
        site.referralCommision = req.body.referralCommision
        site.refferalorder = req.body.refferalorder
        site.videoLink = req.body.videoLink
        site.youtube = req.body.youtube
        site.twitter = req.body.twitter
        site.linkedin = req.body.linkedin
        site.twitch = req.body.twitch
        site.englishtelegram = req.body.englishtelegram
        site.spanishtelegram = req.body.spanishtelegram
        site.frenchtelegram = req.body.frenchtelegram
        site.germantelegram = req.body.germantelegram
        site.russiantelegram = req.body.russiantelegram
        site.discord = req.body.discord
        site.trustpilot = req.body.trustpilot
        site.rarible = req.body.rarible
        site.wechat = req.body.wechat
        site.weibo = req.body.weibo
        site.kawasakiSocial = req.body.kawasakiSocial
        site.languageSocial = req.body.languageSocial
        site.save()
        return res.status(200).send({
          message: 'Site setting saved successfully',
        })
      }
    })
  }
}
