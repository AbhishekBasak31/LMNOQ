import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

const StatisticSecSchema = new SCHEMA(
  {
    Htext:{
        type: String,
      required: true,
   },
     Dtext:{
        type: String,
      required: true,
   },
   counter1:{
    type: String,
      required: true,
   },
   counter2:{
    type: String,
      required: true,
   },
    counter3:{
    type: String,
      required: true,
   },
   counter1text:{
    type: String,
      required: true,
   },
   counter2text:{
    type: String,
      required: true,
   },
    counter3text:{
    type: String,
      required: true,
   },

   rightsideCardQute:{
    type: String,
      required: true,
   },
    rightsideCardHtext:{
    type: String,
      required: true,
   },
    rightsideCardDtext:{
    type: String,
      required: true,
   },
    rightsideCardIcon:{
    type: String,
      required: true,
   },
   BottomleftText:{
    type: String,
      required: true,
   },
   BottomIcon1:{
    type: String,
      required: true,
   },
 BottomCounter1:{
    type: String,
      required: true,
   },
 BottomCounter1Text:{
    type: String,
      required: true,
   },

 BottomCounter2:{
    type: String,
      required: true,
   },
 BottomCounter2Text:{
    type: String,
      required: true,
   },
  },{ timestamps: true }
);
export const StatisticSec = mongoose.model("StatisticSec", StatisticSecSchema);