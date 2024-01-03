import Joi from 'joi';
import { AuthConstants } from '../auth.constants';
import { BadRequestException } from '../../model/exceptions/bad-request.exception';

export const joiValidateRegisterBody = (body: object) => {
  const validateRes = Joi.object({
    username: Joi.string()
      .min(AuthConstants.MIN_USERNAME_LENGTH)
      .max(AuthConstants.MAX_USERNAME_LENGTH)
      .required(),
    password: Joi.string()
      .min(AuthConstants.MIN_PASSWORD_LENGTH)
      .max(AuthConstants.MAX_PASSWORD_LENGTH)
      .required(),
    email: Joi.string()
      .min(AuthConstants.MIN_EMAIL_LENGTH)
      .max(AuthConstants.MAX_EMAIL_LENGTH)
      .email()
      .required(),
  }).validate(body);

  if (validateRes.error) {
    throw new BadRequestException(validateRes.error.details[0].message);
  }
};
