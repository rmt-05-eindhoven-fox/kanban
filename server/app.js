const express = require("express")
const cors = require("cors")
const router = require("./routes/index")
const errorHandler = require("./middlewares/errorHandler.middleware")
const app = express()
const port = 3000


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use(router)
app.use(errorHandler)

app.listen(port, ()=> { 
    console.log(`listening at http://localhost:${port}`);
})

