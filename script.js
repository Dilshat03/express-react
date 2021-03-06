const express = require('express')
const server = express()
const taskRoute = require('./routes/tasksRoute')
const mongoose = require('mongoose')
const chalk = require("chalk");
const Tasks = require('./models/taskModel')
const cors = require('cors')
const path = require("path");

require('dotenv').config()


mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log(chalk.blue("DB IS CONNECTED")))
    .catch(() => console.log(chalk.red("DB IS NOT CONNECTED")))


server.use(express.json())
server.use(cors())
server.use(express.static(path.join(__dirname,"./client/build")))
server.use('/api/tasks', taskRoute)


server.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname + "/client/build/index.html"))
})


// server.use((req, res, next) => {
//     const error = {message: "File not found"}
//     res.status(404).json(error)
//     next()
// })


server.listen(process.env.PORT || 8000, () => {
    console.log('Server is running')
})