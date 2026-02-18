import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

const EnquirySchema = new SCHEMA(
  {
   
    name: {
      type: String,
      required: false,
    },
    email:{
    type: String,
      require: false,
    },
    phone:{
        type: String,
      require: true,
    },
    enquirie: {
      type: String,
      require: false,
    },
  
  },{ timestamps: true }
);
export const Enquiry = mongoose.model("Enquiry", EnquirySchema);
