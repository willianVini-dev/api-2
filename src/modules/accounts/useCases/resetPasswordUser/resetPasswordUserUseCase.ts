import { inject, injectable } from "tsyringe";
import { IUserTokenRepository } from "../../repositories/IUserTokenRepository";
import { AppError } from '../../../../shared/errors/appError';

interface IRequest{
  token:string;
  password:string;
}


@injectable()
class ResetPasswordUserUseCase{
  constructor(
    @inject("UserTokenRepository")
    private userTokenRepository:IUserTokenRepository,
  ){}
  
  async execute({token, password}:IRequest){

    const userToken = await this.userTokenRepository.findByRefreshToken(token)
    if(!userToken){ throw new AppError("token invalid")}

  }
}

export {ResetPasswordUserUseCase}