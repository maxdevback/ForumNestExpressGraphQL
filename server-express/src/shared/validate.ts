import { Request } from "express";
import Joi from "joi";
import { isValidObjectId } from "mongoose";

class ValidateClass {
  validatePage(page: number) {
    const validateRes = Joi.number().min(1).validate(page);
    if (validateRes.error)
      throw { httpCode: 400, message: "The page is not correct" };
  }
  validateAuth(req: Request) {
    if (!req.session.user) throw { httpCode: 401, message: "Auth first" };
  }
  validateObjectId(id: string) {
    if (!isValidObjectId(id))
      throw { httpCode: 400, message: "The id is not valid" };
  }
}

export const Validate = new ValidateClass();
