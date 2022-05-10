import Joi from "joi";

export const offer = Joi.object({
  product: Joi.any().required(),
  offeredProducts: Joi.array().required(),
  initiator: Joi.any().required(),
  owner: Joi.any().required(),
});

export const message = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
  isListed: Joi.boolean(),
});

export const post = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
  category: Joi.string()
    .valid(
      "Appliances",
      "Automotive",
      "Baby Stuff",
      "Beauty",
      "Books",
      "Photo Stuff",
      "Clothes",
      "Cell Phones & Accessories",
      "Collectible",
      "Consumer Electronics",
      "Fine Art",
      "Grocery & Gourmet Foods",
      "Health & Personal Care",
      "Home & Garden",
      "Independent Design",
      "Industrial & Scientific",
      "Music, Vinyls & DVD",
      "Musical Instruments",
      "Office Stuff",
      "Others",
      "Outdoors",
      "Computers",
      "Pet Supplies",
      "Software",
      "Sports",
      "Tools & Home Improvement",
      "Toys & Games",
      "Video, DVD & Blu-ray",
      "Video Games"
    )
    .required(),
  isListed: Joi.boolean(),
});

export const signUp = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  character: Joi.string()
    .valid(
      "OldMan",
      "OldLady",
      "Boy",
      "Girl",
      "Builder",
      "Fisherman",
      "VillageGirl",
      "Miner",
      "Farmer",
      "Dancer",
      "InnKeeper",
      "Bard"
    )
    .required(),
  newsletter: Joi.boolean(),
});

export const update = Joi.object({
  id: Joi.string(),
  name: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string(),
  character: Joi.string().valid(
    "OldMan",
    "OldLady",
    "Boy",
    "Girl",
    "Builder",
    "Fisherman",
    "VillageGirl",
    "Miner",
    "Farmer",
    "Dancer",
    "InnKeeper",
    "Bard"
  ),
});

export const signIn = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
