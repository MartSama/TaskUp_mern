import express from "express";
import dotenv from 'dotenv'
import connectDb from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from './routes/projectRoutes.js'
import toDoRoutes from './routes/toDoRoutes.js'
import cors from 'cors'
import e from "express";
const app = express()
app.use(express.json())
dotenv.config()
connectDb()

//Config cors
const whiteList = [process.env.FRONTEND_URL]
const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.includes(origin)) {
            //Puede consultar la API
            callback(null, true)
        } else {
            //NO puede consultar la API
            callback(new Error("CORS error"))
        }
    }
}

app.use(cors(corsOptions))

//Routing
app.use('/api/users', userRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/toDo', toDoRoutes)

const PORT = process.env.PORT || 4000
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});


//Socket io
import { Server } from "socket.io";

const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.FRONTEND_URL,
    }
})

io.on('connection', (socket) => {
    console.log('Conected to socket io')
    //Define socket events 
    socket.on('try', (name) => {
        console.log('try socket', name)
    })
})