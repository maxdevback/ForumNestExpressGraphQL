import Joi from "joi";

class UsersValidatorClass {
  validateRegisterBody(body: object) {
    const validateRes = Joi.object({
      username: Joi.string().min(4).max(20).required(),
      password: Joi.string().min(6).required(),
      email: Joi.string().email().required(),
    }).validate(body);
    if (validateRes.error)
      throw { httpCode: 400, message: validateRes.error.details[0].message };
  }
  validateLoginBody(body: object) {
    const validateRes = Joi.object({
      username: Joi.string().min(4).max(20).required(),
      password: Joi.string().min(6).required(),
    }).validate(body);
    if (validateRes.error)
      throw { httpCode: 400, message: validateRes.error.details[0].message };
  }
}

export const UsersValidate = new UsersValidatorClass();
