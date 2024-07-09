const mongoose = require("mongoose");

const generateConnectionString = () => {
  let connectionUrl = process.env.DB_CONNECTION_URL;
  connectionUrl = connectionUrl.replace("<username>", process.env.DB_USERNAME);
  connectionUrl = connectionUrl.replace("<password>", process.env.DB_PASSWORD);
  const dbName = process.env.DB_NAME;
  const query = process.env.DB_QUERY;

  return `${connectionUrl}/${dbName}?${query}`;
};

const connectDB = async () => {
  const url = generateConnectionString();
  const options = { autoIndex: false };

  await mongoose.connect(url, options);
  console.log("Database Connected!");
};

module.exports = connectDB;
