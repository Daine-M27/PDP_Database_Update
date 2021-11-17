const mongoose = require("mongoose");

const componenteOptionSchema = mongoose.Schema({
  ModifiedByID: Number,
  Catalogs: [
    {
      ModifiedByID: Number,
      CanEditProductComponent: Boolean,
      CatalogAvailableOnWebsite: Boolean,
      CatalogDescription: String,
      CatalogID: String,
      CatalogIdentifierID: Number,
      ChildDecisionNodeID: Number,
      ChildNodeTypeID: Number,
      ComponentAvailableOnWebsite: Boolean,
      ComponentType: Number,
      DecisionLevel: Number,
      DecisionPaths: Number,
      ExcludeFromComment: Boolean,
      ExcludedFromPartNumber: Boolean,
      GroupedItemCount: Number,
      IsAvailable: Boolean,
      IsNumberValue: Boolean,
      IsSelected: Boolean,
      IsSeperator: Boolean,
      OrderOfAppearance: Number,
      ParentDecisionNodeID: Number,
      ProductComponentTypeID: Number,
      ProductDecisionPathID: Number,
      ProductSeriesID: Number
    },
  ],
  ChildDecisionNodeID: Number,
  ComponentAvailableOnWebsite: Boolean,
  ComponentTypeName: String,
  DecisionLevel: Number,
  IsEnabled: Boolean,
  IsNumberValue: Boolean,
  IsSelectAll: Boolean,
  IsSeparator: Boolean,
  IsVisible: Boolean,
  Notes: [
    {
      ModifiedByID: Number,
      IsRemoved: Boolean,
      Note: String,
      ProductComponentTypeID: Number,
      ProductComponentTypeNoteID: Number
    }
  ],
  OrderOfAppearance: Number,
  ParentDecisionNodeID: Number,
  ProductComponentTypeID: Number,
  ProductDecisionNodeTypeID: Number,
  ProductDecisionPathID: Number,
  ProductSeriesID: Number,  
  SelectedCatalog: Number,
  VisibilityOrderBy: Number  
});

module.exports = mongoose.model(
  "componentOptions",
  componenteOptionSchema,
  "componentOptionCollection"
);
