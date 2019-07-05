import Joi from '@hapi/joi';
import validate from '../middleware/validationmiddleware';

const postAdSchema = Joi.object().keys({
  type: Joi.string().trim().required(),
  address: Joi.string().trim().required(),
  price: Joi.number().required(),
  city: Joi.string().trim().required(),
  state: Joi.string().trim().required(),
  image_url: Joi.string().trim().required()
});

const updateAdSchema = Joi.object().keys({
  type: Joi.string().trim(),
  firstname: Joi.string().trim(),
  address: Joi.string().trim(),
  price: Joi.number(),
  city: Joi.string().trim(),
  state: Joi.string().trim(),
  image_url: Joi.string().trim()
});

export const validatePostAd = validate(postAdSchema);

export const validateUpdateAd = validate(updateAdSchema);
