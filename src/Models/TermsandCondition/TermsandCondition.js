import mongoose from "mongoose";

const SCHEMA = mongoose.Schema;
const pointsSchema = new SCHEMA({
  icon:{
    type: String,
    required: true,
  },
  name:{
    type: String,
    required: true,
  },
  bulletPoints:[{
    type: String,
    required: true,
  }]
})
const TermsandConSchema = new SCHEMA({
  mainTag:{
    type: String,
    required: true,
  },
  mainHtext: {
    type: String,
    required: true,
  },
  mainDtext: {
    type: String,
    required: true,
  },

  shortDtext:{
    type: String,
    required: true,
  },

  points:[pointsSchema],
  CTAHtext:{
    type: String,
    required: true,
  },
  CTADtext:{
    type: String,
    required: true,
  },
  CTALine1:{
    type: String,
    required: true,
  },
    CTALine2:{
    type: String,
    required: true,
  },
  CTALine3:{
    type: String,
    required: true,
  },
})

export const TermsandCondition = mongoose.model("TermsandCondition", TermsandConSchema);