import { inject, injectable } from 'tsyringe';
import { ICreatUserDTO, IUsersRepository } from '../../repositories/IUserRepository';

@injectable()
class CreateUserUseCase{

  constructor(
    @inject("UserRepository") 
    private userRepository:IUsersRepository){}

  async execute({name,email,password,drive_license}:ICreatUserDTO):Promise<void>{
    await this.userRepository.create({name,email,password,drive_license})
  }
}
export{CreateUserUseCase}