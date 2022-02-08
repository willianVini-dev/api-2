import { IUsersRepository, ICreatUserDTO } from "../IUserRepository";
import { Repository, getRepository } from 'typeorm';
import { Users } from '../../entities/User';

class UserRepository implements IUsersRepository{
  private repository:Repository<Users>

  constructor(){
    this.repository = getRepository(Users)
  }

  async create({name, username, email, drive_license, password}: ICreatUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      username,
      password,
      email,
      drive_license
    });

    await this.repository.save(user)
  }

}

export {UserRepository}