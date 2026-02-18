import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";


const ServicePageSchema = new SCHEMA(
  {
  heroImg: { 
    type: String, 
    required: true 
  },
  CtaHtext: { 
    type: String ,
    required: true 
  },
  CtaDtext: { 
    type: String ,
    required: true 
  },
  CtaButtonText: { 
   type: String ,
    required: true 
  },
   CtaButtonUrl: { 
   type: String ,
    required: true 
  },
   
},{ timestamps: true }
);



export const ServicePage = mongoose.model("ServicePage", ServicePageSchema);
