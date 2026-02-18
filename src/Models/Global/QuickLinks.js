// models/Footer.js
import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

const QuickLinksSchema = new SCHEMA(
  {
   name:{
        type: String,
      required: true,
   },
    link:{
        type: String,
      required: true,
   },   
  },
  { timestamps: true }
);

export const QuickLinks = mongoose.model("QuickLink", QuickLinksSchema);
export default QuickLinks;
