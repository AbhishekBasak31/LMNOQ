import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

// --- Sub-Schema for Team Members ---
const MemberSchema = new SCHEMA({
  Name: { type: String, required: true },
  Desig: { type: String, required: true },
  Img: { type: String, required: true },
  Linkdin: { type: String, required: true },

});

// --- Sub-Schema for "Why Xolo is Best" cards ---
const WCUcardsSchema = new SCHEMA({
  Htext: { type: String, required: true }, // e.g., "Unified Ecosystem"
  Dtext: { type: String, required: true }, // e.g., "No more switching apps..."
  // Note: Your frontend uses Lucide icons directly, 
});

const AboutXolopageSchema = new SCHEMA({
  // 1. Story Section
  OurStorytag: { type: String, required: true },   // "Our Story"
  OurStoryHtext: { type: String, required: true }, // "The Evolution of Xolo ERP"
  OurStoryDtext: { type: String, required: true }, 
  OurStoryImg: { type: String, required: true },
  OurStoryImgAltText: { type: String, required: true },

  // 2. Why Xolo Section (The Pinnace of Business Management)
  whytochooseHtext: { type: String, required: true },
  whytochooseDtext: { type: String, required: true },
  whytochosecards: [WCUcardsSchema], // Array of the 6 benefit cards

  // 3. Mission Section
  OurMissionHtext: { type: String, required: true },
  OurMissionDtext: { type: String, required: true },
  OurMissionImg: { type: String, required: true }, // Image used in the Mission section
  OurMissionImgAltText : { type: String, required: true }, 
  // 4. Vision Section
  OurVisionHtext: { type: String, required: true },
  OurVisionDtext: { type: String, required: true },
  OurVisionImg: { type: String, required: true }, // Image used in the Vision section
  OurVisionImgAltText: { type: String, required: true },

  // 5. Team Section (Architects of Efficiency)
  OurTeamHtext: { type: String, required: true },
  OurTeam: [MemberSchema],

  // 6. Demo/CTA Section (Ready to optimize your workflow?)
  CTAHtext: { type: String, required: true },
  CTADtext: { type: String, required: true },
  CTAButtonUrl: { type: String, required: true },
  CTAButtontext: { type: String, required: true },

}, { timestamps: true });

export const AboutXolopage = mongoose.model("AboutXolopage", AboutXolopageSchema);