const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const errorHandler = require("./errors/errorHandler");
require("dotenv").config();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

// const { cloudinary } = require("./helpers/cloudinary");

const {
  userRouter,
  productsRouter,
  dietariesRouter,
  authRouter,
} = require("./routes/api");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(cors());
app.use(express.json());
app.use(logger(formatsLogger));
app.use(express.static("public"));

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Documentation for your API",
    },
  },
  apis: ["./routes/api/*.js"], // Specifică căile către fișierele care conțin definirile rutei pentru documentație
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1/users", authRouter, userRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/dietaries", dietariesRouter);

app.use((_, res, next) => {
  next({ status: 404, message: "Not found" });
});

app.use(errorHandler);

module.exports = app;
