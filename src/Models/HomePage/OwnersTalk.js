// models/Footer.js
import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";


const OwnersTalkSecSchema = new SCHEMA(
  {
   Htext:{
        type: String,
      required: true,
   },
     Dtext:{
        type: String,
      required: true,
   },
   OwnerImg:{
     type: String,
      required: true,
   },
   Ownersname:{
    type: String,
      required: true,
   },
   OwnersTitle:{
    type: String,
      required: true,
   },
   ownersThoughts:{
    type: String,
      required: true,
   }
  },
  { timestamps: true }
);

export const OwnersTalkSec = mongoose.model("OwnersTalkSec", OwnersTalkSecSchema);
export default OwnersTalkSec;
