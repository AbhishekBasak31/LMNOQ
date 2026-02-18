import { NewsSec } from "../../Models/HomePage/NewSec.js";

/* ================= GET ================= */
export const getNewsSec = async (req, res) => {
  try {
    const data = await NewsSec.findOne();
    return res.status(200).json({ success: true, data: data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= CREATE ================= */
export const createNewsSec = async (req, res) => {
  try {
    const existing = await NewsSec.findOne();
    if (existing) {
      return res.status(400).json({ success: false, message: "Section exists. Use Update." });
    }

    const { Htext } = req.body;

    if (!Htext) {
      return res.status(400).json({ success: false, message: "Htext is required." });
    }

    const newSec = new NewsSec({ Htext });
    await newSec.save();

    return res.status(201).json({ success: true, message: "Created Successfully", data: newSec });

  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= UPDATE ================= */
export const updateNewsSec = async (req, res) => {
  try {
    const { Htext } = req.body;

    const updatedSec = await NewsSec.findOneAndUpdate(
      {},
      { $set: { Htext } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res.status(200).json({ success: true, message: "Updated Successfully", data: updatedSec });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= DELETE ================= */
export const deleteNewsSec = async (req, res) => {
  try {
    await NewsSec.findOneAndDelete({});
    return res.status(200).json({ success: true, message: "Deleted Successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
