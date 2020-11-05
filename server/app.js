const { urlencoded } = require("express")
const express = require("express")
const errorHandler = require("./middlewares/error-handler")
const router = require("./routes/index")
const app = express()
const port = 3000

app.use(urlencoded({ extended: true }))
app.use(router)
app.use(errorHandler)

app.listen(port, () => {
	console.log(`running on port: `, port)
})