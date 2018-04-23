const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const path = require('path');
const createExpressApp = require('./create-express-app');

const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {

  console.log('user connected');

  socket.on('disconnect', function () {
      console.log('user disconnected');
  });

  socket.on('add-message', (message) => {
      const timeStamp = new Date().getTime();
      io.emit('message', {
          type: 'new-message',
          text: message,
          date: timeStamp
      });
      
      
  });

});


require('dotenv').config();

MongoClient.connect(process.env.DB_CONN, (err, db) => {

  console.log('connected to mongodb...');

  createExpressApp(db)
    .listen(3000, () => {
      database = db;
      console.log('listening on port 3000...');
    });

});
