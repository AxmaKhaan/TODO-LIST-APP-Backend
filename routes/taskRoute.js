import express, { response } from "express"
import Task from "../models/Task.js"

const taskRoutes = express.Router()

taskRoutes.post("/addtask", async (req, res) => {
  try {

    const task = new Task({
      title: req.body.title,
      course: req.body.course,
      status: req.body.status,
      dueDate: req.body.dueDate,
      description: req.body.description
    })

    await task.save()

    res.json({ success: true })

  } catch (err) {
    res.json({ success: false })
  }
})

// getting data
taskRoutes.get("/tasks", async (req, res) => {
  try {

    const today = new Date().toISOString().split("T")[0]; 
    // example: "2026-03-12"

    await Task.updateMany(
      { status: "Pending", dueDate: { $lt: today } },
      { $set: { status: "OverDue" } }
    );

    const tasks = await Task.find();

    res.json(tasks);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
})

taskRoutes.put("/editTask/:id", async (req, res) => {
  try {
    const id = req.params.id.trim();
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    console.log(error);
  }
})

taskRoutes.delete("/deletetask/:id", async (req, res) => {

  try {

    await Task.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Task deleted"
    });

  } catch (error) {

    res.json({
      success: false,
      message: "Delete failed"
    });

  }

});

taskRoutes.get("/taskcount", async (req, res) => {
  try {
    const totallCount = await Task.countDocuments();
    const completedTask = await Task.countDocuments({status: "Completed"})
    const pendingTask = await Task.countDocuments({status: "Pending"})
    const overDueTask = await Task.countDocuments({status: "OverDue"})
    res.json({ totallCount, completedTask, pendingTask, overDueTask })
  } catch (error) {
    console.log(error);
  }
});

export default taskRoutes;