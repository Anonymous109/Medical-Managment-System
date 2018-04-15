const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');

const users = require('./users');
const patients = require('./patients');

require('dotenv').config();


function seedCollection(collectionName, initialRecords) {

  MongoClient.connect('mongodb://localhost:27017/med', (err, db) => {
    console.log('connected to mongodb...');

    const collection = db.collection(collectionName);
    
    collection.remove();

    initialRecords.forEach((item) => {
      if (item.password) {
        console.log("items " + item.password);
        item.password = bcrypt.hashSync(item.password, 10);
      }
    });

    console.log('inserting records...');

    collection.insertMany(initialRecords, (err, result) => {
      console.log(`${result.insertedCount} records inserted.`);
      console.log('closing connection...');
      db.close();
      console.log('done.');
    });

  });
}


seedCollection('users', users);
seedCollection('patients', patients);