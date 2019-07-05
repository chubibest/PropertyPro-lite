import Joi from '@hapi/joi';
import validate from '../middleware/validationmiddleware';

const signUpSchema = Joi.object().keys({
  username: Joi.string().trim().alphanum().min(3)
    .max(30)
    .required(),
  password: Joi.string().trim().regex(/.{3,30}/).required(),
  firstname: Joi.string().trim().required(),
  lastname: Joi.string().trim().strict(),
  phonenumber: Joi.number().required(),
  address: Joi.string().trim().required(),
  email: Joi.string().trim().email({ minDomainSegments: 2 }).required()
});

const signInSchema = {
  username: Joi.string().alphanum().min(3).max(30)
    .required(),
  password: Joi.string().regex(/.{3,30}/).required()
};

export const validateSignup = validate(signUpSchema);

export const validateSignin = validate(signInSchema);
