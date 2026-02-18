import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

const sectionSchema = new SCHEMA({
  title: { type: String, required: true },
  icon: { type: String, required: true }, // Ensure this matches everywhere
  content: { type: String, required: true }
});

const termsAndConditionsSchema = new SCHEMA({
  pageTitle: { type: String, default: "Terms & Conditions" },
  pageSubtitle: { type: String, default: "Please read these terms carefully before using the XOLO ERP platform." },

  sections: [sectionSchema],

  supportTitle: { type: String, required: true },
  supportDesc: { type: String, required: true },
  supportButtonText: { type: String, required: true },
  supportButtonUrl: { type: String, required: true }
}, { timestamps: true });

export const TermsAndConditions = mongoose.model("TermsAndConditions", termsAndConditionsSchema);