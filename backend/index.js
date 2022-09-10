import express from "express";
import dotenv from 'dotenv'
import connectDb from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from './routes/projectRoutes.js'
import toDoRoutes from './routes/toDoRoutes.js'
const app = express()
app.use(express.json())
dotenv.config()
connectDb()

//Routing
app.use('/api/users', userRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/toDo', toDoRoutes)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});