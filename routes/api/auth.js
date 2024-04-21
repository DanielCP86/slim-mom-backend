const express = require("express");
const {
  joiRegisterSchema,
  joiLoginSchema,
  joiRefreshTokenSchema,
} = require("../../models");
const { authCtrl: ctrl } = require("../../controllers");
const { auth, ctrlWrapper, validation } = require("../../middlewares");

const router = express.Router();

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: User Registration
 *     description: User Registration
 *     responses:
 */
router.post("/signup", validation(joiRegisterSchema), ctrlWrapper(ctrl.signup));

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     description: User login
 *     responses:
 */
router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

/**
 * @swagger
 * /users/logout:
 *   get:
 *     summary: Logout user (requires authentication token)
 *     description: Logout user (requires authentication token)
 *     responses:
 */
router.get("/logout", ctrlWrapper(auth), ctrlWrapper(ctrl.logout));

/**
 * @swagger
 * /users/current:
 *   get:
 *     summary: Current user (requires authentication token)
 *     description: Current user (requires authentication token)
 *     responses:
 */
router.get("/current", ctrlWrapper(auth), ctrlWrapper(ctrl.current));

/**
 * @swagger
 * /users/refresh-tokens:
 *   post:
 *     summary: Refresh tokens
 *     description: Refresh tokens
 *     responses:
 */
router.post(
  "/refresh-tokens",
  validation(joiRefreshTokenSchema),
  ctrlWrapper(ctrl.refreshTokens)
);

module.exports = router;
