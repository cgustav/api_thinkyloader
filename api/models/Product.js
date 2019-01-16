/**
 * Product.js
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
      tableName: "Product",
      schema: {
        id: type.number().required(),
        name: type.string().required(),
        description: type.string().required(),
        quantity: type.number().required(),
        createdAt: type.date().default(r.now())
      },
  
      options: {},
  
      init: function(model) {
        //relations here
      }
    };
  }



