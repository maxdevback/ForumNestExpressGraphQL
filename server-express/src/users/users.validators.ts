import Joi from 'joi';
import { BadRequestException } from '../model/exceptions/bad-request.exception';
import { UserConstants } from './users.constants';

export const UsersValidatorClass = {
  validateRegisterBody(body: object) {
    const validateRes = Joi.object({
      username: Joi.string()
        .min(UserConstants.MIN_USERNAME_LENGTH)
        .max(UserConstants.MAX_USERNAME_LENGTH)
        .required(),
      password: Joi.string()
        .min(UserConstants.MIN_PASSWORD_LENGTH)
        .max(UserConstants.MAX_PASSWORD_LENGTH)
        .required(),
      email: Joi.string()
        .min(UserConstants.MIN_EMAIL_LENGTH)
        .max(UserConstants.MAX_EMAIL_LENGTH)
        .email()
        .required(),
    }).validate(body);

    if (validateRes.error) {
      throw new BadRequestException(validateRes.error.details[0].message);
    }
  },
  validateLoginBody(body: object) {
    const validateRes = Joi.object({
      username: Joi.string()
        .min(UserConstants.MIN_USERNAME_LENGTH)
        .max(UserConstants.MAX_USERNAME_LENGTH)
        .required(),
      password: Joi.string()
        .min(UserConstants.MIN_PASSWORD_LENGTH)
        .max(UserConstants.MAX_PASSWORD_LENGTH)
        .required(),
    }).validate(body);

    if (validateRes.error) {
      throw new BadRequestException(validateRes.error.details[0].message);
    }
  },
};
