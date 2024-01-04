import { Request } from 'express';
import { ForbiddenException } from '../../model/exceptions/forbidden.exception';

export const joiValidateAuth = (req: Request) => {
  if (!req.session.user) {throw new ForbiddenException();}
};
