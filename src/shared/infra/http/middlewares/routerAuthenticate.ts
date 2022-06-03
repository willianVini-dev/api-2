import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken"
import auth from "../../../../config/auth";
import {AppError} from "../../../errors/appError"
interface IPayload{ sub:string; }

export async function routerAuthenticate(request:Request, response:Response, next:NextFunction){
  const authHeader = request.headers.authorization;
 
  if(!authHeader){ throw new AppError("Token missing", 401) }

  const [, token ] = authHeader.split(" ")
  try {
    const {sub: id} = verify(token, auth.secret_token) as IPayload;
    request.user = { id }
    next()
  } catch (error) { throw new AppError("token invalid", 401) }
}