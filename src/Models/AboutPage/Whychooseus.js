import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

// --- Sub-schema for the Features (Real-Time Protection, etc.) ---
const FeatureSchema = new SCHEMA({
  Htext: { type: String, required: true },
  Dtext: { type: String, required: true },
  Icon: { type: String, required: true }, // Store Lucide icon name (e.g., "ShieldCheck")
  ColorClass: { type: String } // Optional: Store color classes like "text-emerald-500"
});

// --- Sub-schema for the Stats (Total Downloads, Happy Users, etc.) ---
const StatSchema = new SCHEMA({
  label: { type: String, required: true },
  val: { type: Number, required: true }, // Changed to Number for the counter
  suffix: { type: String, default: "" }, // e.g., "+"
  Icon: { type: String, required: true }, // Store Lucide icon name (e.g., "Download")
  ColorClass: { type: String } // e.g., "text-blue-600"
});

const WhyChooseUspageSchema = new SCHEMA({
  // Top Section Content
  Maintag: { type: String, required: true },   // "Success Engineering"
  MainHtext: { type: String, required: true }, // "Why Choose XOLO ERP"
  MainDtext: { type: String, required: true }, 

  // Features List
  Features: [FeatureSchema],

  // Right Side Visuals
  RightsideImg: { type: String, required: true },
  RightsideImgAltText: { type: String, required: true },

  Liveupdatenumber: { type: Number, required: true }, // For the +12.5% widget

  // Bottom Stats Section
  StatsHtext: { type: String, required: true }, // "XOLO ERP in Numbers"
  StatsDtext: { type: String, required: true },
  Stats: [StatSchema], // This replaces StatscardsIcon1, 2, 3 etc.

  // Call to Action
  CTAbuttonUrl: { type: String, required: true },
  CTAbuttontext: { type: String, required: true }
}, { timestamps: true });

export const WhyChooseUspage = mongoose.model("WhyChooseUspage", WhyChooseUspageSchema);