const express = require('express')
const app = express()
const port = 3000
const tasksRouter = require('./routes/tasks');
const usersRouter = require('./routes/users');
const organizationsRouter = require('./routes/organizations');
const memberRouter = require('./routes/members');
const googleRouter = require('./routes/google');
const errorHandler = require("./middlewares/errorhandler")
const cors = require("cors")
require('dotenv').config();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/tasks', tasksRouter);
app.use('/users', usersRouter);
app.use('/organizations', organizationsRouter);
app.use('/members', memberRouter);
app.use('/googlelogin', googleRouter)
app.use(errorHandler)


app.listen(port, () => {
  console.log(`I LOVE U ${port}`)
})