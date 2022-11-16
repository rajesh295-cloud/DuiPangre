const express = require("express")

const app = express()
const userRouter = require("./routes/userroute")
const sellerRouter =require("./routes/sellerroute")

const cors = require("cors")

app.use(cors())

const bodyparser = require("body-parser")



require("./database/db")


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(userRouter)
app.use(sellerRouter)

app.get("/", (req, res) =>{
    res.send("Server's Running")
})



app.listen(90)