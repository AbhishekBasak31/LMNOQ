import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

const HomeAboutSchema = new SCHEMA(
  {
   Htext1:{
      type: String,
      required: true,
   },
    Htext2:{
      type: String,
      required: true,
   },
   Htext3:{
      type: String,
      required: true,
   },
   Dtext1:{
      type: String,
      required: true,
   },
    Dtext2:{
      type: String,
      required: true,
   },
    Dtext3:{
      type: String,
      required: true,
   },
   tab1Icon:{
    type: String,
      required: true,
   },
   tab2Icon:{
    type: String,
      required: true,
   },
   tab3Icon:{
    type: String,
      required: true,
   },
   tab1Name:{
    type: String,
      required: true,
   },
   tab2Name:{
    type: String,
      required: true,
   },
   tab3Name:{
    type: String,
      required: true,
   },

   tab1Bp1:{
    type: String,
      required: true,
   },
   tab1Bp2:{
    type: String,
      required: true,
   },
   tab1Bp3:{
    type: String,
      required: true,
   },
   tab1img:{
     type: String,
      required: true,
  },
  tab1imgAltText:{
    type: String,
      required: true,
  },

   tab2Bp1:{
    type: String,
      required: true,
   },
   tab2Bp2:{
    type: String,
      required: true,
   },
   tab2Bp3:{
    type: String,
      required: true,
   },
   tab2img:{
     type: String,
      required: true,
  },
  tab2imgAltText:{
    type: String,
      required: true,
  },


   tab3Bp1:{
    type: String,
      required: true,
   },
   tab3Bp2:{
    type: String,
      required: true,
   },
   tab3Bp3:{
    type: String,
      required: true,
   },
  tab3img:{
     type: String,
      required: true,
  },
    tab3imgAltText:{
     type: String,
      required: true,
  },

  },{ timestamps: true }
);
export const HomeAbout = mongoose.model("HomeAbout", HomeAboutSchema);