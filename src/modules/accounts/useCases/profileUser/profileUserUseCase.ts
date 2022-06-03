import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUserRepository";

@injectable()
class ProfileUserUseCase {

  constructor(
    @inject("UserRepository")
    private userRepository:IUsersRepository
  ){}

  async execute(id:string){
   return await this.userRepository.findById(id);
  }
}

export {ProfileUserUseCase }