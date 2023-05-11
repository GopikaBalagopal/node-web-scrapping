const express = require("express");
const bodyParser = require("body-parser");
const connectMongo = require("./mongo/connectDB");
const { save } = require("./test");
const scrapInfo = require("./scrap");
const saveScrap = require("./mongo/saveScrap");
const Product = require("./mongo/product");
const cors = require("cors");
const cron = require("node-cron");
const cronJob = require("./scrap/cronJob");

const app = new express();
const port = 4000;

app.use(cors());

app.use(bodyParser.json());
// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

cron.schedule("0 */12 * * *", () => {
  // Task to be executed every 12 hours
  console.log("Running cron job...");
  cronJob();
  // Add your custom logic here
});

app.post("/scrap-products", async (req, res) => {
  const { searchItem } = req.body;

  try {
    const scrapResult = await scrapInfo(searchItem);

    await saveScrap(scrapResult);

    console.log("data saved to DB");
    res.status(200).json({ status: "done", error: null });
  } catch (e) {
    console.log("something went wrong while scrapping");
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

app.listen(port, async () => {
  connectMongo();
  console.log("listening to ", port);
});
