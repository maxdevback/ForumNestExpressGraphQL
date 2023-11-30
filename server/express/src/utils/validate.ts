import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { isValidObjectId } from "mongoose";

class ValidateClass {
  validatePostCreationBody(body: object) {
    const validateRes = Joi.object({
      title: Joi.string().min(20).max(100).required(),
      body: Joi.string().min(200).max(10000).required(),
    }).validate(body);
    if (validateRes.error)
      throw { httpCode: 400, message: validateRes.error.details[0].message };
  }
  validatePostUpdateBody(body: object) {
    return Joi.object({
      title: Joi.string().min(20).max(100),
      body: Joi.string().min(200).max(10000),
    }).validate(body).value;
  }
  validateCommentsCreateBody(body: object) {
    const validateRes = Joi.object({
      body: Joi.string().min(10).max(250).required(),
    }).validate(body);
    if (validateRes.error)
      throw { httpCode: 400, message: validateRes.error.details[0].message };
  }
  validatePage(page: number) {
    const validateRes = Joi.number().min(1).validate(page);
    if (validateRes.error)
      throw { httpCode: 400, message: "The page is not correct" };
  }
  validateAuth(req: Request) {
    if (!req.session.user) throw { httpCode: 401, message: "Auth first" };
  }
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
  checkId(id: string) {
    if (!isValidObjectId(id))
      throw { httpCode: 400, message: "The id is not valid" };
  }
}

export const Validate = new ValidateClass();
