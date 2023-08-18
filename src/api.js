const express = require("express");
// const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const cors = require("cors");

const Product = require("./mongo/product");
const scrapInfo = require("./scrap");
const saveScrap = require("./mongo/saveScrap");

const connectMongo = require("./mongo/connectDB");

const app = express();
const PORT = 6005;
// const router = express.Router();

app.use(cors({ origin: "*" }));

app.use(bodyParser.json());
// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Node server is running here....");
});

app.post("/scrap-products", async (req, res) => {
  const { searchItem } = req.body;
  console.log({ searchItem });
  try {
    const scrapResult = await scrapInfo(searchItem);

    await saveScrap(scrapResult);

    console.log("data saved to DB");
    res.status(200).json({ status: "done", error: null });
  } catch (e) {
    console.log("something went wrong while scrapping", e);
    res.status(500).send("unable to scrap");
  }
});

app.get("/products/:item", (req, res) => {
  const { item } = req.params;
  console.log({ item });
  Product.find({ product: { $regex: item, $options: "i" } })
    .sort({ createdAt: -1 })
    .then((result) => {
      res.json({ data: result });
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send("unable to get data");
    });
});

app.listen(PORT, () => {
  connectMongo();
  console.log("listening to ", PORT);
});

// app.use("/.netlify/functions/api", router);

// const handler = serverless(app);

// Export the serverless handler
// module.exports.handler = async (event, context) => {
// Ensure the MongoDB connection is established before handling the request
//   if (mongoose.connection.readyState !== 1) {
//     await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
//   }
connectMongo();

// Handle the request using the serverless handler
// return handler(event, context);
// };
