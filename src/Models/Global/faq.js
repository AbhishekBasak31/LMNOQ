// models/Footer.js
import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";
const faqSchema = new mongoose.Schema({
    q:{
          type: String, 
    required: true 
    },
  a:{
    type: String, 
    required: true 
  },

});
const FaqSecSchema = new SCHEMA(
  {
htext:{
      type: String,
      required: true,
},
   dtext:{
    type: String,
      required: true,
   },
  faq:[faqSchema]
   
  },
  { timestamps: true }
);

export const FaqSec = mongoose.model("FaqSec", FaqSecSchema);
export default FaqSec;