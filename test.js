const ProductModel = require("./mongo/product");

const save = () => {
  const p = new ProductModel({
    title: "iPhone 11",
    price: "1100000",
  });

  p.save();
};

module.exports = {
  save,
};
