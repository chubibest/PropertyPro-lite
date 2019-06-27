import Joi from '@hapi/joi';

const signUpSchema = Joi.object().keys({
  username: Joi.string().trim().alphanum().min(3)
    .max(30)
    .required(),
  password: Joi.string().trim().regex(/.{3,30}/).required(),
  firstname: Joi.string().trim().required(),
  lastname: Joi.string().trim().strict(),
  phonenumber: Joi.number().required(),
  address: Joi.string().trim().required(),
  email: Joi.string().trim().email({ minDomainSegments: 2 }).required(),
  isAdmin: Joi.string().trim().required()
});

const signInSchema = {
  username: Joi.string().alphanum().min(3).max(30)
    .required(),
  password: Joi.string().regex(/.{3,30}/).required()
};

export const validateSignup = async ({ body }, res, next) => {
  try {
    await Joi.validate(body, signUpSchema);
    next();
  } catch (e) {
    res.status(400).send({
      status: 'error',
      error: e.details[0].message
    });
  }
};

export const validateSignin = async ({ body }, res, next) => {
  try {
    await Joi.validate(body, signInSchema);
    next();
  } catch (e) {
    res.status(400).send({
      status: 'error',
      error: e.details[0].message
    });
  }
};
