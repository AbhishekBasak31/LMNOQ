import { EventSec } from "../../Models/Global/EventSec.js"; // Adjust path if model is located elsewhere

/**
 * GET EVENT SECTION
 */
export const getEventSec = async (req, res) => {
  try {
    const data = await EventSec.findOne();
    return res.status(200).json({ success: true, data: data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * CREATE EVENT SECTION
 */
export const createEventSec = async (req, res) => {
  try {
    const existing = await EventSec.findOne();
    if (existing) {
      return res.status(400).json({ success: false, message: "Section already exists. Use Update." });
    }

    const { Htext } = req.body;

    if (!Htext) {
      return res.status(400).json({ success: false, message: "Htext is required." });
    }

    const newSec = new EventSec({ Htext });
    await newSec.save();

    return res.status(201).json({ success: true, message: "Created successfully.", data: newSec });
  } catch (err) {
    console.error("createEventSec error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * UPDATE EVENT SECTION
 */
export const updateEventSec = async (req, res) => {
  try {
    const existing = await EventSec.findOne();
    if (!existing) {
      return res.status(404).json({ success: false, message: "Section not found." });
    }

    const { Htext } = req.body;

    if (Htext) existing.Htext = Htext;

    await existing.save();

    return res.status(200).json({ success: true, message: "Updated successfully.", data: existing });
  } catch (err) {
    console.error("updateEventSec error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * DELETE EVENT SECTION
 */
export const deleteEventSec = async (req, res) => {
  try {
    const existing = await EventSec.findOne();
    if (!existing) {
      return res.status(404).json({ success: false, message: "Section not found." });
    }

    await EventSec.findByIdAndDelete(existing._id);
    
    return res.status(200).json({ success: true, message: "Deleted successfully." });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
