import express from "express";
import { upload } from "../../Middleware/Multer.js";
import {
  getOwnersTalkSec,
  createOwnersTalkSec,
  updateOwnersTalkSec,
  deleteOwnersTalkSec
} from "../../Controllers/Homepage/OwnersTalk.js";
import { authenticate } from "../../Middleware/AuthMiddlewares.js";

const OwnersTalkSecRouter = express.Router();

const uploadMiddleware = upload.single("OwnerImg");

OwnersTalkSecRouter.get("/", getOwnersTalkSec);

// Protected Routes
OwnersTalkSecRouter.use(authenticate);
OwnersTalkSecRouter.post("/", uploadMiddleware, createOwnersTalkSec);
OwnersTalkSecRouter.patch("/", uploadMiddleware, updateOwnersTalkSec);
OwnersTalkSecRouter.delete("/", deleteOwnersTalkSec);

export default OwnersTalkSecRouter;
