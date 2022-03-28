import { AppError } from './../../../../shared/errors/appError';
import { inject, injectable } from "tsyringe";
import { IUserTokenRepository } from "../../repositories/IUserTokenRepository";
import { verify, sign } from 'jsonwebtoken';
import auth from "../../../../config/auth";
import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider';

interface IPayload{ sub:string; email:string }

@injectable()
class RefreshTokenUseCase{
  constructor( 
    @inject("UserTokenRepository") 
    private userTokenRepository:IUserTokenRepository,
    @inject("DayjsProvider")
    private dateProvider:IDateProvider){}

  async execute(token:string):Promise<string>{

   const {email, sub } = verify(token, auth.secret_refresh_token) as IPayload;
   const user_id = sub;

   const user_token = await this.userTokenRepository.findByUserIdAndRefreshToken(user_id, token)
   if(!user_token){
    throw new AppError("Refresh token does not exists")
   }

   await this.userTokenRepository.deleteById(user_token.id);

   const refresh_token = sign({email}, auth.secret_refresh_token,{
     subject:sub,
     expiresIn: auth.expiresIn_refresh_token
   })

   await this.userTokenRepository.create({
     refresh_token,
     expires_date: this.dateProvider.addDays(30),
     user_id
   })

   return refresh_token;
  }
}

export {RefreshTokenUseCase}