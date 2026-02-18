import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

const BlogSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  date: {
    type: String, 
    required: true 
  },
  category: {
    type: String, 
    required: true 
  },
  excerpt: {
    type: String, 
    required: true 
  },
  content: {
    type: String, 
    required: true 
  },
  hashtags: [{
    type: String
  }],
  image: { 
    type: String, 
    required: true 
  },
  imageAltText:{
        type: String, 
    required: true
  },
});

const BlogSecSchema = new SCHEMA(
  {
    htext: {
      type: String,
      required: false,
    },
    dtext: {
      type: String,
      required: false,
    },
    blogs: [BlogSchema]
  },
  { timestamps: true }
);

export const BlogSec = mongoose.model("BlogSec", BlogSecSchema);
