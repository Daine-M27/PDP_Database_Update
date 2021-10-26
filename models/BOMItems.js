const mongoose = require("mongoose");

const bomItemsSchema = mongoose.Schema({
  BasePrice: Number,
  CatalogCategoryPK: Number,
  CatalogIdentifierID: Number,
  ComponentType: String,
  ComponentTypeID: Number,
  Cost: Number,
  Description: String,
  Inactive: Boolean,
  IsSelected: Boolean,
  ItemPK: Number,
  MFGPartNumber: String,
  OrderBy: Number,
  PartLength: Number,
  PartNumber: String,
  ProductComment: String,
  ProductDecisionBomRuleID: Number,
  ProductSeriesID: Number,
  Pull: Boolean,
  Quantity: Number,
  QuotePrice: Number,
  RouterPK: Number,
  SequenceNumber: Number,
  StandardCost: Number,
  SuggestedPrice: Number,
  UnitOfMeasureSetFK: Number,
  VendorPartNumber: String,
  _isSelected: Boolean,
  CatalogIDs: [],
  ComponentTypeIDs: [],
});

module.exports = mongoose.model(
  "bomItems",
  bomItemsSchema,
  "bomItemsCollection"
);
