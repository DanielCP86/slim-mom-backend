const express = require("express");
const {
  joiDietaryDateSchema,
  joiDietaryUpdateDateSchema,
  joiGetDateSchema,
} = require("../../models");
const { ctrlWrapper, auth, validation } = require("../../middlewares");
const { dietaryCtrl } = require("../../controllers");

const router = express.Router();

/**
 * @swagger
 * /dietaries:
 *   get:
 *     summary: Get diet day (requires authentication token)
 *     description: Get diet day (requires authentication token)
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: date
 *     responses:
 */
router.get(
  "/",
  ctrlWrapper(auth),
  validation(joiGetDateSchema),
  ctrlWrapper(dietaryCtrl.getDailyDiet)
);

/**
 * @swagger
 * /dietaries:
 *   post:
 *     summary: Create daily diet (requires authentication token)
 *     description: Create daily diet (requires authentication token)
 *     responses:
 */
router.post(
  "/",
  ctrlWrapper(auth),
  validation(joiDietaryDateSchema),
  ctrlWrapper(dietaryCtrl.createDailyDiet)
);

/**
 * @swagger
 * /dietaries:
 *   patch:
 *     summary: Update daily diet (requires authentication token)
 *     description: Update daily diet (requires authentication token)
 *     responses:
 */
router.patch(
  "/",
  ctrlWrapper(auth),
  validation(joiDietaryUpdateDateSchema),
  ctrlWrapper(dietaryCtrl.updateDailyDiet)
);

/**
 * @swagger
 * /dietaries:
 *   delete:
 *     summary: Delete diet day (requires authentication token)
 *     description: Delete diet day (requires authentication token)
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *      - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: date
 *     responses:
 */
router.delete("/", ctrlWrapper(auth), ctrlWrapper(dietaryCtrl.deleteDailyDiet));

module.exports = router;
