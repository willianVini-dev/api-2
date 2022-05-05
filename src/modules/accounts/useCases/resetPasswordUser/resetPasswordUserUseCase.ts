import { inject, injectable } from "tsyringe";
import { IUserTokenRepository } from "../../repositories/IUserTokenRepository";
import { AppError } from '../../../../shared/errors/appError';
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { IUsersRepository } from "../../repositories/IUserRepository";
import {hash} from "bcrypt"

interface IRequest{
  token:string;
  password:string;
}


@injectable()
class ResetPasswordUserUseCase{
  constructor(
    @inject("UserTokenRepository")
    private userTokenRepository:IUserTokenRepository,
    @inject("DayjsProvider")
    private dayjsProvider:IDateProvider,
    @inject("UserRepository")
    private usersRepository:IUsersRepository
  ){}
  
  async execute({token, password}:IRequest){

    const userToken = await this.userTokenRepository.findByRefreshToken(token)
    if(!userToken){ throw new AppError("token invalid")}

    const validDateToken = this.dayjsProvider.compareIfBefore(
      userToken.expires_date, 
      this.dayjsProvider.dateNow()
    )
    if(validDateToken){throw new AppError("Token expired")}
    
    const user = await this.usersRepository.findById(userToken.user_id)
    user.password = await hash(password,8)

    Promise.all([
      this.usersRepository.create(user),
      this.userTokenRepository.deleteById(userToken.id)
    ])

  }
}

export {ResetPasswordUserUseCase}