import mongoose from "mongoose";
const SCHEMA = mongoose.Schema;

const PointSchema = new SCHEMA({
  id: { type: String }, // To store "01", "02", etc.
  tabTitle: { 
    type: String, 
    required: true 
  },
  heading: { 
    type: String, 
    required: true 
  },
  subHeading: { 
    type: String 
  }, // e.g., "Flawless Execution"
  desc: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String, 
    required: true 
  }, // Cloudinary/Unsplash URL
  imageAltText: { 
    type: String, 
    required: true 
  },

  // Array of strings is better than individual bulletpoint fields
  points: [{ 
    type: String 
  }], 
  
  featureTitle: { 
    type: String, 
    default: "Features" 
  },

  // Styling fields to match your UI
  icon: { 
    type: String, 
    required: true 
  }, // Lucide icon name like "Zap"
  color: { 
    type: String, 
    default: "text-blue-600" 
  }, // Tailwind text color class
  bg: { 
    type: String, 
    default: "bg-blue-600/10" 
  }, // Tailwind bg color class
  accent: { 
    type: String, 
    default: "bg-blue-600" 
  }, // Tailwind accent class
});

const AskXolopageSchema = new SCHEMA({
  Maintag: { 
    type: String, 
    required: true,
    default: "Interactive Knowledge Base"
  },
  MainHtext: { 
    type: String, 
    required: true 
  },
  Points: [PointSchema], // Embedded array of the point cards
  
  // Global CTA (Explored in your button "EXPLORE MODULE")
  CTAbuttonUrl: { 
    type: String 
  },
  CTAbuttontext: { 
    type: String 
  }
}, { timestamps: true });

export const AskXolopage = mongoose.model("AskXolopage", AskXolopageSchema);