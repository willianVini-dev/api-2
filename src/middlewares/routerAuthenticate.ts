import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken"
import { UserRepository } from "../modules/accounts/repositories/implementations/UserRepository";
import {AppError} from "../errors/appError"
interface IPayload{
  sub:string;
}
export async function routerAuthenticate(request:Request, response:Response, next:NextFunction){
  const authHeader = request.headers.authorization;

  if(!authHeader){
    throw new AppError("Token missing", 401)
  }
  const [, token ] = authHeader.split(" ")
  try {
    const {sub: id} = verify(token, "a3398e226c7fffc971d461382513f1dc") as IPayload;
    const userRepository = new UserRepository()
    const userExist = await userRepository.findById(id)

    if(!userExist){
      throw new AppError("User does not exists!",401)
    }

    next()
  } catch (error) {
    throw new AppError("token invalid", 401)
  }

}