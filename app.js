require("dotenv").config({ path: ".env" });
const mongoose = require("mongoose");
const axios = require("axios");

// schemas
const ProductComponentOptions = require("./models/ProductComponentOptions");
const BOMItems = require("./models/BOMItems")

// URLs
const optionsURL =
  "http://192.168.0.167:57206/SandBox/LsiUtilityService.svc/GetProductComponentOptions/82";

const bomURL =
  "http://192.168.0.167:57206/SandBox/LsiUtilityService.svc/GetProductBomItems/82";

// database connection
try {
  mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@lsiproductconfigurator.5xm1k.mongodb.net/LSIProductConfigurator?retryWrites=true&w=majority&useUnifiedTopology=true&useNewUrlParser=true`
  );
  console.log("DB Connected");
} catch (error) {
  console.log(error);
}

const loadData = async () => {  
  try {
    // -------------------component option data------------------- //
    const componentOptions = await axios.get(optionsURL);
    const optionDataResults = componentOptions.data.GetProductComponentOptionsResult;

    for (const result of optionDataResults) {
      const filter = { ParentDecisionNodeID: result.ParentDecisionNodeID };
      const options = { upsert: true, returnNewDocument: true };

      await ProductComponentOptions.collection
        .findOneAndReplace(filter, result, options)
        .then((replacedDocument) => {
          // log to database for error records
          if (replacedDocument) {
            if (replacedDocument.value !== null) {
              console.log(
                `Successfully replaced Component Option document with ParentDecisionNodeID: ${replacedDocument.value.ParentDecisionNodeID}`
              );
            } else {
              console.log(
                `New Component Option document created with _id: ObjectId("${replacedDocument.lastErrorObject.upserted}")`
              );
            }
          } else {
            console.log("No Document found with query");
          }
        });
    }

    // -------------------BOM item data------------------- //
    const bomItems = await axios.get(bomURL);
    const bomDataResults = bomItems.data.GetProductBomItemsResult;
    for (const item of bomDataResults) {
      const filter = { ProductDecisionBomRuleID: item.ProductDecisionBomRuleID };
      const options = { upsert: true, returnNewDocument: true };

      await BOMItems.collection
      .findOneAndReplace(filter, item, options)
      .then((replacedDocument) => {
        // log to database for error records
        if (replacedDocument) {
          if (replacedDocument.value !== null) {
            console.log(
              `Successfully replaced BOM document with ProductDecisionBomRuleID: ${replacedDocument.value.ProductDecisionBomRuleID}`
            );
          } else {
            console.log(
              `New BOM document created with _id: ObjectId("${replacedDocument.lastErrorObject.upserted}")`
            );
          }
        } else {
          console.log("No Document found with query");
        }
      });
    }

    // disconnect from database
    mongoose.connection.close();
    console.log("Connection Closed");
    
  } catch (error) {
    console.log(error);
    // disconnect from database
    mongoose.connection.close();
    console.log("Connection Closed");
  }
};

loadData();
