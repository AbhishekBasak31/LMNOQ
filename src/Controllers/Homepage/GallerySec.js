import { GallerySec } from "../../Models/HomePage/GallerySec.js";

/* ================= GET ================= */
export const getGallerySec = async (req, res) => {
  try {
    const data = await GallerySec.findOne();
    return res.status(200).json({ success: true, data: data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= CREATE ================= */
export const createGallerySec = async (req, res) => {
  try {
    const existing = await GallerySec.findOne();
    if (existing) {
      return res.status(400).json({ success: false, message: "Section exists. Use Update." });
    }

    const { Htext } = req.body;

    if (!Htext) {
      return res.status(400).json({ success: false, message: "Htext is required." });
    }

    const newSection = new GallerySec({
      Htext
    });

    await newSection.save();
    return res.status(201).json({ success: true, message: "Created Successfully", data: newSection });

  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= UPDATE ================= */
export const updateGallerySec = async (req, res) => {
  try {
    const { Htext } = req.body;

    const updatedSection = await GallerySec.findOneAndUpdate(
      {},
      { $set: { Htext } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res.status(200).json({ success: true, message: "Updated Successfully", data: updatedSection });

  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= DELETE ================= */
export const deleteGallerySec = async (req, res) => {
  try {
    await GallerySec.findOneAndDelete({});
    return res.status(200).json({ success: true, message: "Deleted Successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
