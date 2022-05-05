import {Request, Response} from "express"
import { container } from 'tsyringe';
import { ResetPasswordUserUseCase } from "./resetPasswordUserUseCase";

class ResetPasswordUserController{

  async handle(request:Request, response:Response):Promise<Response>{
    const { password } = request.body;
    const token = request.query.token.toString();

    const resetPasswordUserUsecase = container.resolve(ResetPasswordUserUseCase)
    await resetPasswordUserUsecase.execute({token, password});

    return response.send()
  }
}

export {ResetPasswordUserController}