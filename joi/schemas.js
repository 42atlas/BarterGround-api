import Joi from "joi";

export const post = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
  category: Joi.string().valid('Miscellaneous', 'Automotive & Powersports', 'Baby Products', 'Beauty', 'Books', 'Camera & Photo', 'Cell Phones & Accessories', 'Collectible', 'Consumer Electronics', 'Fine Art', 'Grocery & Gourmet Foods', 'Health & Personal Care', 'Home & Garden', 'Independent Design', 'Industrial & Scientific', 'Major Appliances', 'Music and DVD', 'Musical Instruments', 'Office Products', 'Outdoors', 'Personal Computers', 'Pet Supplies', 'Software', 'Sports', 'Tools & Home Improvement', 'Toys & Games', 'Video, DVD & Blu-ray', 'Video Games', 'Watches').required(),
  isListed: Joi.boolean(),
});

export const signUp = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  character: Joi.string().valid('OldMan', 'OldLady', 'Boy', 'Girl', 'Builder', 'Fisherman', 'VillageGirl', 'Miner', 'Farmer', 'Dancer', 'InnKeeper', 'Bard').required(),
});

export const signIn = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
