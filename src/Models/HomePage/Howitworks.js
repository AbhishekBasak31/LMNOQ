// models/Footer.js
import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

const StepSchema = new mongoose.Schema({
  Htext: { 
    type: String, 
    required: true 
  },
  Dtext:{
    type: String, 
    required: true 
  },
  Icon: { 
    type: String ,
    required: true 

  }
});
const HowitWorkSecSchema = new SCHEMA(
  {

   Htext:{
        type: String,
      required: true,
   },
   Dtext:{
        type: String,
      required: true,
   },
   steps:[StepSchema]

   
  },
  { timestamps: true }
);

export const HowitWorkSec = mongoose.model("HowitWorkSec", HowitWorkSecSchema);
export default HowitWorkSec;