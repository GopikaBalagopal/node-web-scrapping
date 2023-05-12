// Import the mongoose module
const mongoose = require("mongoose");

const connectMongo = () => {
  console.log("connecting to DB...");
  // Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
  // Included because it removes preparatory warnings for Mongoose 7.
  // See: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
  mongoose.set("strictQuery", false);

  // Define the database URL to connect to.
  const mongoDB =
    "mongodb+srv://root:oqDsAxW0WZV3E5Ty@cluster0.l3dvu5u.mongodb.net/<database-name>";

  // Wait for database to connect, logging an error if there is a problem
  main().catch((err) => console.log(err));
  async function main() {
    await mongoose.connect(mongoDB);
    console.log(`connected to ${mongoDB}!`);
  }
};

module.exports = connectMongo;
