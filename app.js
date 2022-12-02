const express = require("express")
const path = require("path")
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
app.use('../uploads', express.static(path.join(__dirname, '/uploads')));

app.get("/", (req, res) =>{
    res.send("Server's Running")
})



app.listen(90)