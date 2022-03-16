import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUserRepository";
import { compare } from "bcrypt"
import {sign} from "jsonwebtoken"
import { AppError } from '../../../../shared/errors/appError';

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
}


@injectable()
class AuthenticateUserUserCase{

  constructor(
    @inject("UserRepository")
    private userRepository:IUsersRepository
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

    //gerando jwt
    const token = sign({},"a3398e226c7fffc971d461382513f1dc",{
      subject:user.id,
      expiresIn:"1d"
    });

    const tokenResponse:IResponse = {
      token,
      user:{
        name: user.name,
        email: user.email
      }
    }
    return tokenResponse;
  }
}

export{AuthenticateUserUserCase}