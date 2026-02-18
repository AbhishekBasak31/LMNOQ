import express from "express";
import {
  getNewsSec,
  createNewsSec,
  updateNewsSec,
  deleteNewsSec
} from "../../Controllers/Homepage/NewsSec.js";
import { authenticate } from "../../Middleware/AuthMiddlewares.js";

const NewsSecRouter = express.Router();

NewsSecRouter.get("/", getNewsSec);

// Protected Routes
NewsSecRouter.use(authenticate);
NewsSecRouter.post("/", createNewsSec);
NewsSecRouter.patch("/", updateNewsSec);
NewsSecRouter.delete("/", deleteNewsSec);

export default NewsSecRouter;
