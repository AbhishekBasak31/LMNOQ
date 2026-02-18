import mongoose from "mongoose";
import { HomeBanner } from "../../Models/HomePage/Banner.js"; 
import uploadOnCloudinary from "../../Utils/Clodinary.js";

const norm = (v) => (typeof v === "string" ? v.trim() : v);

/**
 * HELPER: Upload file if exists
 */
const uploadFile = async (files, key) => {
  if (files && files[key] && files[key][0]) {
    // Use resource_type: "video" for video files
    const upload = await uploadOnCloudinary(files[key][0].path, "video");
    return upload?.secure_url || upload?.url;
  }
  return null;
};

/**
 * CREATE HOME BANNER
 */
export const createHomeBanner = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const existing = await HomeBanner.findOne().session(session);
    if (existing) {
      await session.abortTransaction();
      return res.status(400).json({ success: false, message: "Banner config exists. Use Update." });
    }

    const body = req.body;
    const files = req.files || {};

    // Build Document Data based on new Schema
    const textFields = [
      "Htext1", "Dtext1",
      "Htext2", "Dtext2",
      "Htext3", "Dtext3"
    ];
    const videoFields = ["Video1", "Video2", "Video3"];

    // Validation
    const missing = [];
    textFields.forEach(f => { if (!norm(body[f])) missing.push(f); });
    videoFields.forEach(f => { if (!files[f]) missing.push(f); });

    if (missing.length > 0) {
      await session.abortTransaction();
      return res.status(400).json({ success: false, message: `Missing fields: ${missing.join(", ")}` });
    }

    // Upload Videos
    const uploads = {};
    for (const vidKey of videoFields) {
      const url = await uploadFile(files, vidKey);
      if (!url) {
        await session.abortTransaction();
        return res.status(500).json({ success: false, message: `Failed to upload ${vidKey}` });
      }
      uploads[vidKey] = url;
    }

    const docData = { ...uploads };
    textFields.forEach(f => { docData[f] = norm(body[f]); });

    const banner = new HomeBanner(docData);
    await banner.save({ session });
    await session.commitTransaction();

    return res.status(201).json({ success: true, message: "Created successfully.", data: banner });

  } catch (err) {
    if (session.inTransaction()) await session.abortTransaction();
    console.error("createHomeBanner error:", err);
    return res.status(500).json({ success: false, message: err.message });
  } finally {
    session.endSession();
  }
};

/**
 * GET HOME BANNER
 */
export const getHomeBanner = async (req, res) => {
  try {
    const data = await HomeBanner.findOne();
    return res.status(200).json({ success: true, data: data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * UPDATE HOME BANNER
 */
export const updateHomeBanner = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const latest = await HomeBanner.findOne().session(session);
    if (!latest) {
      await session.abortTransaction();
      return res.status(404).json({ success: false, message: "No HomeBanner found." });
    }

    const updates = {};
    const body = req.body;
    const files = req.files || {};

    // List of all fields in the new schema
    const textFields = [
        "Htext1", "Dtext1",
        "Htext2", "Dtext2",
        "Htext3", "Dtext3"
    ];
    const videoFields = ["Video1", "Video2", "Video3"];

    textFields.forEach(field => {
        if (body[field] !== undefined) {
            updates[field] = norm(body[field]);
        }
    });

    for (const field of videoFields) {
        const url = await uploadFile(files, field);
        if (url) updates[field] = url;
    }

    if (Object.keys(updates).length === 0) {
      await session.abortTransaction();
      return res.status(200).json({ success: true, message: "No changes detected." });
    }

    const updated = await HomeBanner.findByIdAndUpdate(latest._id, { $set: updates }, { new: true, session });
    await session.commitTransaction();

    return res.status(200).json({ success: true, message: "Updated successfully.", data: updated });

  } catch (err) {
    if (session.inTransaction()) await session.abortTransaction();
    console.error("updateHomeBanner error:", err);
    return res.status(500).json({ success: false, message: err.message });
  } finally {
    session.endSession();
  }
};

/**
 * DELETE HOME BANNER
 */
export const deleteHomeBanner = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const latest = await HomeBanner.findOne().session(session);
    
    if (!latest) {
      await session.abortTransaction();
      return res.status(404).json({ success: false, message: "Not found." });
    }

    await HomeBanner.findByIdAndDelete(latest._id, { session });
    await session.commitTransaction();
    
    return res.status(200).json({ success: true, message: "Deleted successfully." });
  } catch (err) {
    if (session.inTransaction()) await session.abortTransaction();
    return res.status(500).json({ success: false, message: err.message });
  } finally {
    session.endSession();
  }
};