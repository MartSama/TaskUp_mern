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
    socket.on('open project', (project) => {
        socket.join(project)
    })

    socket.on("create todo", (todo) => {
        const { project } = todo
        socket.to(project).emit('todo added', todo)
    })

    socket.on("delete todo", (todo) => {
        const { project } = todo
        socket.to(project).emit('deleted todo', todo)
    })

    socket.on("edit todo", (todo) => {
        const project = todo.project._id
        socket.to(project).emit('edited todo', todo)
    })

    socket.on('complete todo', (todo) => {
        const project = todo.project._id
        socket.to(project).emit('completed todo', todo)
    })
})