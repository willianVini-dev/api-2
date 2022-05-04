import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken"
import auth from "../../../../config/auth";
import { UserRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UserRepository";
import { UserTokenRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UserTokenRepository";
import {AppError} from "../../../errors/appError"
interface IPayload{ sub:string; }

export async function routerAuthenticate(request:Request, response:Response, next:NextFunction){
  const authHeader = request.headers.authorization;
  const refreshTokenRepository = new UserTokenRepository()

  if(!authHeader){ throw new AppError("Token missing", 401) }

  const [, token ] = authHeader.split(" ")
  try {
    const {sub: id} = verify(token, auth.secret_refresh_token) as IPayload;
    
    const userExist = await refreshTokenRepository.findByUserIdAndRefreshToken( id, token )

    if(!userExist){ throw new AppError("User does not exists!",401) }

    request.user = { id }
    next()
  } catch (error) { throw new AppError("token invalid", 401) }
}