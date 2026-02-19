import { AboutPage } from "../../Models/AboutPage/AboutPage.js";
import uploadOnCloudinary from "../../Utils/Clodinary.js";

// Helper to find file in req.files array (since we use upload.any())
const getFileUrl = async (files, fieldname) => {
  const file = files?.find((f) => f.fieldname === fieldname);
  if (file) {
    const upload = await uploadOnCloudinary(file.path);
    return upload?.secure_url || null;
  }
  return null;
};

/* ================= GET ================= */
export const getAboutPage = async (req, res) => {
  try {
    const data = await AboutPage.findOne();
    return res.status(200).json({ success: true, data: data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= CREATE ================= */
export const createAboutPage = async (req, res) => {
  try {
    const existing = await AboutPage.findOne();
    if (existing) {
      return res.status(400).json({ success: false, message: "About Page already exists. Use Update." });
    }

    const body = req.body;
    const files = req.files || [];

    // 1. Handle Top-Level Images
    const imageFields = [
      "aboutImg1", "aboutImg2", "aboutImg3",
      "ourMissionCard1Icon", "ourMissionCard2Icon", "ourMissionCard3Icon"
    ];
    
    const imageUrls = {};
    for (const field of imageFields) {
      const url = await getFileUrl(files, field);
      if (url) imageUrls[field] = url;
      else return res.status(400).json({ message: `${field} is required.` });
    }

    // 2. Handle Team Members
    let team = [];
    if (body.Ourteam) {
      try {
        team = JSON.parse(body.Ourteam);
      } catch (e) {
        return res.status(400).json({ message: "Invalid Ourteam JSON format" });
      }
    }

    // Upload Team Images (team_img_0, team_img_1...)
    for (let i = 0; i < team.length; i++) {
      const url = await getFileUrl(files, `team_img_${i}`);
      if (url) {
        team[i].img = url;
      } else if (!team[i].img) {
        return res.status(400).json({ message: `Image required for team member ${i + 1}` });
      }
    }

    const newPage = new AboutPage({
      ...body,
      ...imageUrls,
      Ourteam: team
    });

    await newPage.save();
    return res.status(201).json({ success: true, message: "Created Successfully", data: newPage });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= UPDATE ================= */
export const updateAboutPage = async (req, res) => {
  try {
    const existing = await AboutPage.findOne();
    if (!existing) {
      return res.status(404).json({ success: false, message: "About Page not found." });
    }

    const body = req.body;
    const files = req.files || [];
    const updates = { ...body };

    // 1. Handle Top-Level Images
    const imageFields = [
      "aboutImg1", "aboutImg2", "aboutImg3",
      "ourMissionCard1Icon", "ourMissionCard2Icon", "ourMissionCard3Icon"
    ];

    for (const field of imageFields) {
      const url = await getFileUrl(files, field);
      if (url) updates[field] = url;
    }

    // 2. Handle Team Members
    if (body.Ourteam) {
      let team = [];
      try {
        team = JSON.parse(body.Ourteam);
      } catch (e) {
        return res.status(400).json({ message: "Invalid Ourteam JSON format" });
      }

      for (let i = 0; i < team.length; i++) {
        const url = await getFileUrl(files, `team_img_${i}`);
        if (url) {
          team[i].img = url;
        }
        // If no new URL, keep existing (handled by frontend sending existing URL in JSON)
      }
      updates.Ourteam = team;
    }

    const updatedPage = await AboutPage.findByIdAndUpdate(
      existing._id,
      { $set: updates },
      { new: true }
    );

    return res.status(200).json({ success: true, message: "Updated Successfully", data: updatedPage });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= DELETE ================= */
export const deleteAboutPage = async (req, res) => {
  try {
    await AboutPage.findOneAndDelete({});
    return res.status(200).json({ success: true, message: "Deleted Successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
