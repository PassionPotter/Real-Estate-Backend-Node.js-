module.exports = (sequelize, Sequelize) => {
  const Property = sequelize.define('properties', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    address1: { type: Sequelize.STRING },
    address2: { type: Sequelize.STRING },
    pos_latitude: { type: Sequelize.FLOAT },
    pos_longitude: { type: Sequelize.FLOAT },
    imageData: { type: Sequelize.TEXT },  //  string to array

    rentStartsDate: { type: Sequelize.DATE },
    monthlyRentPerToken: { type: Sequelize.FLOAT },
    tokenValue: { type: Sequelize.FLOAT },
    generatedToken: { type: Sequelize.FLOAT },

    propertyType: { type: Sequelize.STRING },
    neighborhood: { type: Sequelize.STRING },
    squareFeet: { type: Sequelize.FLOAT },
    lotSize: { type: Sequelize.FLOAT },
    bedroomOrBath: { type: Sequelize.STRING },
    constructionYear: { type: Sequelize.FLOAT },
    currentStatusOfProperty: { type: Sequelize.STRING },
    section8: { type: Sequelize.STRING },

    monthlyGrossRent: { type: Sequelize.FLOAT },
    monthlyCosts: { type: Sequelize.FLOAT },
    propertyManagementFee: { type: Sequelize.FLOAT },
    platformFee: { type: Sequelize.FLOAT },
    tax: { type: Sequelize.FLOAT },
    insuranceFee: { type: Sequelize.FLOAT },
    utility: { type: Sequelize.STRING },   //---------------------------------7

    assetPrice: { type: Sequelize.FLOAT },
    fee: { type: Sequelize.FLOAT },
    initMaintainanceReserve: { type: Sequelize.FLOAT },   //--------------------3

    basic: { type: Sequelize.INTEGER },
    gold: { type: Sequelize.INTEGER },
    premium: { type: Sequelize.INTEGER },
    propertyDetail: { type: Sequelize.TEXT },
    marketEvaluation: { type: Sequelize.TEXT },
    longTermAssetManagement: { type: Sequelize.STRING },
    hoursToPublish: { type: Sequelize.STRING },
    etherScanLink: { type: Sequelize.STRING },
    rentstate: { type: Sequelize.STRING },
    time: { type: Sequelize.STRING },
    //invest & finance
    projectIRR:{type:Sequelize.FLOAT},
    maintenanceExpenses:{type:Sequelize.FLOAT},
    renovationUpgrade:{type:Sequelize.FLOAT},
    operatingExpenseReimbursement:{type:Sequelize.FLOAT},
    vacancyReserve:{type:Sequelize.FLOAT},
    initialRenovationReserve:{type:Sequelize.FLOAT},
    administrativeFee:{type:Sequelize.FLOAT},

    projectedAppreciation:{type:Sequelize.FLOAT},

    //details
    stories:{type:Sequelize.INTEGER},
    totalUnits:{type:Sequelize.INTEGER},
    office:{type:Sequelize.INTEGER},
    heating:{type:Sequelize.STRING},
    cooling:{type:Sequelize.STRING},
    buildingClass:{type:Sequelize.STRING},
    foundation:{type:Sequelize.STRING},
    exteriorWall:{type:Sequelize.STRING},
    parking:{type:Sequelize.STRING},
    renovated:{type:Sequelize.STRING},
    propertyManager:{type:Sequelize.STRING},
    roofType:{type:Sequelize.STRING},
    
    propertyClass:{type:Sequelize.STRING},

    //documents
    documentURL:{type:Sequelize.STRING},
    //blockchain
    identifier:{type:Sequelize.STRING},
    etherDate:{type:Sequelize.STRING},
    etherContractAddrress:{type:Sequelize.STRING},
    etherOwnerWallet:{type:Sequelize.STRING},
    gNosisContractAddress:{type:Sequelize.STRING},
    gNosisOwnerWallet:{type:Sequelize.STRING},
    gNosisLevins:{type:Sequelize.STRING},

    //market
    marketEvaluationTitle:{type:Sequelize.STRING},
    evaluationImg:{type:Sequelize.STRING},
    marketEvaluationImgTitle:{type:Sequelize.STRING},

    //newly added
    bedRoomBath:{type:Sequelize.INTEGER},
    xDaiLink:{type:Sequelize.STRING},
    gMapImg:{type:Sequelize.STRING},
    mapCode:{type:Sequelize.TEXT},

    hellosignlink:{type:Sequelize.STRING},
 
  })
  return Property
}
