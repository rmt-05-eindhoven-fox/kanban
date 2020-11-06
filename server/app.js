if (process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}
// require('dotenv').config();
const express = require('express');
const router = require('./routers/index');
const app = express();
const PORT = process.env.POT || 3000;
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.status(200).json({msg:' >>>>> BATAS SUCI <<<<<'}))
app.use(router);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`This app listening at http://localhost:${PORT}`);
})