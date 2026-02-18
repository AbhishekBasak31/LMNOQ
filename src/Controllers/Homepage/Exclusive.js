import mongoose from "mongoose";
import { HomeExclusiveFeature } from "../../Models/HomePage/Exclusive.js"; // Adjust path if needed
import uploadOnCloudinary from "../../Utils/Clodinary.js";

const norm = (v) => (typeof v === "string" ? v.trim() : v);

/**
 * HELPER: Upload file if exists in req.files array (for upload.any())
 */
const uploadFile = async (files, fieldname) => {
  const file = files?.find((f) => f.fieldname === fieldname);
  if (file) {
    const upload = await uploadOnCloudinary(file.path, "image");
    return upload?.secure_url || upload?.url;
  }
  return null;
};

/**
 * CREATE HOME EXCLUSIVE FEATURE
 */
export const createHomeExclusiveFeature = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const existing = await HomeExclusiveFeature.findOne().session(session);
    if (existing) {
      await session.abortTransaction();
      return res.status(400).json({ success: false, message: "Feature section already exists. Use Update." });
    }

    const body = req.body;
    const files = req.files || [];

    // 1. Validate Main Fields
    if (!body.Htext) {
      await session.abortTransaction();
      return res.status(400).json({ success: false, message: "Main Header (Htext) is required." });
    }

    // 2. Process Exclusive Items
    // body.exclusive should be an array of objects if sent correctly via FormData (exclusive[0][Htext]...)
    let exclusiveItems = body.exclusive || [];
    
    // If only one item is sent, body-parser might not treat it as an array depending on config, 
    // but usually exclusive[0] notation forces an array. We ensure it is iterable.
    if (!Array.isArray(exclusiveItems)) {
        // Fallback if structure is weird, though express usually handles [i] syntax well
        exclusiveItems = []; 
    }

    const processedExclusive = [];

    for (let i = 0; i < exclusiveItems.length; i++) {
      const item = exclusiveItems[i];
      const fieldName = `exclusive[${i}][Img]`;
      
      // Upload new image
      const url = await uploadFile(files, fieldName);
      
      if (!url && !item.Img) {
        // If no file uploaded and no existing Img string provided (which shouldn't happen in create, but for safety)
        await session.abortTransaction();
        return res.status(400).json({ success: false, message: `Image is required for item #${i + 1}` });
      }

      processedExclusive.push({
        Htext: norm(item.Htext),
        Dtext: norm(item.Dtext),
        Img: url || item.Img, // In create, item.Img might be empty unless provided as string
      });
    }

    const docData = {
      Htext: norm(body.Htext),
      exclusive: processedExclusive,
    };

    const feature = new HomeExclusiveFeature(docData);
    await feature.save({ session });
    await session.commitTransaction();

    return res.status(201).json({ success: true, message: "Created successfully.", data: feature });

  } catch (err) {
    if (session.inTransaction()) await session.abortTransaction();
    console.error("createHomeExclusiveFeature error:", err);
    return res.status(500).json({ success: false, message: err.message });
  } finally {
    session.endSession();
  }
};

/**
 * GET HOME EXCLUSIVE FEATURE
 */
export const getHomeExclusiveFeature = async (req, res) => {
  try {
    const data = await HomeExclusiveFeature.findOne();
    return res.status(200).json({ success: true, data: data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * UPDATE HOME EXCLUSIVE FEATURE
 */
export const updateHomeExclusiveFeature = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const latest = await HomeExclusiveFeature.findOne().session(session);
    if (!latest) {
      await session.abortTransaction();
      return res.status(404).json({ success: false, message: "No Feature section found." });
    }

    const body = req.body;
    const files = req.files || [];

    // 1. Update Main Fields
    if (body.Htext) latest.Htext = norm(body.Htext);

    // 2. Process Exclusive Items
    // We replace the array with the new list from frontend (which includes edits/additions)
    if (body.exclusive) {
      let exclusiveItems = body.exclusive;
      if (!Array.isArray(exclusiveItems)) exclusiveItems = [];

      const processedExclusive = [];

      for (let i = 0; i < exclusiveItems.length; i++) {
        const item = exclusiveItems[i];
        const fieldName = `exclusive[${i}][Img]`;

        // Check for new file upload
        const newUrl = await uploadFile(files, fieldName);

        processedExclusive.push({
          Htext: norm(item.Htext),
          Dtext: norm(item.Dtext),
          // Use new URL if uploaded, otherwise keep the string sent from frontend (existing URL)
          Img: newUrl || item.Img, 
        });
      }
      
      latest.exclusive = processedExclusive;
    }

    await latest.save({ session });
    await session.commitTransaction();

    return res.status(200).json({ success: true, message: "Updated successfully.", data: latest });

  } catch (err) {
    if (session.inTransaction()) await session.abortTransaction();
    console.error("updateHomeExclusiveFeature error:", err);
    return res.status(500).json({ success: false, message: err.message });
  } finally {
    session.endSession();
  }
};

/**
 * DELETE HOME EXCLUSIVE FEATURE
 */
export const deleteHomeExclusiveFeature = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const latest = await HomeExclusiveFeature.findOne().session(session);
    
    if (!latest) {
      await session.abortTransaction();
      return res.status(404).json({ success: false, message: "Not found." });
    }

    await HomeExclusiveFeature.findByIdAndDelete(latest._id, { session });
    await session.commitTransaction();
    
    return res.status(200).json({ success: true, message: "Deleted successfully." });
  } catch (err) {
    if (session.inTransaction()) await session.abortTransaction();
    return res.status(500).json({ success: false, message: err.message });
  } finally {
    session.endSession();
  }
};
