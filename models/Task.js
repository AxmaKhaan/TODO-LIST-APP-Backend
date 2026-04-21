import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
  title: String,
  course: String,
  status: String,
  dueDate: String,
  description: String
})

const Task = mongoose.model("Task", taskSchema)

export default Task