/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function () {


  let thinky = require('thinky-loader');

  let ormConfig = {
    debug: false,
    modelsPath: process.cwd() + '/api/models',
    thinky: {
      rethinkdb: {
        host: 'localhost',
        port: 28015,
        authKey: "",
        db: "first_onedb",
        timeoutError: 5000,
        buffer: 5,
        max: 1000,
        timeoutGb: 60 * 60 * 1000
      }
    }
  };

  // returns a promise when configured
  thinky.initialize(ormConfig) // you can also optionally pass an instance of thinky: [orm.initialize(ormConfig, thinky)] for additional configuration.
    .then(() => console.log('Ready!'))
    .catch((err) => console.log('Darn!',err));



};
