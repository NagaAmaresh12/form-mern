import express from "express";
import { verifyAccessToken } from "../middlewares/auth.middleware.js";
import {
  fetchAllProjects,
  fetchSingleProject,
  createProject,
  editProject,
  deleteProject,
} from "../controllers/projects.controller.js";
const router = express.Router();
router.get("/", fetchAllProjects);
router.get("/:id", fetchSingleProject);
router.post("/create", createProject);
router.put("/edit/:id", editProject);
router.delete("/delete/:id", deleteProject);
export default router;
