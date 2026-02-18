// models/Footer.js
import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

const PackageSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  price:{
   type: String, 
    required: true 
  },
  duration:{
    type: String, 
    required: true 
  },
  dtext: { 
    type: String ,
    required: true 
  },
  bp1:{
    type: String ,
    required: true 
  },
  bp2:{
    type: String ,
    required: true 
  },
  bp3:{
    type: String ,
    required: true 
  },
  popular:{
    type: Boolean ,
    required: true 
  }
});
const PackageSecSchema = new SCHEMA(
  {
 
   Htext:{
        type: String,
      required: true,
   },
    Dtext:{
        type: String,
      required: true,
   }, 

   package:[PackageSchema]
  },
  { timestamps: true }
);

export const PackageSec= mongoose.model("PackageSec", PackageSecSchema);
export default PackageSec;