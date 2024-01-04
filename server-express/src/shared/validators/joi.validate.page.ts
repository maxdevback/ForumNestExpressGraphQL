import Joi from 'joi';
import { BadRequestException } from '../../model/exceptions/bad-request.exception';

export const joiValidatePage = (page: number) => {
  const validateRes = Joi.number().min(1).validate(page);
  if (validateRes.error) {
    throw new BadRequestException('The page is not correct');
  }
};
