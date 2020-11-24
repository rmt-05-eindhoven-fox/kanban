const express = require("express")
const app = express()
const PORT = process.env.PORT || 8080
const task = require('./routes/task')
const user = require('./routes/user')
const errorHandler = require("./middlewares/errorHandler")
const cors = require('cors');

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/users', user)
app.use('/tasks', task)
app.use(errorHandler)

app.listen(PORT, () =>{
    console.log("App is running on http://localhost:" + PORT)
})