const express = require("express")

const app = express()
const userRouter = require("./routes/userroute")
const sellerRouter =require("./routes/sellerroute")

const cors = require("cors")

app.use(cors())

const bodyparser = require("body-parser")


const ProductRouter = require("./routes/ProductRoute")
const CartRouter = require("./routes/CartRoute")
const BusinessRouter = require("./routes/BusinessRoute")
require("./database/db")


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(userRouter)
app.use(ProductRouter)
app.use(sellerRouter)
app.use(CartRouter)
app.use(BusinessRouter)
app.get("/", (req, res) =>{
    res.send("Server's Running")
})



app.listen(90)