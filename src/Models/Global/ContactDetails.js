import mongoose from "mongoose";

const contactDetailsSchema = new mongoose.Schema({
  Htext: { type: String, default: "" },

  whour: { type: String, default: "" },
  email: { type: String, default: "" },
  phone: { type: String, default: "" },
  // FIX: Explicitly define as String to accept the text from your form
  address: { type: String, default: "" }, 
  map: { type: String, default: "" }
}, { timestamps: true });

export const ContactDetails = mongoose.model("ContactDetails", contactDetailsSchema);