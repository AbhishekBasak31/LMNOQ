import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

const FeatureSchema = new mongoose.Schema({
  Htext: { 
    type: String, 
    required: true 
  },
  Dtext:{
    type: String, 
    required: true 
  },
  points:[{
    type: String,
    required: true
  }],
  cardsizeImg: { 
    type: String ,
    required: true 
  },
    cardsizeImgAltText: { 
    type: String ,
    required: true 
  },
  largesizeImg: { 
    type: String ,
    required: true 
  },
    largesizeImgAltText: { 
    type: String ,
    required: true 
  },
});
const FeatureSecSchema = new SCHEMA(
  {
    Htext:{
        type: String,
      required: true,
   },
      Dtext:{
        type: String,
      required: true,
   },
    Features:[FeatureSchema]

  },{ timestamps: true }
);
export const FeatureSec = mongoose.model("FeatureSec", FeatureSecSchema);