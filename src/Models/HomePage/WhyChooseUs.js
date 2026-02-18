import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

const WhyChooseUsSchema = new SCHEMA(
  {
    
    Htext:{
        type: String,
      required: true,
   },
    counter1:{
        type: String,
      required: true,
    },
    counter1Text:{
        type: String,
      required: true,
    },
     counter1Icon:{
        type: String,
      required: true,
    },

        counter2:{
        type: String,
      required: true,
    },
    counter2Text:{
        type: String,
      required: true,
    },
     counter2Icon:{
        type: String,
      required: true,
    },

        counter3:{
        type: String,
      required: true,
    },
    counter3Text:{
        type: String,
      required: true,
    },
     counter3Icon:{
        type: String,
      required: true,
    },

    counter4:{
        type: String,
      required: true,
    },
    counter4Text:{
        type: String,
      required: true,
    },
     counter4Icon:{
        type: String,
      required: true,
    }

  },{ timestamps: true }
);
export const WhyChooseUs = mongoose.model("WhyChooseUs", WhyChooseUsSchema);