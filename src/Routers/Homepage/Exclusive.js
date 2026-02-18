import express from "express";
import { upload } from "../../Middleware/Multer.js";
import { 
  getHomeExclusiveFeature, 
  createHomeExclusiveFeature, 
  updateHomeExclusiveFeature, 
  deleteHomeExclusiveFeature 
} from "../../Controllers/Homepage/Exclusive.js";
import { authenticate } from "../../Middleware/AuthMiddlewares.js";

const HomeExclusiveFeatureRouter = express.Router();

// We use upload.any() because the array of exclusive items is dynamic.
// Files will come in as exclusive[0][Img], exclusive[1][Img], etc.
HomeExclusiveFeatureRouter.get("/", getHomeExclusiveFeature);
HomeExclusiveFeatureRouter.post("/", authenticate, upload.any(), createHomeExclusiveFeature);
HomeExclusiveFeatureRouter.patch("/", authenticate, upload.any(), updateHomeExclusiveFeature);
HomeExclusiveFeatureRouter.delete("/", authenticate, deleteHomeExclusiveFeature);

export default HomeExclusiveFeatureRouter;
