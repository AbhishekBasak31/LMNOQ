import { WhyChooseUs } from "../../Models/HomePage/WhyChooseUs.js"; 
import uploadOnCloudinary from "../../Utils/Clodinary.js"; 

const norm = (v) => (typeof v === "string" ? v.trim() : v);

/* ================= GET ================= */
export const getWhyChooseUs = async (req, res) => {
  try {
    const data = await WhyChooseUs.findOne();
    return res.status(200).json({ success: true, data: data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= CREATE ================= */
export const createWhyChooseUs = async (req, res) => {
  try {
    const existing = await WhyChooseUs.findOne();
    if (existing) {
      return res.status(400).json({ success: false, message: "Section exists. Use Update." });
    }

    const body = req.body;
    const files = req.files || {};

    // Helper to upload
    const uploadFile = async (key) => {
      if (files[key] && files[key][0]) {
        const result = await uploadOnCloudinary(files[key][0].path);
        return result?.secure_url || "";
      }
      return "";
    };

    // Upload Icons
    const counter1Icon = await uploadFile("counter1Icon");
    const counter2Icon = await uploadFile("counter2Icon");
    const counter3Icon = await uploadFile("counter3Icon");
    const counter4Icon = await uploadFile("counter4Icon");

    // Validation
    if (!counter1Icon || !counter2Icon || !counter3Icon || !counter4Icon) {
        return res.status(400).json({ success: false, message: "All 4 icons are required." });
    }

    const newSection = new WhyChooseUs({
      Htext: norm(body.Htext),
      
      counter1: norm(body.counter1),
      counter1Text: norm(body.counter1Text),
      counter1Icon,

      counter2: norm(body.counter2),
      counter2Text: norm(body.counter2Text),
      counter2Icon,

      counter3: norm(body.counter3),
      counter3Text: norm(body.counter3Text),
      counter3Icon,

      counter4: norm(body.counter4),
      counter4Text: norm(body.counter4Text),
      counter4Icon,
    });

    await newSection.save();
    return res.status(201).json({ success: true, message: "Created Successfully", data: newSection });

  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= UPDATE ================= */
export const updateWhyChooseUs = async (req, res) => {
  try {
    const updates = { ...req.body };
    const files = req.files || {};

    // Helper to process update uploads
    const processUpload = async (fieldName) => {
      if (files[fieldName] && files[fieldName][0]) {
        const upload = await uploadOnCloudinary(files[fieldName][0].path);
        if (upload) updates[fieldName] = upload.secure_url;
      }
    };

    // Process all potential file updates
    await Promise.all([
      processUpload("counter1Icon"),
      processUpload("counter2Icon"),
      processUpload("counter3Icon"),
      processUpload("counter4Icon"),
    ]);

    // Normalize strings
    Object.keys(updates).forEach(k => { if (typeof updates[k] === 'string') updates[k] = norm(updates[k]); });

    const updatedSection = await WhyChooseUs.findOneAndUpdate(
      {}, 
      { $set: updates }, 
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res.status(200).json({ success: true, message: "Updated Successfully", data: updatedSection });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= DELETE ================= */
export const deleteWhyChooseUs = async (req, res) => {
  try {
    await WhyChooseUs.findOneAndDelete({});
    return res.status(200).json({ success: true, message: "Deleted Successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};