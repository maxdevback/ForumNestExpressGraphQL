import Joi from 'joi';

class CommentsValidatorClass {
  validateCreateBody(body: object) {
    const validateRes = Joi.object({
      body: Joi.string().min(10).max(250).required(),
      commentParentId: Joi.string(),
    }).validate(body);
    if (validateRes.error)
      {throw { httpCode: 400, message: validateRes.error.details[0].message };}
  }
}

export const CommentsValidator = new CommentsValidatorClass();
