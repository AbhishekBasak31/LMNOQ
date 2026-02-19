import express from "express";
import { upload } from "../../Middleware/Multer.js";
import { 
  getAboutPage, 
  createAboutPage, 
  updateAboutPage, 
  deleteAboutPage 
} from "../../Controllers/AboutPage/AboutPage.js";
import { authenticate } from "../../Middleware/AuthMiddlewares.js";

const AboutPageRouter = express.Router();

// Use upload.any() to handle dynamic team images + static section images
const anyUpload = upload.any();

AboutPageRouter.get("/", getAboutPage);

// Protected Routes
AboutPageRouter.use(authenticate);
AboutPageRouter.post("/", anyUpload, createAboutPage);
AboutPageRouter.patch("/", anyUpload, updateAboutPage);
AboutPageRouter.patch("/:id", anyUpload, updateAboutPage); // Support ID based patch if needed
AboutPageRouter.delete("/", deleteAboutPage);
AboutPageRouter.delete("/:id", deleteAboutPage);

export default AboutPageRouter;
