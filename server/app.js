const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const route = require('./routes/index')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')


app.get('/', (req,res) => {res.send('hello world')})
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(route)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`connected to ${port}`)
})