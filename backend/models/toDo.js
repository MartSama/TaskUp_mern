import mongoose from "mongoose";

const toDoSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    state: {
        type: Boolean,
        default: false
    },
    deadline: {
        type: Date,
        required: true,
        default: Date.now()
    },
    priority: {
        type: String,
        required: true,
        enum: ['Low', 'Medium', 'High']
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    complete: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

const ToDo = mongoose.model("ToDo", toDoSchema)

export default ToDo;