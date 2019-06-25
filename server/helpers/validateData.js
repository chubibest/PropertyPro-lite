import Joi from '@hapi/joi';
import errorResponse from '../controllers/response';


const signUpSchema = {
  username: Joi.string().alphanum().min(3).max(30)
    .required(),
  password: Joi.string().regex(/.{3,30}/).required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  phonenumber: Joi.number().required(),
  address: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required()
};

const signInSchema = {
  username: Joi.string().alphanum().min(3).max(30)
    .required(),
  password: Joi.string().regex(/.{3,30}/).required()
};

export const validateSignup = async (req, res, next) => {
  Joi.validate(req.body, signUpSchema, (error) => {
    if (error) {
      return errorResponse(res, error, 400);
    }
    next();
  });
};

export const validateSignin = async (req, res, next) => {
  Joi.validate(req.body, signInSchema)
    .then(() => next())
    .catch(error => errorResponse(res, error, 400));
};
