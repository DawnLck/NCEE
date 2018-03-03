/**
 * Connect to MongoDB
 */
var mongoose = require('mongoose'),
    DB_CONN = 'mongodb://localhost:27017/',
    DB_Name = 'ncee';
var options = {
    useMongoClient: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
};
var DB_DatabasePath = DB_CONN + DB_Name;
mongoose.Promise = global.Promise;//为了解决过期的问题

console.log(DB_DatabasePath);
/*调试模式是mongoose提供的一个非常实用的功能，用于查看mongoose模块对mongodb操作的日志，一般开发时会打开此功能，以便更好的了解和优化对mongodb的操作。*/
mongoose.set('debug', false);

/*mongoose会缓存命令，只要connect成功，处于其前其后的命令都会被执行，connect命令也就无所谓放哪里*/
var promise = mongoose.connect(DB_DatabasePath, options);

promise.then(function (db) {
    //success
    console.log("Success to connect the MongoDB.");
}, function (error) {
    //failure
    console.log("Fail to make connection to MongoDB：" + error);

});