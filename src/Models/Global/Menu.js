import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

const MenuSchema = new SCHEMA(
  {
    name: {
      type: String,
      required: true,
    },
    img:{
      type: String,
      required: true,
    },
    Dtext:{
      type: String,
      required: true,
    },
  
  },{ timestamps: true }
);
export const Menu = mongoose.model("Menu", MenuSchema);