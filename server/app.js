require("dotenv").config();

const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const routes = require("./routes/index.js");
const cors = require("cors");
const Middleware = require("./middleware/middleware");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
app.use(Middleware.errorHandler);

app.listen(port, () => console.log(`Listening on port ${port}`));
