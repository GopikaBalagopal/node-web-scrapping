const express = require("express");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Node server is running here....");
});

router.post("/scrap-products", async (req, res) => {
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

router.get("/products/:item", (req, res) => {
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

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
