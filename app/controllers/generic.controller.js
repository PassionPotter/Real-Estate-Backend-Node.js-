
const fs = require('fs');

exports.saveCookiesJson = (req, res) => {
  const cookies = req.body.cookiesJson;
  
  try {
    fs.writeFileSync('./generic_json_data/cookies.json',cookies,{encoding:'utf8',flag:'w'})   
    res.status(200).json({message:' saved successfully'}) 
  } catch (err) {
    res.status(500).json({message: err.message})
  }
  
}

exports.getCookiesJson = (req, res) => {
    

    fs.readFile('./generic_json_data/cookies.json', 'utf8' , (err, data) => {
        if (err) {
          res.status(500).json({message: err.message})
          return
        }
        res.status(200).json(data)
      })
    
  }

  exports.saveGeneralInformationJson = (req, res) => {
    const generalInformation = req.body.generalInformationJson;
    
    try {
      fs.writeFileSync('./generic_json_data/generalinformation.json',generalInformation,{encoding:'utf8',flag:'w'})   
      res.status(200).json({message:' saved successfully'}) 
    } catch (err) {
      res.status(500).json({message: err.message})
    }
    
  }

  exports.getGeneralInformationJson = (req, res) => {
    

    fs.readFile('./generic_json_data/generalinformation.json', 'utf8' , (err, data) => {
        if (err) {
          res.status(500).json({message: err.message})
          return
        }
        res.status(200).json(data)
      })
    
  }



  exports.savePrivacyPolicyJson = (req, res) => {
    const privacyPolicy = req.body.privacyPolicyJson;
    
    try {
      fs.writeFileSync('./generic_json_data/privacypolicy.json',privacyPolicy,{encoding:'utf8',flag:'w'})   
      res.status(200).json({message:' saved successfully'}) 
    } catch (err) {
      res.status(500).json({message: err.message})
    }
    
  }

  exports.getPrivacyPolicyJson = (req, res) => {
    

    fs.readFile('./generic_json_data/privacypolicy.json', 'utf8' , (err, data) => {
        if (err) {
          res.status(500).json({message: err.message})
          return
        }
        res.status(200).json(data)
      })
    
  }

exports.saveHowItWorksJson = (req, res) => {
    const howItWorks = req.body.howItWorksJson;
    
    try {
      fs.writeFileSync('./generic_json_data/howitworks.json',howItWorks,{encoding:'utf8',flag:'w'})   
      res.status(200).json({message:' saved successfully'}) 
    } catch (err) {
      res.status(500).json({message: err.message})
    }
    
  }

  exports.getHowItWorksJson = (req, res) => {
    

    fs.readFile('./generic_json_data/howitworks.json', 'utf8' , (err, data) => {
        if (err) {
          res.status(500).json({message: err.message})
          return
        }
        res.status(200).json(data)
      })
    
  }

  exports.saveFaqsNewJson = (req, res) => {
    const faqsNew = req.body.faqsNewJson;
    
    try {
      fs.writeFileSync('./generic_json_data/faqsnew.json',faqsNew,{encoding:'utf8',flag:'w'})   
      res.status(200).json({message:' saved successfully'}) 
    } catch (err) {
      res.status(500).json({message: err.message})
    }
    
  }

  exports.getFaqsNewJson = (req, res) => {
    

    fs.readFile('./generic_json_data/faqsnew.json', 'utf8' , (err, data) => {
        if (err) {
          res.status(500).json({message: err.message})
          return
        }
        res.status(200).json(data)
      })
    
  }



