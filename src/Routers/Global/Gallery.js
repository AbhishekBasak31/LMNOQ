import express from "express";
import { upload } from "../../Middleware/Multer.js";
import { 
  createGalleryEvent, 
  updateGalleryEvent, 
  getAllGalleryEvents, 
  getGalleryEventBySlug, 
  deleteGalleryEvent 
} from "../../Controllers/Global/Gallery.js";
import { authenticate } from "../../Middleware/AuthMiddlewares.js";

const GalleryEventRouter = express.Router();

const galleryUploads = upload.fields([
  { name: "coverImage", maxCount: 1 },
  { name: "galleryImages", maxCount: 100 }
]);

// Public Routes
GalleryEventRouter.get("/", getAllGalleryEvents);
GalleryEventRouter.get("/:slug", getGalleryEventBySlug);

// Protected Routes (Add your auth middleware)
GalleryEventRouter.use(authenticate);
GalleryEventRouter.post("/", galleryUploads, createGalleryEvent);
GalleryEventRouter.patch("/:id", galleryUploads, updateGalleryEvent);
GalleryEventRouter.delete("/:id", deleteGalleryEvent);

export default GalleryEventRouter;