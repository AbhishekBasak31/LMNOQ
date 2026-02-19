import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compression from "compression";
import os from "os";

import DB_Connection from "./src/DB/DB.js";

// --- Import All Routers ---
import UserRouter from "./src/Routers/Global/User.js";
import SocialRouter from "./src/Routers/Global/Social.js";
import FooterRouter from "./src/Routers/Global/Footer.js";
import ContactRouter from "./src/Routers/Global/Contact.js";
import EnquiryRouter from "./src/Routers/Global/Enquiry.js";
import ContactDetailsRouter from "./src/Routers/Global/ContactDetails.js";

import HomeBannerRouter from "./src/Routers/Homepage/Banner.js";
import HomeAboutRouter from "./src/Routers/Homepage/About.js";
import QuickLinkRouter from "./src/Routers/Global/QuickLinks.js";

import EventRouter from "./src/Routers/Global/Event.js";
import EventSecRouter from "./src/Routers/Global/EventSec.js";

import FeatureSecRouter from "./src/Routers/Homepage/Features.js";

import ReviewSectionRouter from "./src/Routers/Homepage/ReviewSec.js";
import WhyChooseUsRouter from "./src/Routers/Homepage/WhyChooseUs.js";
import ServiceSecRouter from "./src/Routers/Homepage/Service.js";
import PackageRouter from "./src/Routers/Global/Package.js";
import HomeDashRouter from "./src/Routers/Homepage/Dashboards.js";
import FocusSecRouter from "./src/Routers/Homepage/Focus.js";
import StatisticSecRouter from "./src/Routers/Homepage/Statistic.js";
import HowitWorkSecRouter from "./src/Routers/Homepage/Howitwork.js";
import ToolsSectionRouter from "./src/Routers/Homepage/Tools.js";
import ClientSecRouter from "./src/Routers/Global/Clients.js";
import IndustrialSecRouter from "./src/Routers/Global/Industrial.js";
import FaqSecRouter from "./src/Routers/Global/Faq.js";
import BlogSecRouter from "./src/Routers/Global/Blogs.js";


import RefundPolicyRouter from "./src/Routers/Refund/Refund.js";
import TermsRouter from "./src/Routers/TermsandCondition/TermsandCondition.js";
import MetaRouter from "./src/Routers/Global/meta.routes.js";
import AffiliateRouter from "./src/Routers/Affiliationpage/Affiliationpage.js";
import HomeExclusiveFeatureRouter from "./src/Routers/Homepage/Exclusive.js";
import GallerySecRouter from "./src/Routers/Homepage/GallerySec.js";
import GalleryEventRouter from "./src/Routers/Global/Gallery.js";
import OwnersTalkSecRouter from "./src/Routers/Homepage/OwnersTalks.js";
import NewsSecRouter from "./src/Routers/Homepage/NewsSec.js";
import NewsRouter from "./src/Routers/Global/News.js";
import AboutPageRouter from "./src/Routers/AboutPage/AboutPage.js";
import MenuPageRouter from "./src/Routers/MenuPage/MenuPage.js";





const app = express();
const PORT = process.env.PORT || 7000;


/* -------------------------------------------------------
   GET LOCAL NETWORK IP (for dev logging only)
------------------------------------------------------- */
function getLocalIP() {
  try {
    const nets = os.networkInterfaces();
    for (const name in nets) {
      for (const iface of nets[name]) {
        if ((iface.family === "IPv4" || iface.family === 4) && !iface.internal) {
          return iface.address;
        }
      }
    }
  } catch (err) {
    console.warn("Local IP error:", err);
  }
  return "127.0.0.1";
}

const localIP = getLocalIP();

/* -------------------------------------------------------
   SECURITY & PERFORMANCE MIDDLEWARE
------------------------------------------------------- */
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(cookieParser());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

/* -------------------------------------------------------
   CORS CONFIG (FINAL & CORRECT)
------------------------------------------------------- */

// IMPORTANT:
// Frontend runs on https://fingertip.co.in/cdautomation
// Browser Origin = https://fingertip.co.in (NO PATH)

