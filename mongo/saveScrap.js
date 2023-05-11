const Product = require("./product");

const saveScrap = async (items) => {
  console.log({ items });
  try {
    return Product.create(items);
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = saveScrap;
