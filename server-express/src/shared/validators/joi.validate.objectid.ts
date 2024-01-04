import { isValidObjectId } from 'mongoose';
import { BadRequestException } from '../../model/exceptions/bad-request.exception';

export const joiValidateObjectId = (id: string) => {
  if (!isValidObjectId(id)) {
    throw new BadRequestException('The id is not valid');
  }
};
