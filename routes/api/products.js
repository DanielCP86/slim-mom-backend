const express = require("express");
const { ctrlWrapper } = require("../../middlewares");
const {
  productsCtrl: { getAllProducts, getProductsForQuery },
} = require("../../controllers");

const router = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products (do not press unless absolutely necessary)
 *     description: Get all products (do not press unless absolutely necessary)
 *     responses:
 */
router.get("/", ctrlWrapper(getAllProducts));

/**
 * @swagger
 * /products/search:
 *   get:
 *     summary: Get products by query
 *     description: Get products by query
 *     parameters:
 *       - in: path
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 */
router.get("/search", ctrlWrapper(getProductsForQuery));

module.exports = router;
