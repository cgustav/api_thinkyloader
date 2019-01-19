/**
 * Products.js
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
    tableName: "Products",
    schema: {
      id: type.string(),
      product_id: type.number(),
      name: type.string().required(),
      description: type.string().required(),
      category: type.string(),
      createdAt: type.date().default(r.now())
    },

    options: {},

    init: function(model) {
      //relations here
      model.hasMany(models.Product_Supplier, 'Product_Supplier', 'id', 'product_id')
    
    }
  };
}