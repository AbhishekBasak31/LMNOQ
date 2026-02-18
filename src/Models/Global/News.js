// models/Footer.js
import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

const NewsSchema = new SCHEMA(
  {
 
   title:{
        type: String,
      required: true,
   },
    Dtext:{
        type: String,
      required: true,
     
   }, 
    img:{
        type: String,
      required: true,
   },   
    date:{
        type: String,
      required: true,
     
   }, 
   
  },
  { timestamps: true }
);

export const News= mongoose.model("News", NewsSchema);
export default News;
