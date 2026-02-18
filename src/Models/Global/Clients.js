import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

const LogoSchema = new mongoose.Schema({
  src: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  }
});

const ClientCategorySchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  side: {
    type: String,
    enum: ["left", "right"],
    default: "left"
  },
  logos: [LogoSchema]
});

const ClientSecSchema = new SCHEMA(
  {
    htext: {
      type: String,
      required: false,
    },
    dtext: {
      type: String,
      required: false,
    },
    client: [ClientCategorySchema]
  },
  { timestamps: true }
);

export const ClientSec = mongoose.model("ClientSec", ClientSecSchema);
