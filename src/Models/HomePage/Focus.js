import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";
const CardSchema = new mongoose.Schema({
  Icon: { 
    type: String, 
    required: true 
  },
  Htext:{
    type: String, 
    required: true 
  },
  Dtext: { 
    type: String ,
    required: true 
  },
   Bottomtext: { 
    type: String ,
    required: true 
  }
});
const FocusSecSchema = new SCHEMA(
  {

    Htext:{
        type: String,
      required: true,
   },
     Dtext:{
        type: String,
      required: true,
   },
   Cards:[CardSchema]

  },{ timestamps: true }
);
export const FocusSec = mongoose.model("FocusSec", FocusSecSchema);