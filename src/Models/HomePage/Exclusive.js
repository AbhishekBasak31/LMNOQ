import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

const ExclusiveSchema = new SCHEMA(
  {
   Htext:{
        type: String,
      required: true, 
   },
   Dtext:{
     type: String,
      required: true,
   },
   Img:{
   type: String,
      required: true,}
  },{ timestamps: true }
);


const HomeExclusiveFeatureSchema = new SCHEMA(
  {
   Htext:{
        type: String,
      required: true, 
   },
   exclusive:[ExclusiveSchema]

  },{ timestamps: true }
);
export const HomeExclusiveFeature = mongoose.model("HomeExclusiveFeature", HomeExclusiveFeatureSchema);


