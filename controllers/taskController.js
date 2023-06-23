import { Task, Project } from "../models/index.js";
import { isValidObjectId } from "mongoose";

const newTask = async (req, res) => {
  const { project } = req.body;

  const projectExist = await Project.findById(project);

  // if (!isValidObjectId(project)) {
  //   const error = new Error("Id no válido");
  //   return res.status(404).json({ msg: error.message });
  // }

  if (!projectExist) {
    const error = new Error("No existe el proyecto");
    return res.status(404).json(error.message);
  }

  if (projectExist.creator.toString() !== req.user.id.toString()) {
    const error = new Error("No eres el creador del proyecto");
    return res.status(404).json(error.message);
  }

  try {
    const taskSave = await Task.create(req.body);
    res.status(201).json(taskSave);
  } catch (error) {
    console.log(error);
  }
};
const getTask = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    const error = new Error("Id no válido");
    return res.status(404).json({ msg: error.message });
  }

  const task = await Task.findById(id).populate("project");

  if (!task) {
    const error = new Error("No existe tarea con ese Id");
    return res.status(404).json({ msg: error.message });
  } else if (tarea.project.creator.toString() !== req.user._id.toString()) {
    const error = new Error("No eres el creador del proyecto de esta tarea");
    return res.status(403).json({ msg: error.message });
  }

  return res.status(200).json(task);
};
const editTask = async (req, res) => {
  const { project } = req.body;

  const projectExist = await Project.findById(project);

  if (!projectExist) {
    const error = new Error("No existe el proyecto");
    return res.status(404).json(error.message);
  }
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    const error = new Error("Id no válido");
    return res.status(404).json({ msg: error.message });
  }

  await Task.findByIdAndUpdate(id, {
    priority: req.body.priority,
    status: req.body.status,
    name: req.body.name,
    description: req.body.description,
    dateEnd: req.body.dateEnd,
  });
  const taskUpdate = await Task.findById(id);
  await res.status(201).json(taskUpdate);
};
const deleteTask = async (req, res) => {
  const { id } = req.params;

  const { project } = req.body;

  const projectExist = await Project.findById(project);

  if (!projectExist) {
    const error = new Error("No existe la tarea");
    return res.status(404).json(error.message);
  }

  if (!isValidObjectId(id)) {
    const error = new Error("Id no válido");
    return res.status(404).json({ msg: error.message });
  }

  const task = await Task.findById(id).populate("project");

  if (!task) {
    const error = new Error("No existe tarea con ese Id");
    return res.status(404).json({ msg: error.message });
  } else if (task.project.creator.toString() !== req.user._id.toString()) {
    const error = new Error("No eres el creador del proyecto");
    return res.status(404).json({ msg: error.message });
  }

  try {
    await task.deleteOne();
    res.status(200).json({ msg: "Tarea eliminada" });
  } catch (error) {
    console.log(error);
  }
};

const changeStatus = async (req, res) => {};

export { editTask, deleteTask, newTask, getTask, changeStatus };
