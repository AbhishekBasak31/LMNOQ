import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

// 1. Independent Category Schema
const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g. "Hair", "Nails"
  slug: { type: String, required: true }  // e.g. "hair", "nails"
});

// 2. Independent Service Schema
const ServiceSchema = new mongoose.Schema({
  categorySlug: { type: String, required: true }, // Links to CategorySchema.slug
  Htext: { type: String, required: true },
  Dtext: { type: String, required: true },
  Video: { type: String, required: true },
  VideoTag: { type: String, required: true },
  price: { type: String, required: true },
  discountType: { type: String, enum: ["PERCENTAGE", "CASH"], default: "CASH" }
});

// 3. Main Singleton Schema
const ServiceSecSchema = new SCHEMA(
  {
    tag: { type: String, required: true },
    Htext: { type: String, required: true },
    Dtext: { type: String, required: true },
    
    // Lists are managed independently in the controller
    categories: [CategorySchema], 
    services: [ServiceSchema]
  },
  { timestamps: true }
);

export const ServiceSec = mongoose.model("ServiceSec", ServiceSecSchema);
export default ServiceSec;