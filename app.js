const express = require("express")

const app = express()
const userRouter = require("./routes/userroute")
const sellerRouter =require("./routes/sellerroute")








require("./database/db")


app.use(express.json())
app.use(userRouter)
app.use(sellerRouter)

app.get("/", (req, res) =>{
    res.send("Server's Running")
})



app.listen(3000)