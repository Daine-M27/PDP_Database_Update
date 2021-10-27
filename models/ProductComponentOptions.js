const mongoose = require("mongoose");

const componenteOptionSchema = mongoose.Schema({
  ComponentTypeName: String,
  IsEnabled: Boolean,
  IsNumberValue: Boolean,
  IsSeparator: Boolean,
  IsVisible: Boolean,
  OrderOfAppearance: Number,
  ProductComponentTypeID: Number,
  ProductDecisionNodeTypeID: Number,
  ProductSeriesID: Number,
  Catalogs: [
    {
      _canEditProductComponent: Boolean,
      _catalogDescription: String,
      _catalogID: String,
      _componentTypeID: Number,
      _excludeFromComment: Boolean,
      _excluteFromPartNumber: Boolean,
      _isAvailable: Boolean,
      _isSelected: Boolean,
      _isSeparator: Boolean,
      "<CatalogIDNumberValue>k__BackingField": Number,
      "<CatalogIdentifierID>k__BackingField": Number,
      "<ComponentType>k__BackingField": Number,
      "<IsNumberValue>k__BackingField": Boolean,
      "<ProductSeriesID>k__BackingField": Number,
      ChildDecisionNodeID: Number,
      ChildNodeTypeID: Number,
      DecisionLevel: Number,
      DecisionPaths: Number,
      GroupedItemCount: Number,
      OrderOfAppearance: Number,
      ParentDecisionNodeID: Number,
      ProductDecisionPathID: Number,
      _catalogAvailableOnWebsite: Boolean,
    },
  ],
  ChildDecisionNodeID: Number,
  DecisionLevel: Number,
  IsSelectAll: Boolean,
  Notes: String,
  ParentDecisionNodeID: Number,
  ProductDecisionPathID: Number,
  SelectedCatalog: Number,
  ComponentAvailableOnWebsite: Boolean,
});

module.exports = mongoose.model(
  "componentOptions",
  componenteOptionSchema,
  "componentOptionCollection"
);
