import { container } from "tsyringe"
import {Request, Response} from "express"
import { ProfileUserUseCase } from "./profileUserUseCase";
import { IUserResponseDTO, UserMap } from "../../mapper/userMap";


class ProfileUserController{
  async handle(request:Request, response:Response):Promise<IUserResponseDTO>{
    const {id} = request.user;
    const profileUserUseCase = container.resolve(ProfileUserUseCase)
    const user = await profileUserUseCase.execute(id)
    return UserMap.toDTO(user)

  }
}

export {ProfileUserController}