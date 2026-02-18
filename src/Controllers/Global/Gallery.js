import mongoose from "mongoose";
import GalleryEvent from "../../Models/Global/Gallery.js";
import  uploadOnCloudinary  from "../../Utils/Clodinary.js"; 
import slugify from "slugify";

/* ================= CREATE ================= */
export const createGalleryEvent = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const { title, description, location, date, category, popularIndices } = req.body;
    const files = req.files || {};

    // 1. Validation
    if (!title || !description || !date || !files.coverImage) {
      throw new Error("Title, Description, Date, and Cover Image are required");
    }

    // 2. Parse Popular Indices (Convert "0,2" string to [0, 2])
    let popularIndexesArray = [];
    if (popularIndices) {
      // Handle if it comes as a string (from Postman/FormData) or actual array
      if (typeof popularIndices === 'string') {
        popularIndexesArray = popularIndices.split(',').map(num => parseInt(num.trim()));
      } else if (Array.isArray(popularIndices)) {
        popularIndexesArray = popularIndices.map(num => parseInt(num));
      }
    }

    // 3. Generate Slug
    let slug = slugify(title, { lower: true, strict: true });
    const existingSlug = await GalleryEvent.findOne({ slug }).session(session);
    if (existingSlug) {
      slug = `${slug}-${Date.now()}`;
    }

    // 4. Upload Cover Image
    const coverLocalPath = files.coverImage[0].path;
    const coverUpload = await uploadOnCloudinary(coverLocalPath);
    if (!coverUpload) throw new Error("Failed to upload cover image");

    // 5. Upload Gallery Images
    const galleryImageObjects = [];
    if (files.galleryImages && files.galleryImages.length > 0) {
      
      // Use map with index to match against popularIndexesArray
      const uploadPromises = files.galleryImages.map(async (file, index) => {
        const upload = await uploadOnCloudinary(file.path);
        
        // Check if this current index was marked as popular
        const isThisImagePopular = popularIndexesArray.includes(index);

        if (upload) {
          return {
            url: upload.secure_url,
            publicId: upload.public_id,
            isPopular: isThisImagePopular // ✅ Set dynamically based on index
          };
        }
      });
      
      const results = await Promise.all(uploadPromises);
      results.forEach(img => { if (img) galleryImageObjects.push(img) });
    }

    // 6. Create Document
    const newEvent = new GalleryEvent({
      title,
      slug,
      description,
      location,
      date, 
      category,
      coverImage: coverUpload.secure_url,
      images: galleryImageObjects
    });

    await newEvent.save({ session });

    await session.commitTransaction();
    return res.status(201).json({ success: true, message: "Event created successfully", data: newEvent });

  } catch (err) {
    if (session.inTransaction()) await session.abortTransaction();
    console.error("Create Error:", err);
    return res.status(500).json({ success: false, message: err.message });
  } finally {
    session.endSession();
  }
};
/* ================= UPDATE ================= */
export const updateGalleryEvent = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const { id } = req.params;

    // 1. Fetch Event
    const event = await GalleryEvent.findById(id).session(session);
    if (!event) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Event not found" });
    }

    const files = req.files || {};
    
    // Extract special handling fields
    const { 
      popularIndices, 
      existingPopularityChanges, 
      deletedImageIds, 
      ...bodyFields 
    } = req.body;

    /* ---------------------------------------------------------
       1. TEXT FIELDS UPDATE
    --------------------------------------------------------- */
    Object.keys(bodyFields).forEach((key) => {
        event[key] = bodyFields[key];
    });

    // Handle Slug Update if title changed
    if (bodyFields.title && bodyFields.title !== event.title) {
      let newSlug = slugify(bodyFields.title, { lower: true, strict: true });
      const existingSlug = await GalleryEvent.findOne({ slug: newSlug, _id: { $ne: id } }).session(session);
      if (existingSlug) {
        newSlug = `${newSlug}-${Date.now()}`;
      }
      event.slug = newSlug;
    }

    /* ---------------------------------------------------------
       2. COVER IMAGE UPDATE (Direct Assignment)
    --------------------------------------------------------- */
    if (files.coverImage?.[0]) {
      const coverUpload = await uploadOnCloudinary(files.coverImage[0].path);
      if (coverUpload?.secure_url) {
          event.coverImage = coverUpload.secure_url; // Assign directly to document
      }
    }

    /* ---------------------------------------------------------
       3. HANDLE EXISTING POPULARITY CHANGES
    --------------------------------------------------------- */
    if (existingPopularityChanges) {
      let changesArray = [];
      try {
        changesArray = typeof existingPopularityChanges === 'string' 
          ? JSON.parse(existingPopularityChanges) 
          : existingPopularityChanges;
      } catch (e) {
        console.error("Failed to parse existingPopularityChanges");
      }

      if (Array.isArray(changesArray)) {
        changesArray.forEach(change => {
          const imageSubDoc = event.images.id(change._id);
          if (imageSubDoc) {
            imageSubDoc.isPopular = change.isPopular;
          }
        });
      }
    }

    /* ---------------------------------------------------------
       4. HANDLE DELETED IMAGES
    --------------------------------------------------------- */
    if (deletedImageIds) {
      let idsToDelete = [];
      try {
        idsToDelete = typeof deletedImageIds === 'string' 
          ? JSON.parse(deletedImageIds) 
          : deletedImageIds;
      } catch (e) {
        console.error("Failed to parse deletedImageIds");
      }

      if (Array.isArray(idsToDelete) && idsToDelete.length > 0) {
        // Filter the in-memory array
        event.images = event.images.filter(img => !idsToDelete.includes(img._id.toString()));
      }
    }

    /* ---------------------------------------------------------
       5. HANDLE NEW GALLERY IMAGES
    --------------------------------------------------------- */
    let newPopularIndexesArray = [];
    if (popularIndices) {
        if (Array.isArray(popularIndices)) {
            newPopularIndexesArray = popularIndices.map(num => parseInt(num));
        } else if (typeof popularIndices === 'string') {
            const cleanedString = popularIndices.replace(/[\[\]]/g, '');
            newPopularIndexesArray = cleanedString.split(',').map(num => parseInt(num.trim()));
        }
    }

    if (files.galleryImages && files.galleryImages.length > 0) {
      const uploadPromises = files.galleryImages.map(async (file, index) => {
        const upload = await uploadOnCloudinary(file.path);
        const isThisImagePopular = newPopularIndexesArray.includes(index);

        return upload ? { 
          url: upload.secure_url, 
          publicId: upload.public_id,
          isPopular: isThisImagePopular 
        } : null;
      });
      
      const newImages = (await Promise.all(uploadPromises)).filter(Boolean);
      // Push to existing array
      event.images.push(...newImages);
    }

    // --- SAVE EVERYTHING AT ONCE ---
    await event.save({ session });
    
    await session.commitTransaction();
    return res.status(200).json({ success: true, message: "Event updated", data: event });

  } catch (err) {
    if (session.inTransaction()) await session.abortTransaction();
    console.error("Update Error:", err);
    return res.status(500).json({ success: false, message: err.message });
  } finally {
    session.endSession();
  }
};
/* ================= GET ALL ================= */
export const getAllGalleryEvents = async (req, res) => {
  try {
    const { category, limit = 10, page = 1 } = req.query;
    
    const query = {};
    if (category && category !== 'All') {
      query.category = category;
    }

    const events = await GalleryEvent.find(query)
      .select('title date category slug coverImage location description images ') // Exclude heavy images array
      .sort({ date: -1 }) // Sort by newest
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await GalleryEvent.countDocuments(query);

    return res.status(200).json({
      success: true,
      data: events,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= GET BY SLUG (or ID) ================= */
export const getGalleryEventBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    // Try finding by slug first
    let event = await GalleryEvent.findOne({ slug });
    
    // If not found, and slug looks like an ObjectId, try ID (fallback)
    if (!event && mongoose.Types.ObjectId.isValid(slug)) {
      event = await GalleryEvent.findById(slug);
    }

    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    return res.status(200).json({ success: true, data: event });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= DELETE ================= */
export const deleteGalleryEvent = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const { id } = req.params;

    const event = await GalleryEvent.findById(id).session(session);
    if (!event) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Event not found" });
    }

    // Optional: Delete images from Cloudinary logic here if needed

    await GalleryEvent.findByIdAndDelete(id).session(session);

    await session.commitTransaction();
    return res.status(200).json({ success: true, message: "Event deleted successfully" });

  } catch (err) {
    if (session.inTransaction()) await session.abortTransaction();
    return res.status(500).json({ success: false, message: err.message });
  } finally {
    session.endSession();
  }
};