const { MongoClient } = require('mongodb')
const url = 'mongodb://localhost:27017'
const dbName = "tv-series-services"
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })

let db

function connect(callback) {
  client.connect(function(err) {
    if(err) {
      console.log('failed connect to mongodb')
    }else {
      console.log('successfully connect to mongodb')
      db = client.db(dbName)
    }
    callback(err)
  })
}

function getDatabase() {
  return db
}

module.exports = { connect, getDatabase }