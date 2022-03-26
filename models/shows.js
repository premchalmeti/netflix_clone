const { getDb } = require('./db');
const config = require('../config');
const { ObjectId } = require('mongodb');


async function getShow(id) {
    let collection = getDb().collection(config.DB.COLLECTIONS.SHOWS);
    if(id) {
        return collection.findOne(ObjectId(id));
    } else {
        return collection.find().toArray();
    }
}



module.exports = {
    getShow
}
