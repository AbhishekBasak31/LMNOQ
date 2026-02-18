import mongoose from "mongoose";

// 1. Define a Sub-schema for the images
// This doesn't need to be a model, just a schema definition
const ImageSchema = new mongoose.Schema({
  url: { 
    type: String, 
    required: true 
  },
  publicId: { 
    type: String 
    // Optional: Store Cloudinary/S3 ID here if you need to delete the file later
  },
  caption: { 
    type: String 
  },
  isPopular: { 
    type: Boolean, 
    default: false 
  }
});

// 2. Define the Main Event Schema
const GalleryEventSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true,
      trim: true
    },
    slug: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true,
      index: true 
      // This will be used in your URL: /gallery/neon-nights
    },
    description: { 
      type: String, 
      required: true 
    },
    location: { 
      type: String, 
      required: true 
    },
    date: { 
      type: Date, 
      required: true 
      // IMPORTANT: Use Date type (not String) so you can sort/filter by "Last 7 Days", etc.
    },
    category: {
        type: String,
        enum: ['Party', 'DJ Set', 'Live Music', 'Dining', 'Workshop'],
        default: 'Party'
    },
    // The "Main" image shown on the card in the grid view
    coverImage: { 
      type: String, 
      required: true 
    },
    // The array of all images for the details view/modal
    images: [ImageSchema] 
  },
  { timestamps: true }
);

// Optional: Add a pre-save hook to auto-generate slug from title
// You can use a package like 'slugify' for this
// GalleryEventSchema.pre('validate', function(next) {
//   if (this.title && !this.slug) {
//     this.slug = this.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
//   }
//   next();
// });

export const GalleryEvent = mongoose.model("GalleryEvent", GalleryEventSchema);
export default GalleryEvent;