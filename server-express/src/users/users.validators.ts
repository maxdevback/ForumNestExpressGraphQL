import Joi from 'joi';
import { BadRequestException } from '../model/exceptions/bad-request.exception';

class UsersValidatorClass {
  validateRegisterBody(body: object) {
    const validateRes = Joi.object({
      username: Joi.string().min(4).max(20).required(),
      password: Joi.string().min(6).max(100).required(),
      email: Joi.string().min(10).max(100).email().required(),
    }).validate(body);
    if (validateRes.error)
      throw new BadRequestException(validateRes.error.details[0].message);
  }
  validateLoginBody(body: object) {
    const validateRes = Joi.object({
      username: Joi.string().min(4).max(20).required(),
      password: Joi.string().min(6).required(),
    }).validate(body);
    if (validateRes.error)
      throw new BadRequestException(validateRes.error.details[0].message);
  }
}

export const UsersValidate = new UsersValidatorClass();
