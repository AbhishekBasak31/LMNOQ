// Server/Models/Meta.js
import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";
const MetaSchema = new SCHEMA(
  {
    route: { type: String, required: true, unique: true }, 
    title: { type: String, required: true },
    description: { type: String },
    keywords: { type: String },
    ogTitle: { type: String },
    ogDescription: { type: String },
    ogImage: { type: String },
  },
  { timestamps: true }
);

export const Meta = mongoose.model("Meta", MetaSchema);
