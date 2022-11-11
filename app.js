const express = require("express")

const app = express()
const userRouter = require("./routes/userroute")
const sellerRouter =require("./routes/sellerroute")

const cors = require("cors")






require("./database/db")


app.use(express.json())
app.use(userRouter)
app.use(sellerRouter)

app.use(cors())
app.get("/", (req, res) =>{
    res.send("Server's Running")
})



app.listen(3000)