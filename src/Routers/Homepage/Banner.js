import express from "express";
import { upload } from "../../Middleware/Multer.js";
import { 
  getHomeBanner, 
  createHomeBanner, 
  updateHomeBanner, 
  deleteHomeBanner 
} from "../../Controllers/Homepage/Banner.js";
import { authenticate } from "../../Middleware/AuthMiddlewares.js";

const HomeBannerRouter = express.Router();

const bannerUploads = upload.fields([
  { name: "Video1", maxCount: 1 },
  { name: "Video2", maxCount: 1 },
  { name: "Video3", maxCount: 1 }
]);

HomeBannerRouter.get("/", getHomeBanner);
HomeBannerRouter.post("/", authenticate, bannerUploads, createHomeBanner);
HomeBannerRouter.patch("/", authenticate, bannerUploads, updateHomeBanner);
HomeBannerRouter.delete("/", authenticate, deleteHomeBanner);

export default HomeBannerRouter;