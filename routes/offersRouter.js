import { Router } from "express";
import {
  createOffer,
  getOffersSentByUser,
  getOffersReceivedByUser,
} from "../controllers/offers.js";
/* import validateJOI from "../middlewares/validateJOI.js"; */
import verifyToken from "../middlewares/verifyToken.js";
import { offer } from "../joi/schemas.js";

const offersRouter = Router();

offersRouter
  .route("/")
  .post(verifyToken, /* validateJOI(offer), */ createOffer);

offersRouter
  .route("/sent")
  .get(verifyToken, /* validateJOI(offer), */ getOffersSentByUser);

offersRouter
  .route("/received")
  .get(verifyToken, /* validateJOI(offer), */ getOffersReceivedByUser);

export default offersRouter;
