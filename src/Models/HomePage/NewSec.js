// models/Footer.js
import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

const NewsSecSchema = new SCHEMA(
  {
    
    Htext:{
  type: String,
      required: true,
    },
   

  },
  { timestamps: true }
);

export const NewsSec= mongoose.model("NewsSec", NewsSecSchema);
export default NewsSec;
