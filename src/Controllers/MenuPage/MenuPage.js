
import { MenuPage } from "../../Models/Menu/Menu.js";
import uploadOnCloudinary from "../../Utils/Clodinary.js";

/* ================= GET ================= */
export const getMenuPage = async (req, res) => {
  try {
    const data = await MenuPage.findOne();
    return res.status(200).json({ success: true, data: data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= CREATE ================= */
export const createMenuPage = async (req, res) => {
  try {
    const existing = await MenuPage.findOne();
    if (existing) {
      return res.status(400).json({ success: false, message: "Menu Page already exists. Use Update." });
    }

    const { mainTag, mainHtext, mainDtext, CtaHtext, CtaDtext } = req.body;
    let menuList = [];

    // 1. Parse Menu JSON
    if (req.body.Menu) {
      try {
        menuList = JSON.parse(req.body.Menu);
      } catch (e) {
        return res.status(400).json({ message: "Invalid Menu data format" });
      }
    }

    // 2. Handle Dynamic Image Uploads
    // Structure: menu_img_{menuIndex}_{imgIndex}
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const match = file.fieldname.match(/^menu_img_(\d+)_(\d+)$/);
        if (match) {
          const menuIndex = parseInt(match[1]);
          const imgIndex = parseInt(match[2]);

          if (menuList[menuIndex]) {
            // Ensure the img array exists and has space
            if (!menuList[menuIndex].img) menuList[menuIndex].img = [];
            
            const upload = await uploadOnCloudinary(file.path);
            if (upload) {
              // We place it at the specific index or push if undefined
              menuList[menuIndex].img[imgIndex] = upload.secure_url;
            }
          }
        }
      }
    }
    
    // Clean up any empty slots in img arrays if necessary (though usually handled by frontend logic)
    menuList.forEach(m => {
        if(m.img) m.img = m.img.filter(url => url);
    });

    const newPage = new MenuPage({
      mainTag,
      mainHtext,
      mainDtext,
      Menu: menuList,
      CtaHtext,
      CtaDtext
    });

    await newPage.save();
    return res.status(201).json({ success: true, message: "Created Successfully", data: newPage });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= UPDATE ================= */
export const updateMenuPage = async (req, res) => {
  try {
    const existing = await MenuPage.findOne();
    if (!existing) {
      return res.status(404).json({ success: false, message: "Menu Page not found." });
    }

    const { mainTag, mainHtext, mainDtext, CtaHtext, CtaDtext } = req.body;
    let menuList = [];

    if (req.body.Menu) {
      try {
        menuList = JSON.parse(req.body.Menu);
      } catch (e) {
        return res.status(400).json({ message: "Invalid Menu data format" });
      }
    }

    // Handle Dynamic Image Uploads
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const match = file.fieldname.match(/^menu_img_(\d+)_(\d+)$/);
        if (match) {
          const menuIndex = parseInt(match[1]);
          const imgIndex = parseInt(match[2]);

          if (menuList[menuIndex]) {
            if (!menuList[menuIndex].img) menuList[menuIndex].img = [];
            
            const upload = await uploadOnCloudinary(file.path);
            if (upload) {
              menuList[menuIndex].img[imgIndex] = upload.secure_url;
            }
          }
        }
      }
    }

    // Filter out nulls/undefined from img arrays just in case
    menuList.forEach(m => {
        if(m.img) m.img = m.img.filter(url => url);
    });

    const updatedPage = await MenuPage.findByIdAndUpdate(
      existing._id,
      {
        $set: {
          mainTag,
          mainHtext,
          mainDtext,
          Menu: menuList,
          CtaHtext,
          CtaDtext
        }
      },
      { new: true }
    );

    return res.status(200).json({ success: true, message: "Updated Successfully", data: updatedPage });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= DELETE ================= */
export const deleteMenuPage = async (req, res) => {
  try {
    await MenuPage.findOneAndDelete({});
    return res.status(200).json({ success: true, message: "Deleted Successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
