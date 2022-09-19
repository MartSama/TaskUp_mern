import e from "express"
import Project from "../models/Project.js"
import ToDo from "../models/toDo.js"
export const addToDo = async (req, res) => {
    const { project } = req.body

    const existantProject = await Project.findById(project)
    if (!existantProject) {
        const error = new Error("Project does not exist")
        return res.status(404).json({ msg: error.message })
    }
    if (existantProject.creator.toString() !== req.user._id.toString()) {
        const error = new Error("Invalid action, your not the owner")
        console.log(existantProject.creator, ' - ', req.user._id)
        return res.status(403).json({ msg: error.message })
    }
    try {
        const toDo = await ToDo.create(req.body)
        //Saved ID in project
        existantProject.todos.push(toDo._id)
        await existantProject.save()
        res.json(toDo)
    } catch (error) {
        console.log(error)
    }
}
export const getToDo = async (req, res) => {
    const { id } = req.params
    try {
        const toDo = await ToDo.findById(id).populate("project")
        if (!toDo) {
            const error = new Error("To Do not found")
            return res.status(404).json({ msg: error.message })
        }
        if (toDo.project.creator.toString() !== req.user._id.toString()) {
            const error = new Error("Invalid actions, you are not the owner")
            return res.status(403).json({ msg: error.message })
        }
        res.json(toDo)
    } catch (error) {
        res.json({ msg: "Invalid id" })
    }
}
export const editToDo = async (req, res) => {
    const { id } = req.params
    try {
        const toDo = await ToDo.findById(id).populate("project")
        if (!toDo) {
            const error = new Error("To Do not found")
            return res.status(404).json({ msg: error.message })
        }
        if (toDo.project.creator.toString() !== req.user._id.toString()) {
            const error = new Error("Invalid actions, you are not the owner")
            return res.status(403).json({ msg: error.message })
        }
        toDo.name = req.body.name || toDo.name
        toDo.description = req.body.description || toDo.description
        toDo.priority = req.body.priority || toDo.priority
        toDo.deadline = req.body.deadline || toDo.deadline

        const savedToDo = await toDo.save()
        res.json(savedToDo)
    } catch (error) {
        res.json({ msg: "Invalid id" })
    }
}
export const deleteToDo = async (req, res) => {
    const { id } = req.params
    try {
        const toDo = await ToDo.findById(id).populate("project")
        if (!toDo) {
            const error = new Error("To Do not found")
            return res.status(404).json({ msg: error.message })
        }
        if (toDo.project.creator.toString() !== req.user._id.toString()) {
            const error = new Error("Invalid action, you are not the owner")
            return res.status(403).json({ msg: error.message })
        }   
        await toDo.deleteOne()
        res.json({ msg: "Deleted correctly" })
    } catch (error) {
        res.json({ msg: "Invalid id" })
    }
}
export const changeState = async (req, res) => {

}

