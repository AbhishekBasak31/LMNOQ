import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

const EventSchema = new SCHEMA(
  {
   slug: {
      type: String,
      lowercase: true,
      unique: true,
      sparse: true, // <--- ADD THIS: Allows avoiding "null" duplication errors
      required: true, // <--- ADD THIS: Ensures a slug must exist
    },
    img: {
      type: String,
      required: true,
    },
    location:{
      type: String,
      required: true,
    },
    title: {
      type: String,
       required: true,
    },
    catagory: {
      type: String,
      required: true, 
    },
    date: {
      type: String,
      required: true, 
    },
    time: {
     type: String,
      required: true,
    },
    description: {
      type: String,
      required: true, 
    },
    hostcontact:{
        type: String,
      required: true,
    },
    hostname:{
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true, // Set to false to hide from frontend without deleting
    },
  },
  { timestamps: true }
);

// Middleware to auto-generate slug before saving
EventSchema.pre("save", function (next) {
  if (this.title && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }
  next();
});

export const Event = mongoose.model("Event", EventSchema);