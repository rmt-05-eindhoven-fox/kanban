const { urlencoded } = require("express");
const express = require("express");
const errorHandler = require("./middlewares/error-handler");
const router = require("./routes/index");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`running on port: `, port);
});
