import Joi from '@hapi/joi';
import validate from '../middleware/validationmiddleware';

const adSchema = Joi.object().keys({
  type: Joi.string().trim().required(),
  address: Joi.string().trim().required(),
  price: Joi.number().required(),
  city: Joi.string().trim().required(),
  state: Joi.string().trim().required(),
  image_url: Joi.string().trim().required()
});

const flagSchema = {
  reason: Joi.string().required(),
  description: Joi.string().required()
};

export const validatePostAd = validate(adSchema);

export const validateUpdateAd = validate(adSchema);


export const validateFlag = validate(flagSchema);
