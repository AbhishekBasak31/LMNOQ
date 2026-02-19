import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

const Memeberschema = new SCHEMA(
  {
    name:{
      type: String,
      required: true,
   },
    position:{
      type: String,
      required: true,
   },
    img:{
      type: String,
      required: true,
   },


  });

const AboutPageSchema = new SCHEMA(
  {
    mainTag:{
      type: String,
      required: true,
   
    },
   mainHtext:{
      type: String,
      required: true,
   },
   mainDtext:{
      type: String,
      required: true,
   },
   abouttag:{
      type: String,
      required: true,
   },
    aboutHtext:{
      type: String,
      required: true,
   },
    aboutDtext:{
      type: String,
      required: true,
   },
   aboutImg1:{
    type: String,
      required: true,
   },
   aboutImg2:{
    type: String,
      required: true,
   },
    aboutImg3:{
    type: String,
      required: true,
   },
   ourMissionHtext:{
    type: String,
      required: true,
   },
    
  ourMissionCard1Icon:{
      type: String,
      required: true,
   },
    ourMissionCard1Htext:{
      type: String,
      required: true,
   },
   ourMissionCard1Dtext:{
      type: String,
      required: true,
   },
  ourMissionCard2Icon:{
      type: String,
      required: true,
   },
    ourMissionCard2Htext:{
      type: String,
      required: true,
   },
   ourMissionCard2Dtext:{
      type: String,
      required: true,
   },
     ourMissionCard3Icon:{
      type: String,
      required: true,
   },
    ourMissionCard3Htext:{
      type: String,
      required: true,
   },
   ourMissionCard3Dtext:{
      type: String,
      required: true,
   },
    ourTeamHtext:{
    type: String,
      required: true,
   },
    Ourteam:[Memeberschema],
    CtaHtext:{
    type: String,
      required: true,
    },
     CtaDtext:{
    type: String,
      required: true,
    },
    
  },{ timestamps: true }
);
export const AboutPage = mongoose.model("AboutPage", AboutPageSchema);