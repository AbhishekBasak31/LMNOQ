// models/Footer.js
import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

const EventSecSchema = new SCHEMA(
  {
 
    Htext:{
        type: String,
      required: true,
     
   },   
   
  },
  { timestamps: true }
);

export const EventSec = mongoose.model("EventSec", EventSecSchema);
export default EventSec;
