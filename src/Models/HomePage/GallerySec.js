// models/Footer.js
import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";


const GallerySecSchema = new SCHEMA(
  {
   Htext:{
        type: String,
      required: true,
   },
  },
  { timestamps: true }
);

export const GallerySec = mongoose.model("GallerySec", GallerySecSchema);
export default GallerySec;
