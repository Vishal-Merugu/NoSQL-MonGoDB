
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect('mongodb+srv://vishalmerugu:Vishal%40360@cluster0.ga5b5mf.mongodb.net/shop?retryWrites=true&w=majority')
  .then((client) => {
    console.log('Connected');
    _db = client.db();
    callback()
  })
  .catch(err => {
    console.log(err);
    throw err;
  }) 
}

const getDb = () => {
  if(_db){
    return _db
  }
  throw "No Database found !!"
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;