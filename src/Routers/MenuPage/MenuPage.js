import express from "express";
import { upload } from "../../Middleware/Multer.js";
import { 
  getMenuPage, 
  createMenuPage, 
  updateMenuPage, 
  deleteMenuPage 
} from "../../Controllers/MenuPage/MenuPage.js";
import { authenticate } from "../../Middleware/AuthMiddlewares.js";

const MenuPageRouter = express.Router();

// Use upload.any() to handle dynamic nested array images
const anyUpload = upload.any();

MenuPageRouter.get("/", getMenuPage);

// Protected Routes
MenuPageRouter.use(authenticate);
MenuPageRouter.post("/", anyUpload, createMenuPage);
MenuPageRouter.patch("/", anyUpload, updateMenuPage);
MenuPageRouter.delete("/", deleteMenuPage);

export default MenuPageRouter;