const allowedOrigins = new Set([
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:8080",
  "http://localhost:8086",
  `http://${localIP}:5173`,
  `http://${localIP}:5174`,
  `http://${localIP}:8080`,
  `http://${localIP}:8086`,
  "https://fingertip.co.in",
  "https://xoloerp.com" // ✅ PRODUCTION ORIGIN
]);

// Optional env-based origin (safe)
if (process.env.FRONTEND_URL) {
  try {
    const url = new URL(process.env.FRONTEND_URL);
    allowedOrigins.add(url.origin);
  } catch {
    allowedOrigins.add(process.env.FRONTEND_URL);
  }
}

console.log("🌐 Allowed Origins:", [...allowedOrigins]);

app.use(
  cors({
    origin: (origin, callback) => {
      // allow Postman / curl / server-to-server
      if (!origin) return callback(null, true);

      if (allowedOrigins.has(origin)) {
        return callback(null, true);
      }

      console.warn("❌ Blocked CORS Origin:", origin);
      return callback(new Error("CORS: Origin not allowed"));
    },
    credentials: true,
  })
);

/* -------------------------------------------------------
   REQUEST DEBUG (SAFE)
------------------------------------------------------- */
app.use((req, res, next) => {
  console.log("→", req.method, req.originalUrl);
  console.log("  Origin:", req.headers.origin || "(none)");
  next();
});

/* -------------------------------------------------------
   HEALTH CHECK
------------------------------------------------------- */
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "production",
  });
});

/* -------------------------------------------------------
   API ROUTES
------------------------------------------------------- */
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/contact", ContactRouter);
app.use("/api/v1/enquiry", EnquiryRouter);
app.use("/api/v1/footer", FooterRouter);
app.use("/api/v1/social", SocialRouter);
app.use("/api/v1/contactdetail", ContactDetailsRouter);
app.use("/api/v1/reviewsec", ReviewSectionRouter);
app.use("/api/v1/package",PackageRouter);
app.use("/api/v1/quicklink", QuickLinkRouter);
app.use("/api/v1/meta", MetaRouter);
app.use("/api/v1/event", EventRouter);
app.use("/api/v1/gallery/event", GalleryEventRouter);
app.use("/api/v1/news", NewsRouter);


// Home page
app.use("/api/v1/home/banner", HomeBannerRouter);
app.use("/api/v1/home/about", HomeAboutRouter);
app.use("/api/v1/home/featuresec", FeatureSecRouter);
app.use("/api/v1/home/wcu", WhyChooseUsRouter);
app.use("/api/v1/home/exclusive", HomeExclusiveFeatureRouter);
app.use("/api/v1/home/gallerySec", GallerySecRouter);
app.use("/api/v1/home/eventsec", EventSecRouter);
app.use("/api/v1/home/ownerstalk", OwnersTalkSecRouter);
app.use("/api/v1/home/newssec", NewsSecRouter);

app.use("/api/v1/home/servicesec",ServiceSecRouter);
app.use("/api/v1/home/dashboard",HomeDashRouter);
app.use("/api/v1/home/focus",FocusSecRouter);
app.use("/api/v1/home/statistic", StatisticSecRouter);
app.use("/api/v1/home/workflow", HowitWorkSecRouter);
app.use("/api/v1/tools", ToolsSectionRouter);
app.use("/api/v1/clients", ClientSecRouter);
app.use("/api/v1/industrial", IndustrialSecRouter);
app.use("/api/v1/faq", FaqSecRouter);
app.use("/api/v1/blogs", BlogSecRouter);

// About page
app.use("/api/v1/aboutpage", AboutPageRouter);

app.use("/api/v1/refundpolicy", RefundPolicyRouter);
app.use("/api/v1/terms", TermsRouter);
app.use("/api/v1/menupage", MenuPageRouter);

//Feature page
// app.use("/api/v1/featurepage", AboutPageRouter);

app.use("/api/v1/affiliate", AffiliateRouter);


//





/* -------------------------------------------------------
   DATABASE & SERVER START
------------------------------------------------------- */
DB_Connection(process.env.DB_URI, process.env.DB_NAME)
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌐 Production API ready`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  });
