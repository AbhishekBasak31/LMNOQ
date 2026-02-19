import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

const MenuSchema = new SCHEMA(
  {
    name:{
        type: String,
        required: true,
    },
    img:[{
        type: String,
        required: true,
    }],
    

});

const MenuPageSchema = new SCHEMA(
  {
 mainTag:{
    type: String ,
    required: true 
  },    
  mainHtext: { 
    type: String ,
    required: true 
  },
  mainDtext: { 
    type: String ,
    required: true 
  },
  Menu:[MenuSchema],
  CtaHtext: { 
   type: String ,
    required: true 
  },
   CtaDtext: { 
   type: String ,
    required: true 
  },
   
},{ timestamps: true }
);



export const MenuPage = mongoose.model("MenuPage", MenuPageSchema);
