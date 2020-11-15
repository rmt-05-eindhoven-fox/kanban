const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const ErrorHandler = require('./middlewares/ErrorHandler');
const routes = require('./routes/index');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(routes);
app.use(ErrorHandler);

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));