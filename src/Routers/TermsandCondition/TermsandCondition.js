import express from "express";
import { upload } from "../../Middleware/Multer.js";
import { 
  getTermsandCondition, 
  createTermsandCondition, 
  updateTermsandCondition, 
  deleteTermsandCondition 
} from "../../Controllers/TermsandCondition/TermsandCondition.js";
import { authenticate } from "../../Middleware/AuthMiddlewares.js";

const TermsandConditionRouter = express.Router();

// Use upload.any() to handle dynamic point icons
const anyUpload = upload.any();

TermsandConditionRouter.get("/", getTermsandCondition);

// Protected Routes
TermsandConditionRouter.use(authenticate);
TermsandConditionRouter.post("/", anyUpload, createTermsandCondition);
TermsandConditionRouter.patch("/", anyUpload, updateTermsandCondition);
TermsandConditionRouter.delete("/", deleteTermsandCondition);

export default TermsandConditionRouter;