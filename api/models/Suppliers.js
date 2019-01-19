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
    tableName: "Suppliers",
    schema: {
      id: type.string(),
      supplier_id: type.number(),
      name: type.string().required(),
      description: type.string(),
      phone_number: type.string(),
      city: type.string(),
      state: type.string(),
      country: type.string(),
      isCertified: type.boolean().default(false),
      createdAt: type.date().default(r.now())
    },

    options: {},

    init: function(model) {
      model.hasMany(models.Product_Supplier, 'Product_Supplier', 'id', 'supplier_id')
    }
  };
}

