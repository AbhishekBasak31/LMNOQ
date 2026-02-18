import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";
const ToolSchema = new mongoose.Schema({
  htext: { 
    type: String, 
    required: true 
  },
  dtext:{
    type: String, 
    required: true 
  },
  img: { 
    type: String ,
    required: true 

  }
});
const ToolsSectionSchema = new SCHEMA(
  {
    Htext:{
      type: String,
      require: true,
    },
    Dtext:{
      type: String,
      require: true,
    },
    tools:[ToolSchema]
  
  },{ timestamps: true }
);
export const ToolsSection = mongoose.model("ToolsSection", ToolsSectionSchema);