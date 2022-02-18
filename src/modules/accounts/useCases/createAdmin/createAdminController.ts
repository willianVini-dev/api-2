import {container} from "tsyringe"
import {Request, Response} from "express"
import { CreateAdminUseCase } from "./createAdminUseCase";
import { RepositoryNotTreeError } from "typeorm";

class CreateAdminController{

  async handle(request:Request, response:Response):Promise<Response>{
    
    const {token} = request.params
  
    //if(token === 'masterSenha'){
      const adminUseCase = container.resolve(CreateAdminUseCase)
      await adminUseCase.execute();
      return response.status(201).send()
   // }

    //return response.status(403).send();
  }

}
export{CreateAdminController}