const scrapFlipkart = require("./flipkart");

const scrapInfo = async (searchItem) => {
  try {
    const result = await scrapFlipkart(searchItem);

    // combine scrap results of other platform

    return result;
  } catch (e) {
    console.log("e", e);
    throw err;
  }
};

module.exports = scrapInfo;
