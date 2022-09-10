import e from "express"
import Project from "../models/Project.js"
import ToDo from "../models/toDo.js"
export const getProjects = async (req, res) => {
    const projects = await Project.find().where('creator').equals(req.user)
    res.json(projects)
}

export const newProject = async (req, res) => {
    const project = new Project(req.body)
    project.creator = req.user._id
    try {
        const savedProject = await project.save()
        res.json(savedProject)
    } catch (error) {
        console.log(error)
    }
}

export const getProject = async (req, res) => {
    const { id } = req.params
    try {
        const project = await Project.findById(id)
        if (!project) {
            const error = new Error("Project not found")
            return res.status(404).json({ msg: error.message })
        }
        if (project.creator.toString() !== req.user._id.toString()) {
            const error = new Error("Invalid actions, no authorization")
            return res.status(401).json({ msg: error.message })
        }

        const toDo = await ToDo.find().where('project').equals(project._id)
        res.json({ project, toDo })
    } catch (error) {
        return res.json({ msg: "ID is not valid" })
    }
}

export const editProject = async (req, res) => {
    const { id } = req.params
    try {
        const project = await Project.findById(id)
        if (!project) {
            const error = new Error("Project not found")
            return res.status(404).json({ msg: error.message })
        }
        if (project.creator.toString() !== req.user._id.toString()) {
            const error = new Error("Invalid id, you are not the owner of this project")
            return res.status(401).json({ msg: error.message })
        }
        project.name = req.body.name || project.name
        project.description = req.body.description || project.description
        project.client = req.body.client || project.client
        project.deadline = req.body.deadline || project.deadline


        const savedProject = await project.save()
        res.json(savedProject)
    } catch (error) {
        return res.json({ msg: "ID is not valid" })
    }
}

export const deleteProject = async (req, res) => {
    const { id } = req.params
    try {
        const project = await Project.findById(id)
        if (!project) {
            const error = new Error("Project not found")
            return res.status(401).json({ msg: error.message })
        }
        if (project.creator.toString() !== req.user._id.toString()) {
            const error = new Error("Invalid id, you are not the owner of the project")
        }

        await project.deleteOne();
        res.json({ msg: "Project deleted correctly" })
    } catch (error) {
        return res.json({ msg: "Invalid id" })
    }
}

export const addCollaborator = async (req, res) => {

}

export const deleteCollaborator = async (req, res) => {

}


export const getToDo = async (req, res) => {
    const { id } = req.params
    const project = await Project.findById(id)
    if (!project) {
        const error = new Error("Project not found")
        res.status(404).json({ msg: error.message })
    }


}