import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import Offer from "../models/Offer.js";

export const createOffer = asyncHandler(async (req, res, next) => {
  const { user, body } = req;
  const newOffer = await Offer.create({ ...body, initiator: user._id });
  res.json(newOffer);
});

export const getOffersSentByUser = asyncHandler(async (req, res, next) => {
  const { user } = req;
  const offersByUser = await Offer.find({ initiator: user._id }).populate(
    "offeredProducts"
  );
  res.json(offersByUser);
});

export const getOffersReceivedByUser = asyncHandler(async (req, res, next) => {
  const { user } = req;
  const offersByUser = await Offer.find({ owner: user._id });
  res.json(offersByUser);
});
