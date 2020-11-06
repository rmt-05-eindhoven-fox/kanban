if (process.env.NODE_ENV != 'production') {
	require("dotenv").config();
}

const cors = require("cors");
const express = require("express");
const app = express();
const routes = require("./routes/index.js");
const port = process.env.PORT;
const errorHandler = require("./middlewares/errorHandler.js");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded( { extended: true } ))

//Routes
app.use(routes);

// Error Handler
app.use(errorHandler);

//Listen
app.listen(port, () => {
	console.log(`Kanban App is running on http://localhost:${port}`)
})