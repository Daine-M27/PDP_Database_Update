require("dotenv").config({ path: ".env" });
const mongoose = require("mongoose");
const axios = require("axios");

// schemas
const ProductComponentOptions = require("./models/ProductComponentOptions");

// URLs
const optionsURL =
  "http://192.168.0.167:57206/SandBox/LsiUtilityService.svc/GetProductComponentOptions/82";

// database connection
try {
  mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@lsiproductconfigurator.5xm1k.mongodb.net/LSIProductConfigurator?retryWrites=true&w=majority&useUnifiedTopology=true&useNewUrlParser=true`
  );
  console.log("DB Connected");
} catch (error) {
  console.log(error);
}

const loadData = async () => {
  const results = await axios.get(optionsURL);
  const optionDataResults = results.data.GetProductComponentOptionsResult;

  // upload each document
  try {
    for (const result of optionDataResults) {
      const filter = { ParentDecisionNodeID: result.ParentDecisionNodeID };
      const options = { upsert: true, returnNewDocument: true };

      await ProductComponentOptions.collection.findOneAndReplace(
        filter,
        result,
        options
      )
      .then(replacedDocument => {
        // log to database for error records
        if(replacedDocument){
          if (replacedDocument.value !== null) {
            console.log(`Successfully replaced document with ParentDecisionNodeID: ${replacedDocument.value.ParentDecisionNodeID}`)
          } else {
            console.log(`New document created with _id: ObjectId("${replacedDocument.lastErrorObject.upserted}")`)
          }
        }
        else{
          console.log('No Document found with query')
        }        
      })
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
