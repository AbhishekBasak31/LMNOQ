import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

const HomeBannerSchema = new SCHEMA(
  {
   Htext1:{
        type: String,
      required: true, 
   },
   Dtext1:{
     type: String,
      required: true,
   },
   Htext2:{
        type: String,
      required: true, 
   },
   Dtext2:{
     type: String,
      required: true,
   },
   Htext3:{
        type: String,
      required: true, 
   },
   Dtext3:{
     type: String,
      required: true,
   },
   Video1:{
   type: String,
      required: true, 
   },
  Video2:{
   type: String,
      required: true, 
   },
   Video3:{
   type: String,
      required: true, 
   },

  },{ timestamps: true }
);
export const HomeBanner = mongoose.model("HomeBanner", HomeBannerSchema);


