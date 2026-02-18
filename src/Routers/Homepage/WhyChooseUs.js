import express from "express";
import { upload } from "../../Middleware/Multer.js"; // Your multer config
import { 
  getWhyChooseUs, 
  createWhyChooseUs, 
  updateWhyChooseUs, 
  deleteWhyChooseUs 
} from "../../Controllers/Homepage/WhyChooseUs.js"; 
import { authenticate } from "../../Middleware/AuthMiddlewares.js";

const WhyChooseUsRouter = express.Router();

// Multer Config for 4 icon fields
const iconUploads = upload.fields([
  { name: "counter1Icon", maxCount: 1 },
  { name: "counter2Icon", maxCount: 1 },
  { name: "counter3Icon", maxCount: 1 },
  { name: "counter4Icon", maxCount: 1 },
]);

// Routes
WhyChooseUsRouter.get("/", getWhyChooseUs);

// Protected
WhyChooseUsRouter.use(authenticate);
WhyChooseUsRouter.post("/", iconUploads, createWhyChooseUs);
WhyChooseUsRouter.patch("/", iconUploads, updateWhyChooseUs);
WhyChooseUsRouter.delete("/", deleteWhyChooseUs);

export default WhyChooseUsRouter;