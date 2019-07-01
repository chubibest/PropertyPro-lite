import Joi from '@hapi/joi';

export default signInSchema => async ({ body }, res, next) => {
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
