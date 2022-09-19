import e from "express"
import Project from "../models/Project.js"
import ToDo from "../models/toDo.js"
import User from "../models/User.js"
export const getProjects = async (req, res) => {
    const projects = await Project.find().where('creator').equals(req.user).select('-todos')
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
        const project = await Project.findById(id).populate('todos').populate('team', 'name email')
        if (!project) {
            const error = new Error("Project not found")
            return res.status(404).json({ msg: error.message })
        }
        if (project.creator.toString() !== req.user._id.toString()) {
            const error = new Error("Invalid actions, no authorization")
            return res.status(401).json({ msg: error.message })
        }


        res.json(project)
    } catch (error) {
        return res.json({ msg: "Invalid project ID" })
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
        return res.json({ msg: "Invalid project ID" })
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
        return res.json({ msg: "Invalid project ID" })
    }
}

export const lookForCollaborator = async (req, res) => {
    const { id } = req.params
    try {
        const { email } = req.body
        const user = await User.findOne({ email }).select('-password -confirm -createdAt -token -updatedAt -__v')
        if (!user) {
            const error = new Error('User does not have an account')
            return res.status(404).json({ msg: error.message })
        }
        res.json(user)
    } catch (error) {
        return res.json({ msg: "Invalid project ID" })
    }

}

export const addCollaborator = async (req, res) => {
    const { id } = req.params
    try {
        const project = await Project.findById(id)
        if (!project) {
            const error = new Error('Project not found')
            res.status(404).json({ msg: error.message })
        }
        if (project.creator.toString() !== req.user._id.toString()) {
            const error = new Error('You are not the owner, invalid action')
            return res.status(403).json({ msg: error.message })
        }
        const { email } = req.body
        const user = await User.findOne({ email }).select('-confirm -createdAt -password -token -updatedAt')
        if (!user) {
            const error = new Error('User not found')
            return res.status(404).json({ msg: error.message })
        }

        if (project.creator.toString() === user._id.toString()) {
            const error = new Error('Creator can not be collaborator')
            return res.status(401).json({ msg: error.message })
        }

        if (project.team.includes(user._id)) {
            const error = new Error('User already belogs to project')
            return res.status(403).json({ msg: error.message })
        }

        project.team.push(user._id)
        await project.save()
        res.json({ msg: 'Collaborator added correctly' })

    } catch (error) {
        console.log(error)
        return res.json({ msg: "Invalid project ID " })
    }
}

export const deleteCollaborator = async (req, res) => {

}


export const getToDo = async (req, res) => {
    const { id } = req.params
    try {
        const project = await Project.findById(id)
        if (!project) {
            const error = new Error("Project not found")
            return res.status(404).json({ msg: error.message })
        }
    }
    catch (error) {
        return res.json({ msg: "Invalid project ID" })
    }

}