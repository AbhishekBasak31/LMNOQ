import express from "express";
import { 
  getGallerySec, 
  createGallerySec, 
  updateGallerySec, 
  deleteGallerySec 
} from "../../Controllers/Homepage/GallerySec.js";
import { authenticate } from "../../Middleware/AuthMiddlewares.js";

const GallerySecRouter = express.Router();

GallerySecRouter.get("/", getGallerySec);

// Protected Routes
GallerySecRouter.use(authenticate);

GallerySecRouter.post("/", createGallerySec);
GallerySecRouter.patch("/", updateGallerySec);
GallerySecRouter.delete("/", deleteGallerySec);

export default GallerySecRouter;
