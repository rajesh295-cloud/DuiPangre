const express = require("express")

const app = express()
const userRouter = require("./routes/userroute")









require("./database/db")


app.use(express.json())
app.use(userRouter)

app.get("/", (req, res) =>{
    res.send("Server's Running")
})



app.listen(3000)