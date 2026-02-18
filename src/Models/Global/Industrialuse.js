// models/Footer.js
import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";
const CardsSchema = new mongoose.Schema({
  img: { 
    type: String, 
    required: true 
  },
  imgAltText:{
        type: String, 
    required: true
  },
  htext:{
    type: String, 
    required: true 
  },
  dtext:{ 
    type: String ,
    required: true 
  },
});
const IndustrialSecSchema = new SCHEMA(
  {
 
   htext:{
        type: String,
      required: true,
   },
    dtext:{
        type: String,
      required: true,
     
   }, 
    card:[CardsSchema]
   
  },
  { timestamps: true }
);

export const IndustrialSec= mongoose.model("IndustrialSec", IndustrialSecSchema);
export default IndustrialSec;