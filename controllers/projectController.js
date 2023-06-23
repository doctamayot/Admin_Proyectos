import Project from "../models/Project.js";
import { isValidObjectId } from "mongoose";
import Task from "../models/Task.js";

const getProjects = async (req, res) => {
  const projects = await Project.find().where("creator").equals(req.user);

  res.status(200).json(projects);
};
const newProject = async (req, res) => {
  const { client, name, description } = req.body;
  const project = new Project(req.body);
  project.creator = req.user._id;
  project.client = client;
  project.description = description;

  try {
    const projectSave = await project.save();
    res.status(201).json(projectSave);
  } catch (error) {
    console.log(error);
  }
};
const getProject = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    const error = new Error("Id no válido");
    return res.status(404).json({ msg: error.message });
  }

  const project = await Project.findById(id);

  if (!project) {
    const error = new Error("No existe proyecto con ese Id");
    return res.status(404).json({ msg: error.message });
  } else if (project.creator.toString() !== req.user._id.toString()) {
    const error = new Error("No eres el creador del proyecto");
    return res.status(404).json({ msg: error.message });
  }

  //Obtener las tareas
  const tareas = await Task.find({ project: project.id });

  return res.status(200).json({ project, tareas });
};
const editProject = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    const error = new Error("Id no válido");
    return res.status(404).json({ msg: error.message });
  }

  await Project.findByIdAndUpdate(id, {
    client: req.body.client,
    name: req.body.name,
    description: req.body.description,
    dateEnd: req.body.dateEnd,
  });
  const projectUpdate = await Project.findById(id);
  await res.status(201).json(projectUpdate);
};
const deleteProject = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    const error = new Error("Id no válido");
    return res.status(404).json({ msg: error.message });
  }

  const project = await Project.findById(id);

  if (!project) {
    const error = new Error("No existe proyecto con ese Id");
    return res.status(404).json({ msg: error.message });
  } else if (project.creator.toString() !== req.user._id.toString()) {
    const error = new Error("No eres el creador del proyecto");
    return res.status(403).json({ msg: error.message });
  }

  try {
    await project.deleteOne();
    res.status(200).json({ msg: "proyecto eliminado" });
  } catch (error) {
    console.log(error);
  }
};
const newColab = async (req, res) => {};
const deleteColab = async (req, res) => {};

export {
  getProjects,
  editProject,
  deleteProject,
  newColab,
  deleteColab,
  newProject,
  getProject,
};
