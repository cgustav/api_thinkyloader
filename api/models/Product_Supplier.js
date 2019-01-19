/**
 * Supplier.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = function(){

  var thinky = this.thinky;
  var type   = this.thinky.type;
  var models = this.models;
  var r = thinky.r;

  return {
    tableName: "Product_Supplier",
    schema: {
      product_id: type.number().required(),
      supplier_id: type.number().required(),
      price: type.number(),
      currency_exchange: type.string(),
      stock: type.number(),
      createdAt: type.date().default(r.now())
    },

    options: {},

    init: function(model) {
      //relations here
      model.belongsTo(models.Products, 'Products', 'product_id', 'id')
      model.belongsTo(models.Suppliers, 'Suppliers', 'supplier_id', 'id')
    }
  };
}

