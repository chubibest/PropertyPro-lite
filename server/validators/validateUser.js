import Joi from '@hapi/joi';
import validate from '../middleware/validationmiddleware';

const signUpSchema = Joi.object().keys({
  password: Joi.string().trim().regex(/.{3,30}/).required(),
  first_name: Joi.string().trim().required(),
  last_name: Joi.string().trim().strict(),
  phone_number: Joi.number().required(),
  address: Joi.string().trim().required(),
  email: Joi.string().trim().email({ minDomainSegments: 2 }).required()
});

const signInSchema = {
  email: Joi.string().trim().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().regex(/.{3,30}/).required(),
};


const passChangeSchema = {
  oldpass: Joi.string().regex(/.{3,30}/).required(),
  newpass: Joi.string().regex(/.{3,30}/).required(),
  token: Joi.string()
};
export const validatePassChange = validate(passChangeSchema);
export const validateSignup = validate(signUpSchema);

export const validateSignin = validate(signInSchema);
