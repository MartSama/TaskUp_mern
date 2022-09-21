import express from "express"
import { getProject, newProject, getProjects, editProject, deleteProject, addCollaborator, deleteCollaborator, getToDo, lookForCollaborator } from "../controllers/projectController.js";
import cheackAuth from "../middleware/checkAuth.js";

const router = express.Router()

router.route('/').get(cheackAuth, getProjects).post(cheackAuth, newProject)
router.route('/:id').get(cheackAuth, getProject).put(cheackAuth, editProject).delete(cheackAuth, deleteProject)
router.get('/toDo/:id', cheackAuth, getToDo)
router.post('/collaborators', cheackAuth, lookForCollaborator)
router.post('/collaborators/:id', cheackAuth, addCollaborator)
router.post('/delete-collaborator/:id', cheackAuth, deleteCollaborator)

export default router