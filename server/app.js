const express = require("express");
const app = express();
const port = 3521;
const router = require("./routes");
//err handler blm ada

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(router);

//app.use(errHandler);

app.listen(port, () => {
	console.log(`kanbatte run at port ${port}`);
});
