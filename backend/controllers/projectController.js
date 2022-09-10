import Project from "../models/Project.js"

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
    const project = await Project.findById(id)
    console.log(project)
}

export const editProject = async (req, res) => {

}

export const deleteProject = async (req, res) => {

}

export const addCollaborator = async (req, res) => {

}

export const deleteCollaborator = async (req, res) => {

}


export const getToDo = async (req, res) => {

}