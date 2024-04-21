const express = require("express");

const { ctrlWrapper, validation, auth, upload } = require("../../middlewares");
const { joiUserInfoSchema } = require("../../models/user");

const { userCtrl } = require("../../controllers");

const router = express.Router();

/**
 * @swagger
 * /users/nutrition-advice:
 *   post:
 *     summary: Nutrition advice
 *     description: Nutrition advice
 *     responses:
 */
router.post(
  "/nutrition-advice",
  validation(joiUserInfoSchema),
  ctrlWrapper(userCtrl.getNotLoggedUserDietAdvice)
);

/**
 * @swagger
 * /users/logged-nutrition-advice:
 *   post:
 *     summary: Nutrition-advice (requires authentication token)
 *     description: Nutrition-advice (requires authentication token)
 *     responses:
 */
router.post(
  "/logged-nutrition-advice",
  validation(joiUserInfoSchema),
  ctrlWrapper(auth),
  ctrlWrapper(userCtrl.getLoggedUserDietAdvice)
);
router.patch(
  "/avatars",
  ctrlWrapper(auth),
  ctrlWrapper(upload.single("avatar")),
  ctrlWrapper(userCtrl.updateAvatar)
);
module.exports = router;
