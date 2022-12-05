const mongoose = require("mongoose");

// /movies, connect to a movies database, or create a movies database

module.exports = {
  connectDB,
};

async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // shortcut to mongoose.connection object

    console.log("connnnnnnnneected");
  } catch (err) {
    console.log("err");
    console.log(err, ' connecting to mongodb')
    process.exit(1);
  }
}

/// THE PURPOSE OF THIS FILE IS TO CREATE/CONNECT to a database, and establish a connection,
// between our Express Server and Mongodb (our database server)

// Require this file in our Server.js in order to execute it!
