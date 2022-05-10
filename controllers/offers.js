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

export const deleteOffer = asyncHandler(async (req, res) => {
  const {
    params: { id },
    /* user: { initiator }, */
  } = req;
  const found = await Offer.findById(id);
  /*   if (!found)
    throw new ErrorResponse(`Offer with id of ${id} doesn't exist`, 404);
  if (found.author.toString() !== userId.toString())
    throw new ErrorResponse(`Only the owner of the post can delete`, 403); */
  await Post.deleteOne({ _id: id });
  res.json({ success: `Offer with id of ${id} was deleted` });
});

export const getOffer = asyncHandler(async (req, res, next) => {
  const {
    params: { id },
    /* user: { initiator }, */
  } = req;
  const found = await Offer.findById(id);

  res.json(found);
});
