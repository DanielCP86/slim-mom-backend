const { productService } = require("../services");

const getAllProducts = async (req, res, next) => {
  const products = await productService.listProducts();

  res.status(200).json({
    status: "OK",
    code: 200,
    data: {
      resultItems: products.length,
      result: products,
    },
  });
};

const getProductsForQuery = async (req, res, next) => {
  const { query = "" } = req.query;
  const products = await productService.listProducts();
  console.log(products);

  const arrayFoundProducts = [];

  products.filter((prod) => {
    const itemProduct = prod.title.toLowerCase().trim();
    if (itemProduct.includes(query.toLowerCase().trim())) {
      return arrayFoundProducts.push({
        title: prod.title,
        _id: prod._id,
      });
    }
    return arrayFoundProducts;
  });

  console.log(arrayFoundProducts);

  res.status(200).json({
    status: "OK",
    code: 200,
    data: {
      resultItems: arrayFoundProducts.length,
      result: arrayFoundProducts,
    },
  });
};

module.exports = { getAllProducts, getProductsForQuery };
