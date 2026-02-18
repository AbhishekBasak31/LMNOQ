import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";
const ReviewsSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  designation: { 
    type: String, 
    required: true 
  },
  rating:{
    type: String, 
    required: true 
  },
  comment:{ 
    type: String ,
    required: true 
  },
  avatar: { 
    type: String ,
    required: true 
  }
});
const ReviewSectionSchema = new SCHEMA(
  {
    Htext:{
      type: String,
      require: true,
    },
   
  
    reviews:[ReviewsSchema]
  
  },{ timestamps: true }
);
export const ReviewSection = mongoose.model("ReviewSection", ReviewSectionSchema);