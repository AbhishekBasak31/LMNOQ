import { OwnersTalkSec } from "../../Models/HomePage/OwnersTalk.js";
import uploadOnCloudinary from "../../Utils/Clodinary.js";

/* ================= GET ================= */
export const getOwnersTalkSec = async (req, res) => {
  try {
    const data = await OwnersTalkSec.findOne();
    return res.status(200).json({ success: true, data: data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= CREATE ================= */
export const createOwnersTalkSec = async (req, res) => {
  try {
    const existing = await OwnersTalkSec.findOne();
    if (existing) {
      return res.status(400).json({ success: false, message: "Section exists. Use Update." });
    }

    const { Htext, Dtext, Ownersname, OwnersTitle, ownersThoughts } = req.body;

    // Validation
    if (!Htext || !Dtext || !Ownersname || !OwnersTitle || !ownersThoughts) {
      return res.status(400).json({ message: "All text fields are required." });
    }

    let ownerImgUrl = "";
    if (req.file) {
      const upload = await uploadOnCloudinary(req.file.path);
      if (upload) ownerImgUrl = upload.secure_url;
    } else {
      return res.status(400).json({ message: "Owner Image is required." });
    }

    const newSec = new OwnersTalkSec({
      Htext,
      Dtext,
      Ownersname,
      OwnersTitle,
      ownersThoughts,
      OwnerImg: ownerImgUrl
    });

    await newSec.save();
    return res.status(201).json({ success: true, message: "Created Successfully", data: newSec });

  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= UPDATE ================= */
export const updateOwnersTalkSec = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (req.file) {
      const upload = await uploadOnCloudinary(req.file.path);
      if (upload) updates.OwnerImg = upload.secure_url;
    }

    const updatedSec = await OwnersTalkSec.findOneAndUpdate(
      {},
      { $set: updates },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res.status(200).json({ success: true, message: "Updated Successfully", data: updatedSec });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= DELETE ================= */
export const deleteOwnersTalkSec = async (req, res) => {
  try {
    await OwnersTalkSec.findOneAndDelete({});
    return res.status(200).json({ success: true, message: "Deleted Successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
