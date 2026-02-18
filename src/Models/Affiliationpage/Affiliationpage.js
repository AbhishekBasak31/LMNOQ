import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

const AffiliateSchema = new SCHEMA(
  {
 
    HeadTag: {
      type: String,
   
    },
    Htext: {
      type: String,
      required: true,
 
    },
    Dtext: {
      type: String,
      required: true,
 
    },
    righttext1:{
        type: String,
        required: true,
    },
    righttext1value:{
        type: String,
        required: true,
    },
    righttext2:{
        type: String,
        required: true,
    },
       righttext2value:{
        type: String,
        required: true,
    },
    righttext3:{
        type: String,
        required: true,
    },

    righttext3value:{
        type: String,
        required: true,
    },
    Card1Icon:{
        type: String,
        required: true,

    },
    Card1Htext:{
        type: String,
        required: true,

    },
    Card1Dtext:{
        type: String,
        required: true,

    },

    Card2Icon:{
        type: String,
        required: true,

    },
    Card2Htext:{
        type: String,
        required: true,

    },
    Card2Dtext:{
        type: String,
        required: true,

    },
    Card3Icon:{
        type: String,
        required: true,

    },
    Card3Htext:{
        type: String,
        required: true,

    },
    Card3Dtext:{
        type: String,
        required: true,

    },    

    midHtext:{
        type: String,
        required: true,
    },
    steps:[{
        stepnumber:{
            type: String,
            required: true,},
        stephtext:{
            type: String,
            required: true,},
        stepdtext:{
            type: String,
            required: true,}
    }],
    CtaHtext:{
        type: String,
        required: true,},
    CtaDtext:{
        type: String,
        required: true,},
     CtaDtext2:{
        type: String,
        required: true,},
   

  },
  { timestamps: true }
);

export const Affiliate = mongoose.model("Affiliate", AffiliateSchema);