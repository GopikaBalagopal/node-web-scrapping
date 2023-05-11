const scrapInfo = require(".");
const Product = require("../mongo/product");

const cronJob = async () => {
  try {
    // find distinct products
    const items = await Product.distinct("product");

    items.forEach((item) => {
      scrapInfo(item);
    });
  } catch (e) {
    console.log("error in cron job: ", e);
  }
};
module.exports = cronJob;
