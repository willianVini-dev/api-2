import {container} from "tsyringe"
import {Request, Response} from "express"
import {AuthenticateUserUserCase } from "./AuthenticateUserUseCase";

class AuthenticaUserController{

  async handle(request:Request, response:Response):Promise<Response>{
    try {
      const {email, password} = request.body;
      const authenticateUseCase = container.resolve(AuthenticateUserUserCase)
      const token = await authenticateUseCase.execute({email,password});
      return response.json(token)
    } catch (error) {
    console.log("🚀 ~ file: AuthenticateUserController.ts ~ line 17 ~ AuthenticaUserController ~ handle ~ error", error)
      
    }
  }
}

export{AuthenticaUserController}