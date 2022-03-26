const { MongoClient } = require('mongodb');
const config = require('../config');

var connection;

MongoClient.connect(
    config.DB.URL, 
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    (err, conn) => {
        if(err) throw err
        connection = conn.db();
        console.log('Mongodb connection successfully created ' + connection);
    }
)

function getDb() {
    return connection;
}


module.exports = {
    getDb
};
