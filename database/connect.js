const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let isConnected;
const mongoString = "mongodb+srv://murilocarvalho2204:f3ybhpjGVXFE1dYD@rest-api.yxpgfv5.mongodb.net/?retryWrites=true&w=majority";

module.exports = connectToDatabase = () => {
  if (isConnected) {
    console.log('=> using existing database connection');
    return Promise.resolve();
  }

  console.log('=> using new database connection');
  return mongoose.connect(mongoString)
    .then(db => { 
      isConnected = db.connections[0].readyState;
    });
};
