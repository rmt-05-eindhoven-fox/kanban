require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./routes/index');
const ErrorHandler = require('./middlewares/ErrorHandler');

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(routes);
app.use(ErrorHandler);



app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));