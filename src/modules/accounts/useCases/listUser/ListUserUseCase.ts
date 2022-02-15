import {inject, injectable}  from 'tsyringe';
import { IUsersRepository } from '../../repositories/IUserRepository';
import {Users} from "../../infra/typeorm/entities/User"

@injectable()
class ListUserUseCase{

  constructor(
    @inject("UserRepository")
    private userRepository:IUsersRepository
  ){}

  async execute():Promise<Users[]>{
    const users = await this.userRepository.listAll()
    return users;
  }
}

export {ListUserUseCase}