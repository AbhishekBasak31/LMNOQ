import express from "express";
import { upload } from "../../Middleware/Multer.js";
import { 
  getPrivacyPolicy, 
  createPrivacyPolicy, 
  updatePrivacyPolicy, 
  deletePrivacyPolicy 
} from "../../Controllers/PrivacyPolicy/PrivacyPolicy.js";
import { authenticate } from "../../Middleware/AuthMiddlewares.js";

const PrivacyPolicyRouter = express.Router();

// Use upload.any() to handle dynamic point icons
const anyUpload = upload.any();

PrivacyPolicyRouter.get("/", getPrivacyPolicy);

// Protected Routes
PrivacyPolicyRouter.use(authenticate);
PrivacyPolicyRouter.post("/", anyUpload, createPrivacyPolicy);
PrivacyPolicyRouter.patch("/", anyUpload, updatePrivacyPolicy);
PrivacyPolicyRouter.delete("/", deletePrivacyPolicy);

export default PrivacyPolicyRouter;