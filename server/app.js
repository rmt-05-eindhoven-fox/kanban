if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const userRouter = require('./routes/user.js');
const taskRouter = require('./routes/task.js');
const errorHandler = require('./middleware/errorHandler.js');
const { authentication } = require('./middleware/auth.js');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/user', userRouter);

app.use(authentication);
app.use('/task', taskRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`app ini berjalan di http://localhost:${port}`);
});