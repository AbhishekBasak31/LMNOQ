import { PrivacyPolicy } from "../../Models/Refund/Refund.js";
import uploadOnCloudinary from "../../Utils/Clodinary.js";

// Helper to find file in req.files array
const getFileUrl = async (files, fieldname) => {
  const file = files?.find((f) => f.fieldname === fieldname);
  if (file) {
    const upload = await uploadOnCloudinary(file.path);
    return upload?.secure_url || null;
  }
  return null;
};

/* ================= GET ================= */
export const getPrivacyPolicy = async (req, res) => {
  try {
    const data = await PrivacyPolicy.findOne();
    return res.status(200).json({ success: true, data: data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= CREATE ================= */
export const createPrivacyPolicy = async (req, res) => {
  try {
    const existing = await PrivacyPolicy.findOne();
    if (existing) {
      return res.status(400).json({ success: false, message: "Policy already exists. Use Update." });
    }

    const body = req.body;
    const files = req.files || [];

    let points = [];
    if (body.points) {
      try {
        points = JSON.parse(body.points);
      } catch (e) {
        return res.status(400).json({ message: "Invalid points JSON format" });
      }
    }

    // Handle Point Icons (point_icon_0, point_icon_1...)
    for (let i = 0; i < points.length; i++) {
      const url = await getFileUrl(files, `point_icon_${i}`);
      if (url) {
        points[i].icon = url;
      } else if (!points[i].icon) {
        return res.status(400).json({ message: `Icon required for point ${i + 1}` });
      }
    }

    const newPolicy = new PrivacyPolicy({
      ...body,
      points
    });

    await newPolicy.save();
    return res.status(201).json({ success: true, message: "Created Successfully", data: newPolicy });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= UPDATE ================= */
export const updatePrivacyPolicy = async (req, res) => {
  try {
    const existing = await PrivacyPolicy.findOne();
    if (!existing) {
      return res.status(404).json({ success: false, message: "Policy not found." });
    }

    const body = req.body;
    const files = req.files || [];
    
    let points = [];
    if (body.points) {
      try {
        points = JSON.parse(body.points);
      } catch (e) {
        return res.status(400).json({ message: "Invalid points JSON format" });
      }
    }

    // Handle Point Icons
    for (let i = 0; i < points.length; i++) {
      const url = await getFileUrl(files, `point_icon_${i}`);
      if (url) {
        points[i].icon = url;
      }
      // If no new URL, keep existing (handled by frontend sending existing URL in JSON)
    }

    const updatedPolicy = await PrivacyPolicy.findByIdAndUpdate(
      existing._id,
      { 
        $set: {
          mainTag: body.mainTag,
          mainHtext: body.mainHtext,
          mainDtext: body.mainDtext,
          shortDtext: body.shortDtext,
          points: points,
          CTAHtext: body.CTAHtext,
          CTADtext: body.CTADtext,
          CTALine1: body.CTALine1,
          CTALine2: body.CTALine2,
          CTALine3: body.CTALine3 // Fixed: Was CTALine3s
        } 
      },
      { new: true }
    );

    return res.status(200).json({ success: true, message: "Updated Successfully", data: updatedPolicy });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= DELETE ================= */
export const deletePrivacyPolicy = async (req, res) => {
  try {
    await PrivacyPolicy.findOneAndDelete({});
    return res.status(200).json({ success: true, message: "Deleted Successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};