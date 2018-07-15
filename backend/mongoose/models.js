// models.js
// Schemas Map To Models
const schemas = require('./schemas'),
    config = require('./config'),
    mongoose = require('./connect');

let schemasNames = Object.keys(schemas);

let models = schemasNames.reduce((acc, name) => {
    // console.log(config.currentYear + '_' + name);
    acc[name + 'Model'] = mongoose.model(
        config.currentYear + '_' + name,
        schemas[name]
    );
   // acc[name+'Model'].find({}, function(err, docs){
   //     console.log('Test: ' + docs.length);
   // });
    return acc;
}, {});

// console.log(models);
// models.score2rankModel = mongoose.model('score2ranks',);

module.exports = models;