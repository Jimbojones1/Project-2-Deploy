const mongoose = require("mongoose");

// /movies, connect to a movies database, or create a movies database

module.exports = {
  connectDB
}

async function connectDB(){
  try {
    mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
      });
  } catch(err){
    console.log('err');
    process.exit(1)
  }
}


// shortcut to mongoose.connection object
const db = mongoose.connection;

db.on("connected", function () {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});

db.on("error", function (err) {
  console.log(`There was an ${err}`);
});

/// THE PURPOSE OF THIS FILE IS TO CREATE/CONNECT to a database, and establish a connection,
// between our Express Server and Mongodb (our database server)

// Require this file in our Server.js in order to execute it!
