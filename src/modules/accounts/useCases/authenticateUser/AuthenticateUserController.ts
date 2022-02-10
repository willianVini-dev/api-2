import {container} from "tsyringe"
import {Request, Response} from "express"
import { AuthenticateUserUserCase } from "./AuthenticateUserUseCase";

class AuthenticaUserController{

  async handle(request:Request, response:Response):Promise<Response>{
    const {email, password} = request.body;

    const authenticateUseCase = container.resolve(AuthenticateUserUserCase)
    const token = await authenticateUseCase.execute({email,password});
    
    return response.json(token)
  }
}

export{AuthenticaUserController}