/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


const or = require('thinky');
const orm = require('thinky-loader');
const r = orm.r;

module.exports = {


  //██╗     ██╗███████╗████████╗     █████╗ ██╗     ██╗     
  //██║     ██║██╔════╝╚══██╔══╝    ██╔══██╗██║     ██║     
  //██║     ██║███████╗   ██║       ███████║██║     ██║     
  //██║     ██║╚════██║   ██║       ██╔══██║██║     ██║     
  //███████╗██║███████║   ██║       ██║  ██║███████╗███████╗
  //╚══════╝╚═╝╚══════╝   ╚═╝       ╚═╝  ╚═╝╚══════╝╚══════╝
  //    


  listall: async function (req, res) {

    /*NOTE: IMPORTANT
    execute() usage is elementary for thinky functionality
    */

    orm.models.Product
      .execute()
      .then((element) => {
        return res.status(200).json(element);
      })
      .catch(err => {
        return res.status(400).json(err)
      });

  },



  //███████╗███████╗ █████╗ ██████╗  ██████╗██╗  ██╗
  //██╔════╝██╔════╝██╔══██╗██╔══██╗██╔════╝██║  ██║
  //███████╗█████╗  ███████║██████╔╝██║     ███████║
  //╚════██║██╔══╝  ██╔══██║██╔══██╗██║     ██╔══██║
  //███████║███████╗██║  ██║██║  ██║╚██████╗██║  ██║
  //╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
  //                   


  buscar: async function (req, res) {

    /* NOTE: IMPORTANT
    Be careful with data type of the criteria (const) 
    you are using to filter elements from database.
    It seems like thinky-load is sensitive in accordance
    with parameter's data type specified on your model schemas 
    */
    /* NOTE: IMPORTANT TOO
    Exists some problems with filter promise? (not returning object)
    */


    /*  REVIEW: DEBUG TOOLS
    sails.log('el id ingresado es: ', __id) 
    sails.log('y es del tipo: ', typeof(__id))
    sails.log(result.length)
    if(_.isEmpty(result)){
    sails.log('empty!')
      
    }
    */

    /*STUB: LOW
    research a better way to verify an empty object
    */

    const __id = parseInt(req.param('product_id'))

    orm.models.Product.filter({
        id: __id
      }).execute()

      .then(product => {

        if (_.isEmpty(product)) {
          return res.status(400).json({
            message: 'No products found!'
          })
        } else {
          return res.status(200).json(product)

        }
      }) //end then
      .catch(err => {
        return res.status(400).json({
          message: err
        })
      }); //end catch
  },


  // ██████╗██████╗ ███████╗ █████╗ ████████╗███████╗    
  //██╔════╝██╔══██╗██╔════╝██╔══██╗╚══██╔══╝██╔════╝    
  //██║     ██████╔╝█████╗  ███████║   ██║   █████╗      
  //██║     ██╔══██╗██╔══╝  ██╔══██║   ██║   ██╔══╝      
  //╚██████╗██║  ██║███████╗██║  ██║   ██║   ███████╗    
  // ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝    
  //                                                                                                   


  /**
   * @id NUMBER,required
   * @name STRING,REQUIRED
   * @description STRING, REQUIRED
   * @quantity STRING, REQUIRED
   */

  create: async function (req, res) {
    //var productId = req.param('product_id');
    //var container = {};

    if (_.isEmpty(req.param('product_id'))) {
      return res.status(400).json({
        message: 'No id specified!!!'
      });
    }


    try {

      //Looking for existing elements 
      const number = await orm.models.Product
        .filter({
          id: req.param('product_id')
        }).count().execute();

      //Filtering  
      if (number > 0) {
        return res.status(400).json({
          message: 'An element with this product_id already exists!'
        })
      }

      //Saving
      orm.models.Product.save({
        id: req.body.product_id,
        name: req.body.name,
        description: req.body.description,
        quantity: req.body.quantity
      }).then(() => {
        return res.status(200).json({
          message: 'Product created!'
        })
      }).catch(() => {
        return res.status(400).json({
          message: 'Your attempt to create an object failed because the element already exist or there is something wrong with the database '
        })
      })


    } catch (err) {

      return res.status(400).json({
        message: 'Something went wrong: ' + err

      })
    }


  }, 

  //██████╗ ███████╗██╗     ███████╗████████╗███████╗
  //██╔══██╗██╔════╝██║     ██╔════╝╚══██╔══╝██╔════╝
  //██║  ██║█████╗  ██║     █████╗     ██║   █████╗  
  //██║  ██║██╔══╝  ██║     ██╔══╝     ██║   ██╔══╝  
  //██████╔╝███████╗███████╗███████╗   ██║   ███████╗
  //╚═════╝ ╚══════╝╚══════╝╚══════╝   ╚═╝   ╚══════╝
  //                                                 

  delete: async function (req, res) {


    /*NOTE: IMPORTANT 
    Delete() function returns basic information of operations
    executed in database, like this:

         { deleted: 1,
          errors: 0,
          inserted: 0,
          replaced: 0,
          skipped: 0,
          unchanged: 0 }

    */

    /*REVIEW DEBUG TOOLS (INSIDE THEN STATEMENT)
        sails.log('detail: ', info)
        sails.log('deleted objects: ', info.deleted)
        sails.log(typeof (info.deleted))
     */

    const __id = parseInt(req.param('product_id'))

    if (!_.isNumber(__id)) {
      return res.status(400).json({
        message: 'Invalid id'
      });
    }
    
    const product = await orm.models.Product.filter({
        id: __id,
      }).delete().execute()
      .then((info) => {
        //deleted objects
        sails.log('detail: ', info)
        const result = info.deleted
        

        if (result === 0) {
          return res.status(400).json({
            message: 'Product (' + __id + ') does not exists!'
          })
        }

        sails.log(__id);
        return res.status(200).json({
          message: 'Product (' + __id + ') deleted!'
        })

      })
      .catch((err) => {
        return res.status(400).json({
          message: 'Some kind of error' + err
        })
      })


  }//end delete 

};
