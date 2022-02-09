import { IUsersRepository, ICreatUserDTO } from "../IUserRepository";
import { Repository, getRepository } from 'typeorm';
import { Users } from '../../entities/User';

class UserRepository implements IUsersRepository{
  private repository:Repository<Users>

  constructor(){
    this.repository = getRepository(Users)
  }

  async create({name,email, drive_license, password}: ICreatUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      password,
      email,
      drive_license
    });

    await this.repository.save(user)
  }

  async listAll():Promise<Users[]>{
    const user = await this.repository.find();
    return user;
  } 

  async findByEmail(email: string): Promise<Users> {
    const user = await this.repository.findOne({email})
    return user;

  }

}

export {UserRepository}