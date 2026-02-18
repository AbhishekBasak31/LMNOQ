import express from "express";
import { 
  getEventSec, 
  createEventSec, 
  updateEventSec, 
  deleteEventSec 
} from "../../Controllers/Global/EventSec.js";
import { authenticate } from "../../Middleware/AuthMiddlewares.js";

const EventSecRouter = express.Router();

EventSecRouter.get("/", getEventSec);
EventSecRouter.post("/", authenticate, createEventSec);
EventSecRouter.patch("/", authenticate, updateEventSec);
EventSecRouter.delete("/", authenticate, deleteEventSec);

export default EventSecRouter;
