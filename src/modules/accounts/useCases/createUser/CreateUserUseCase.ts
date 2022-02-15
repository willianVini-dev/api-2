import { inject, injectable } from 'tsyringe';
import { ICreatUserDTO, IUsersRepository } from '../../repositories/IUserRepository';
import { hash } from 'bcrypt';
import { AppError } from '../../../../shared/errors/appError';
@injectable()
class CreateUserUseCase{

  constructor(
    @inject("UserRepository") 
    private userRepository:IUsersRepository){}

  async execute({name,email,password,drive_license}:ICreatUserDTO):Promise<void>{

    const userExists = await this.userRepository.findByEmail(email);
    if(userExists){
      throw new AppError("Email exists!")
    }

    const passwordHash = await hash(password,8); 

    await this.userRepository.create({
      name,
      email,
      password: passwordHash,
      drive_license
    });

  }
}
export{CreateUserUseCase}