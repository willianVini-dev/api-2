import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUserRepository";
import {hash} from "bcrypt"

@injectable()
class CreateAdminUseCase{

  constructor(
    @inject("UserRepository")
    private userRepository:IUsersRepository){
}
  async execute(){
    const password = await hash("admin", 8);
    await this.userRepository.createAdmin(password);
  }
}
export{CreateAdminUseCase}