import { IUsersRepository, ICreatUserDTO } from "../../../repositories/IUserRepository";
import { Repository, getRepository } from 'typeorm';
import { Users } from '../entities/User';

class UserRepository implements IUsersRepository{
  private repository:Repository<Users>

  constructor(){
    this.repository = getRepository(Users)
  }

  async create({name,email, drive_license, password,id,avatar}: ICreatUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      password,
      email,
      drive_license,
      id,
      avatar
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

  async findById(id: string): Promise<Users> {
    const user = await this.repository.findOne({id})
    return user;
  }

  async createAdmin(password:string):Promise<void>{

    const user = this.repository.create({
      name:"admin",
      password,
      email: "admin@admin",
      drive_license: "1212121",
      admin: true
    })
    await this.repository.save(user)
  }

}

export {UserRepository}