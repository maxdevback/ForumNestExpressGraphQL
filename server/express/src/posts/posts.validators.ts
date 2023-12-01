import Joi from "joi";

class PostsValidatorClass {
  validateCreationBody(body: object) {
    const validateRes = Joi.object({
      title: Joi.string().min(20).max(100).required(),
      body: Joi.string().min(200).max(10000).required(),
    }).validate(body);
    if (validateRes.error)
      throw { httpCode: 400, message: validateRes.error.details[0].message };
  }
  validateUpdateBody(body: object) {
    return Joi.object({
      title: Joi.string().min(20).max(100),
      body: Joi.string().min(200).max(10000),
    }).validate(body).value;
  }
}

export const PostsValidate = new PostsValidatorClass();
