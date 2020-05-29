require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const userRouter = require("./routes/userRouter");
const favoriteRouter = require("./routes/favoriteRouter");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = require("./routes");
app.use(router);

app.listen(port, () => console.log(`Listening on port ${port}!`));

module.exports = app;
