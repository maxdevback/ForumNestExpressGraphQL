import Joi from 'joi';
import { BadRequestException } from '../../model/exceptions/bad-request.exception';
import { USERS_CONSTANTS } from '../../users/userS.constants';

export const joiValidateRegisterBody = (body: object) => {
  const {
    MIN_USERNAME_LENGTH,
    MAX_USERNAME_LENGTH,
    MIN_PASSWORD_LENGTH,
    MAX_PASSWORD_LENGTH,
    MIN_EMAIL_LENGTH,
    MAX_EMAIL_LENGTH,
  } = USERS_CONSTANTS;

  const validateRes = Joi.object({
    username: Joi.string()
      .min(MIN_USERNAME_LENGTH)
      .max(MAX_USERNAME_LENGTH)
      .required(),
    password: Joi.string()
      .min(MIN_PASSWORD_LENGTH)
      .max(MAX_PASSWORD_LENGTH)
      .required(),
    email: Joi.string()
      .min(MIN_EMAIL_LENGTH)
      .max(MAX_EMAIL_LENGTH)
      .email()
      .required(),
  }).validate(body);

  if (validateRes.error) {
    throw new BadRequestException(validateRes.error.details[0].message);
  }
};
