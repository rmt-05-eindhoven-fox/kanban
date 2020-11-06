const express = require("express");
const app = express();
const port = 3521;
const cors = require("cors");
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/', router);

app.use(errorHandler);

app.listen(port, () => {
	console.log(`kanbatte run at port ${port}`);
});
