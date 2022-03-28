import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUserRepository";
import { compare } from "bcrypt"
import {sign} from "jsonwebtoken"
import { AppError } from '../../../../shared/errors/appError';
import { IUserTokenRepository } from "../../repositories/IUserTokenRepository";
import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";

interface IRequest{
  email:string;
  password:string;
}

interface IResponse{
  user:{
    name:string,
    email:string
  };
  token:string;
  refresh_token:string
}


@injectable()
class AuthenticateUserUserCase{

  constructor(
    @inject("UserRepository")
    private userRepository:IUsersRepository,
    @inject("UserTokenRepository")
    private userTokenRepository:IUserTokenRepository,
    @inject("DayjsProvider")
    private dateProvider:IDateProvider
  ){}

  async execute({email, password}:IRequest):Promise<IResponse>{
    
    const user = await this.userRepository.findByEmail(email)
    if(!user){
      throw new AppError("Email or password incorret!")
    }

    const passwordMath = await compare(password, user.password);
    if(!passwordMath){
      throw new AppError("Email or password incorret!")
    }

    const token = sign({}, auth.secret_token,{
      subject:user.id,
      expiresIn: auth.expires_in_token
    });

    const refresh_token = sign({email},auth.secret_refresh_token,{
      subject:user.id,
      expiresIn:auth.expiresIn_refresh_token
    })

    await this.userTokenRepository.create({
      user_id:user.id,
      expires_date: this.dateProvider.addDays(30),
      refresh_token
    })

    const tokenResponse:IResponse = {
      token,
      user:{
        name: user.name,
        email: user.email
      },
      refresh_token
    }
    return tokenResponse;
  }
}

export{AuthenticateUserUserCase}