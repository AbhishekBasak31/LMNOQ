import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";
import e from "express";
const ImageSchema = new mongoose.Schema({
  image: { 
    type: String, 
    required: true 
  },
  alt:{
    type: String, 
    required: true 
  },
  catagory:{
    type: String,
    enum:["laptop","phone"],
  }

});
const HomeDashSchema = new SCHEMA(
  {
   Htext:{
      type: String,
      required: true,
   },
   Dtext:{
      type: String,
      required: true,
   },
   Images:[ImageSchema]
  },{ timestamps: true }
);
export const HomeDash = mongoose.model("HomeDash", HomeDashSchema);