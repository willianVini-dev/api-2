import {NextFunction, Request, Response} from 'express';
import { UserRepository } from '../../../../modules/accounts/infra/typeorm/repositories/UserRepository';
import { AppError } from '../../../errors/appError';

export async function isAdmin(request:Request, response:Response, next:NextFunction){
  const { id } = request.user;

  const usersRepository = new UserRepository()
  const user  = await usersRepository.findById(id)

  if(!user.admin){
    throw new AppError("User is not admin!")
  }

  return next();
}