import express from 'express'
import cheackAuth from '../middleware/checkAuth.js'
import { addToDo, getToDo, editToDo, deleteToDo, changeState } from '../controllers/toDoController.js'

const router = express.Router()

router.post('/', cheackAuth, addToDo)
router.route('/:id').get(cheackAuth, getToDo).put(cheackAuth, editToDo).delete(cheackAuth, deleteToDo)
router.post('/state/:id', cheackAuth, changeState)

export default router